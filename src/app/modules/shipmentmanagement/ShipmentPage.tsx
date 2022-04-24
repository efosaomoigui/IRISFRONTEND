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
import { ViewGroupWaybills } from './components/processingandpackaging/ViewGroupwaybills'
import { GroupWayBill } from './components/processingandpackaging/Groupwaybills'
import { ViewManifests } from './components/processingandpackaging/ViewManifests'
import { ViewTrips } from '../monitoring/components/operations/trips/ViewTrips'

const userBreadCrumbs: Array<PageLink> = [
  {
    title: 'Shipments',
    path: '/shipment/shipment',
    isSeparator: false,
    isActive: false,
  },
  {
    title: 'Routes',
    path: '/shipment/route',
    isSeparator: false,
    isActive: false,
  },
  {
    title: 'Price Settings',
    path: '/shipment/ViewPriceSettings',
    isSeparator: false,
    isActive: false,
  },
  {
    title: 'Group Waybills',
    path: '/shipment/processgroupwaybill',
    isSeparator: false,
    isActive: false,
  },
  {
    title: 'Manifests',
    path: '/shipment/processmanifest',
    isSeparator: false,
    isActive: false,
  },
  {
    title: 'Fleet',
    path: '/shipment/viewfleet',
    isSeparator: false,
    isActive: false,
  },
  {
    title: 'Trips',
    path: '/monitor/trips',
    isSeparator: false,
    isActive: false,
  },
 
]

const ShipmentPage: React.FC = () => {
  return (
    <>
      {/* <ShipmentHeader /> */}
      <Switch>
        <Route path='/shipment/routes'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Routes</PageTitle>
          <ViewRoutes />
        </Route>
        <Route path='/shipment/fleet'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Add Fleet</PageTitle>
        </Route>
        <Route path='/shipment/viewfleet'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Fleet</PageTitle>
          <ViewFleets />
        </Route>

        <Route path='/shipment/ViewPriceSettings'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Price Setting</PageTitle>
          <ViewPriceSettings/>
        </Route>

        <Route path='/shipment/shipment'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Shipments</PageTitle>
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
        <Route path='/shipment/manifest'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Manifest</PageTitle>
          <ViewManifests />
        </Route>
        
        <Route path='/shipment/groupwaybill'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Group Waybill</PageTitle>
          <ViewGroupWaybills />
        </Route>

        <Route path='/shipment/processmanifest'>
        <PageTitle breadcrumbs={userBreadCrumbs}>Process Manifest</PageTitle>
          <Manifest />
        </Route>
        <Route path='/shipment/processgroupwaybill'>
        <PageTitle breadcrumbs={userBreadCrumbs}>Process Group Waybill</PageTitle>
          <GroupWayBill />
        </Route>
        
        <Route path='/shipment/shipmentdetail/:waybill'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Manifest</PageTitle>
          <ShipmentDetail />
        </Route>

        <Route path='/shipment/manifestdetail/:manifestCode'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Manifest Detail</PageTitle>
          <ManifestDetail />
        </Route>

        <Route path='/shipment/trips'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Trip</PageTitle>
          <ViewTrips />
        </Route>

        <Redirect from='/shipment/' exact={true} to='/shipment/users' />
        <Redirect to='/shipment/users' />
      </Switch>
    </>
  )
}

export default ShipmentPage
