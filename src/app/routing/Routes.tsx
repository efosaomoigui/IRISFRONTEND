import React, {FC} from 'react'
import {Redirect, Switch, Route} from 'react-router-dom'
import {shallowEqual, useSelector} from 'react-redux'
import {MasterLayout} from '../../_iris/layout/MasterLayout'
import {PrivateRoutes} from './PrivateRoutes'
import {Logout, AuthPage} from '../modules/auth'
import {ErrorsPage} from '../modules/errors/ErrorsPage'
import {RootState} from '../../setup'
import {MasterInit} from '../../_iris/layout/MasterInit'
import {ToastContainer} from 'react-toastify'
import GetStates from '../modules/common/files/GetStates'


const Routes: FC = () => {
  const isAuthorized = useSelector<RootState>(({auth}) => auth.user, shallowEqual)

GetStates()

  return (
    <>
    <ToastContainer position='top-right' style={{width:'300px'}} hideProgressBar />
      <Switch>
        {!isAuthorized ? (
          /*Render auth page when user at `/auth` and not authorized.*/
          <Route>
            <AuthPage />
          </Route>
        ) : (
          /*Otherwise redirect to root page (`/`)*/
          <Redirect from='/auth' to='/' />
        )}

        <Route path='/error' component={ErrorsPage} />
        <Route path='/logout' component={Logout} />

        {!isAuthorized ? (
          /*Redirect to `/auth` when user is not authorized*/
          <Redirect to='/login' />
        ) : (
          <>
            <MasterLayout>
              <PrivateRoutes />
            </MasterLayout>
          </>
        )}
      </Switch>
      <MasterInit />
    </>
  )
}

export {Routes}
