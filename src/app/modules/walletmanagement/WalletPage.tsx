import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_iris/layout/core'
import { ViewPermissions } from './components/settings/permissions/ViewPermissions'
import { ViewRoles } from './components/settings/roles/ViewRoles'
import {ViewUsers} from './components/settings/users/ViewUsers'
import { WalletHeader } from './WalletHeader'

const userBreadCrumbs: Array<PageLink> = [
  {
    title: 'Add Wallet',
    path: 'Roles',
    isSeparator: false,
    isActive: false,
  },
  {
    title: 'Permissions',
    path: 'permissions',
    isSeparator: false,
    isActive: false,
  }
]

const WalletPage: React.FC = () => {
  return (
    <>
      <WalletHeader />
      <Switch>
        <Route path='/walletmanagement/users'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Wallets</PageTitle>
          <ViewUsers />
        </Route>
        <Route path='/walletmanagement/roles'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Roles</PageTitle>
          <ViewRoles />
        </Route>
        <Route path='/walletmanagement/permissions'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Permissions</PageTitle>
          <ViewPermissions />
        </Route>
        <Redirect from='/walletmanagement/' exact={true} to='/walletmanagement/users' />
        <Redirect to='/walletmanagement/users' />
      </Switch>
    </>
  )
}

export default WalletPage
