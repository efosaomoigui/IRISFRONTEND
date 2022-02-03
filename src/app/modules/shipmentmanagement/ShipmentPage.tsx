import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_iris/layout/core'
import { ViewPermissions } from './components/settings/permissions/ViewPermissions'
import { ViewRoles } from './components/settings/roles/ViewRoles'
import {ViewUsers} from './components/settings/users/ViewUsers'
import {ShipmentHeader} from './ShipmentHeader'

const userBreadCrumbs: Array<PageLink> = [
  {
    title: 'Add shipment',
    path: 'permissions',
    isSeparator: false,
    isActive: false,
  },
  {
    title: 'Permissions',
    path: 'permissions',
    isSeparator: false,
    isActive: false,
  },
]

const ShipmentPage: React.FC = () => {
  return (
    <>
      <ShipmentHeader />
      <Switch>
        <Route path='/shipmentmanagement/users'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Shipment</PageTitle>
          <ViewUsers />
        </Route>
        <Route path='/shipmentmanagement/roles'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Roles</PageTitle>
          <ViewRoles />
        </Route>
        <Route path='/shipmentmanagement/permissions'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Permissions</PageTitle>
          <ViewPermissions />
        </Route>
        <Redirect from='/shipmentmanagement/' exact={true} to='/shipmentmanagement/users' />
        <Redirect to='/shipmentmanagement/users' />
      </Switch>
    </>
  )
}

export default ShipmentPage
