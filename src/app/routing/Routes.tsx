import React, {FC} from 'react'
import {Redirect, useHistory, Switch, Route} from 'react-router-dom'
import {shallowEqual, useSelector} from 'react-redux'
import {MasterLayout} from '../../_iris/layout/MasterLayout'
import {PrivateRoutes} from './PrivateRoutes'
import {Logout, AuthPage} from '../modules/auth'
import {ErrorsPage} from '../modules/errors/ErrorsPage'
import {RootState} from '../../setup'
import {MasterInit} from '../../_iris/layout/MasterInit'
import {toast, ToastContainer} from 'react-toastify'
import GetStates from '../modules/common/files/GetStates'
import axios from 'axios'

axios.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (401 === error.response.status) {
      toast.error('Sorry, your session has expired, please relogin')
      // historyObj.push('/login')
      window.location.href = '/accessdenied'
      // alert('expired')
    }
    return Promise.reject(error)
  }
)
//check for permision here first
// GetStates()

const Routes: FC = () => {
  const isAuthorized = useSelector<RootState>(({auth}) => auth.user, shallowEqual)
  let historyObj = useHistory()

  return (
    <>
      <ToastContainer position='top-right' style={{width: '300px'}} hideProgressBar />
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
