import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_iris/layout/core'
import {ShipmentHeader} from './ShipmentHeader'
import { ViewRoutes } from './components/settings/ViewRoutes'
import { ViewFleets} from './components/settings/ViewFleets'
import { CaptureDomesticShipment } from './components/capture/CaptureDomesticShipment'
import { CaptureFreightShipment } from './components/capture/CaptureFreightShipment'

import { ViewShipments } from './components/settings/ViewShipments'
import { ViewPriceSettings } from './components/settings/ViewPriceSettings'
import { Manifest } from './components/processingandpackaging/Manifest'

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

        <Route path='/shipment/viewshipments'>
          <PageTitle breadcrumbs={userBreadCrumbs}>View Shipments</PageTitle>
          <ViewShipments/>
        </Route>

        <Route path='/shipment/CaptureDomesticShipment'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Capture Domestic Shipment</PageTitle>
          <CaptureDomesticShipment />
        </Route>
        <Route path='/shipment/CaptureFreightShipment'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Capture Freight Shipment</PageTitle>
          <CaptureFreightShipment />
        </Route>
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
