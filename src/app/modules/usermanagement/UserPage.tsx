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
    path: 'Roles',
    isSeparator: false,
    isActive: false,
  },
  {
    title: 'Permissions',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

const UserPage: React.FC = () => {
  return (
    <>
      <UserHeader />
      <Switch>
        <Route path='/usermanagement/users'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Users</PageTitle>
          <ViewUsers />
        </Route>
        <Route path='/usermanagement/roles'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Roles</PageTitle>
          <ViewRoles />
        </Route>
        <Route path='//usermanagement/roles'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Permissions</PageTitle>
          <ViewPermissions />
        </Route>
        <Redirect from='/usermanagement/' exact={true} to='/usermanagement/users' />
        <Redirect to='/usermanagement/users' />
      </Switch>
    </>
  )
}

export default UserPage
