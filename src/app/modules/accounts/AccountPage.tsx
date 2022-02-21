import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_iris/layout/core'
import {Overview} from './components/Overview'
import {Settings} from './components/settings/Settings'
import {AccountHeader} from './AccountHeader'

const accountBreadCrumbs: Array<PageLink> = [
  {
    title: 'User Details',
    path: '/adminSettings/userDetails',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

const AccountPage: React.FC = () => {
  return (
    <>
      <AccountHeader />
      <Switch>
        <Route path='/adminSettings/userDetails/:UserId'>
          <PageTitle breadcrumbs={accountBreadCrumbs}>User Details</PageTitle>
          <Overview />
        </Route>

        <Route path='/adminSettings/settings'>
          <PageTitle breadcrumbs={accountBreadCrumbs}>Settings</PageTitle>
          <Settings />
        </Route>

        <Redirect from='/adminSettings' exact={true} to='/adminSettings/overview' />
        <Redirect to='/adminSettings/overview' />
      </Switch>
    </>
  )
}

export default AccountPage
