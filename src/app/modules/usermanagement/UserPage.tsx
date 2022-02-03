import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_iris/layout/core'
import { ViewPermissions } from './components/settings/permissions/ViewPermissions'
import { ViewRoles } from './components/settings/roles/ViewRoles'
import {ViewUsers} from './components/settings/users/ViewUsers'
import {UserHeader} from './UserHeader'

const userBreadCrumbs: Array<PageLink> = [
  {
    title: 'Roles',
    path: '/admin/roles',
    isSeparator: false,
    isActive: false,
  },
  {
    title: 'Permissions',
    path: '/admin/permissions',
    isSeparator: false,
    isActive: false,
  },
]

const UserPage: React.FC = () => {
  return (
    <>
      <UserHeader />
      <Switch>
        <Route path='/admin/users'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Users</PageTitle>
          <ViewUsers />
        </Route>
        <Route path='/admin/roles'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Roles</PageTitle>
          <ViewRoles />
        </Route>
        <Route path='/admin/permissions'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Permissions</PageTitle>
          <ViewPermissions />
        </Route>
        <Redirect from='/admin/' exact={true} to='/admin/users' />
        <Redirect to='/admin/users' />
      </Switch>
    </>
  )
}

export default UserPage
