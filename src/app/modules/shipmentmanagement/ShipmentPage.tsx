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
import { ShipmentDetail } from './components/capture/ShipmentDetail'
import { ManifestDetail } from './components/processingandpackaging/ManifestDetail'
import { RouteDetail } from './components/settings/RouteDetail'
import { FleetDetail } from './components/settings/FleetDetail'
import { PriceSettingDetail } from './components/settings/PriceSettingDetail'
import { HorizontalShipmentCapture } from './components/capture/HorizontalShipmentCapture'

const userBreadCrumbs: Array<PageLink> = [
  {
    title: 'shipment',
    path: '/shipment/shipment',
    isSeparator: false,
    isActive: false,
  },
  {
    title: 'Manifest',
    path: '/shipment/Manifest',
    isSeparator: false,
    isActive: false,
  },

  {
    title: 'route',
    path: '/shipment/route',
    isSeparator: false,
    isActive: false,
  },

  {
    title: 'view price settings',
    path: '/shipment/ViewPriceSettings',
    isSeparator: false,
    isActive: false,
  },

  {
    title: 'view fleet',
    path: '/shipment/viewfleet',
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

        <Route path='/shipment/shipment'>
          <PageTitle breadcrumbs={userBreadCrumbs}>View Shipment</PageTitle>
          <ViewShipment/>
        </Route>

        <Route path='/shipment/CaptureShipment'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Capture Shipment</PageTitle>
          {/* <CaptureShipment /> */}
          <HorizontalShipmentCapture />
        </Route>

        <Route path='/shipment/routedetail/:routeId'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Route Detail</PageTitle>
          <RouteDetail />
        </Route>

        <Route path='/shipment/fleetdetail/:fleetId'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Fleet detail</PageTitle>
          <FleetDetail />
        </Route>

        <Route path='/shipment/pricesettingdetail/:id'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Price Setting</PageTitle>
          <PriceSettingDetail />
        </Route>
        {/* <Route path='/shipment/CaptureFreightShipment'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Capture Freight Shipment</PageTitle>
          <CaptureFreightShipment />
        </Route> */}
        <Route path='/shipment/Manifest'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Manifest</PageTitle>
          <Manifest />
        </Route>
        
        <Route path='/shipment/shipmentdetail/:ShipmentId'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Manifest</PageTitle>
          <ShipmentDetail />
        </Route>

        <Route path='/shipment/manifestdetail/:manifestCode'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Manifest Detail</PageTitle>
          <ManifestDetail />
        </Route>

        <Redirect from='/shipment/' exact={true} to='/shipment/users' />
        <Redirect to='/shipment/users' />
      </Switch>
    </>
  )
}

export default ShipmentPage
