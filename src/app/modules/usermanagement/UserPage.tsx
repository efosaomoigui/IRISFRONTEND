import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_iris/layout/core'
import {ViewPermissions} from './components/settings/permissions/ViewPermissions'
import {ViewRoles} from './components/settings/roles/ViewRoles'
import {UserHeader} from './UserHeader'
import {ViewUsers} from './components/settings/users/ViewUsers'
import RoleUserManagement from './components/settings/users/RoleUserManagement'
import { RoleDetail } from './components/settings/roles/RoleDetail'
import { PermissionDetail } from './components/settings/permissions/PermissionDetail'

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
      {/* <UserHeader /> */}
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

        {/* <Route path='/admin/permissionDetail/:id'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Permissions</PageTitle>
          <DetailPermission />
        </Route> */}

        {/* Role */}
        <Route path='/admin/addUserToRole'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Add To Role</PageTitle>
          <RoleUserManagement />
        </Route>
        
        <Route path='/admin/roleDetails/:roleId'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Add To Role</PageTitle>
          <RoleDetail />
        </Route>
        <Route path='/admin/permissionDetails/:roleId'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Add Permission To Role</PageTitle>
          <PermissionDetail />
        </Route>

        {/* Default */}

        <Redirect from='/admin/' exact={true} to='/admin/users' />
        <Redirect to='/admin/users' />
      </Switch>
    </>
  )
}

export default UserPage
