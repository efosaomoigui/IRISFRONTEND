import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_iris/layout/core'
import {ShipmentHeader} from './ShipmentHeader'
import { ViewRoutes } from './components/settings/ViewRoutes'
import { ViewFleets} from './components/settings/ViewFleets'
import { CaptureShipment } from './components/capture/CaptureShipment'

import { ViewPriceSettings } from './components/settings/ViewPriceSettings'
import { Manifest } from './components/processingandpackaging/Manifest'
import { ViewShipment } from './components/capture/ViewShipment'

const userBreadCrumbs: Array<PageLink> = [
  {
    title: 'Add shipment',
    path: '/shipment/users',
    isSeparator: false,
    isActive: false,
  },
  {
    title: 'Permissions',
    path: '/shipment/permissions',
    isSeparator: false,
    isActive: false,
  },
]

const ShipmentPage: React.FC = () => {
  return (
    <>
      <ShipmentHeader />
      <Switch>
        <Route path='/shipment/routes'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Routes</PageTitle>
          <ViewRoutes />
        </Route>
        <Route path='/shipment/fleet'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Add Fleet</PageTitle>
        </Route>
        <Route path='/shipment/viewfleet'>
          <PageTitle breadcrumbs={userBreadCrumbs}>View Fleets</PageTitle>
          <ViewFleets />
        </Route>

        <Route path='/shipment/ViewPriceSettings'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Price Settings</PageTitle>
          <ViewPriceSettings/>
        </Route>

        <Route path='/shipment/viewshipment'>
          <PageTitle breadcrumbs={userBreadCrumbs}>View Shipment</PageTitle>
          <ViewShipment/>
        </Route>

        <Route path='/shipment/CaptureShipment'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Capture Shipment</PageTitle>
          <CaptureShipment />
        </Route>
        {/* <Route path='/shipment/CaptureFreightShipment'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Capture Freight Shipment</PageTitle>
          <CaptureFreightShipment />
        </Route> */}
        <Route path='/shipment/Manifest'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Manifest</PageTitle>
          <Manifest />
        </Route>
        

        <Redirect from='/shipment/' exact={true} to='/shipment/users' />
        <Redirect to='/shipment/users' />
      </Switch>
    </>
  )
}

export default ShipmentPage
