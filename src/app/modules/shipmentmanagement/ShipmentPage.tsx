import React from 'react'
import {Redirect, Route, Switch, useHistory} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_iris/layout/core'
import {ShipmentHeader} from './ShipmentHeader'
import {ViewRoutes} from './components/settings/ViewRoutes'
import {ViewFleets} from './components/settings/ViewFleets'
import {CaptureShipment} from './components/capture/CaptureShipment'

import {ViewPriceSettings} from './components/settings/ViewPriceSettings'
import {Manifest} from './components/processingandpackaging/Manifest'
import {ViewShipment} from './components/capture/ViewShipment'
import {ShipmentDetail} from './components/capture/ShipmentDetail'
import {ManifestDetail} from './components/processingandpackaging/ManifestDetail'
import {RouteDetail} from './components/settings/RouteDetail'
import {FleetDetail} from './components/settings/FleetDetail'
import {PriceSettingDetail} from './components/settings/PriceSettingDetail'
import {HorizontalShipmentCapture} from './components/capture/HorizontalShipmentCapture'
import {ViewGroupWaybills} from './components/processingandpackaging/ViewGroupwaybills'
import {GroupWayBill} from './components/processingandpackaging/Groupwaybills'
import {ViewManifests} from './components/processingandpackaging/ViewManifests'
import {ViewTrips} from '../monitoring/components/operations/trips/ViewTrips'
import {ProcessDispatch} from './components/processingandpackaging/ProcessDispatch'
import {isThorized} from '../../routing/access'
import { IUserModel } from '../auth/models/AuthInterfaces'
import { shallowEqual, useSelector } from 'react-redux'
import { RootState } from '../../../setup'

const userBreadCrumbs: Array<PageLink> = [
  {
    title: 'Shipments',
    path: '/shipment/shipment',
    isSeparator: false,
    isActive: false,
  },
  // {
  //   title: 'Routes',
  //   path: '/shipment/route',
  //   isSeparator: false,
  //   isActive: false,
  // },
  // {
  //   title: 'Fleet',
  //   path: '/shipment/viewfleet',
  //   isSeparator: false,
  //   isActive: false,
  // },
  // {
  //   title: 'Price Settings',
  //   path: '/shipment/ViewPriceSettings',
  //   isSeparator: false,
  //   isActive: false,
  // },
  {
    title: 'Add Group Waybills',
    path: '/shipment/processgroupwaybill',
    isSeparator: false,
    isActive: false,
  },
  {
    title: 'Add Manifests',
    path: '/shipment/processmanifest',
    isSeparator: false,
    isActive: false,
  },
  {
    title: 'Register Trip Dispatch',
    path: '/shipment/processdispatch',
    isSeparator: false,
    isActive: false,
  },
]

const ShipmentPage: React.FC = () => {
  const user: IUserModel = useSelector<RootState>(({auth}) => auth.user, shallowEqual) as IUserModel
  const userRoles = ['Admin']
  const {Admin, Finance, Agent, Customer, Driver} = isThorized(userRoles)

  const history = useHistory()
  return (
    <>
      {/* <ShipmentHeader /> */}
      <Switch>
        <Route path='/shipment/routes'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Routes</PageTitle>
          {Admin ? <ViewRoutes /> : <Redirect to='/shipment/shipment' />}
          {/* <ViewRoutes /> */}
        </Route>
        <Route path='/shipment/fleet'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Add Fleet</PageTitle>
        </Route>
        <Route path='/shipment/viewfleet'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Fleet</PageTitle>
          {Admin ? <ViewFleets /> : <Redirect to='/shipment/shipment' />}
          {/* <ViewFleets /> */}
        </Route>

        <Route path='/shipment/ViewPriceSettings'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Price Settings</PageTitle>
          {Admin ? <ViewPriceSettings /> : <Redirect to='/' />}
          {/* <ViewPriceSettings /> */}
        </Route>

        <Route path='/shipment/shipment'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Shipments</PageTitle>
          {Admin || Finance || Agent ? <ViewShipment /> : <Redirect to='/shipment/shipment' />}
          {/* <ViewShipment /> */}
        </Route>

        <Route path='/shipment/CaptureShipment'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Capture Shipment</PageTitle>
          {Admin || Agent ? <HorizontalShipmentCapture /> : <Redirect to='/shipment/shipment' />}
          {/* <CaptureShipment /> */}
          {/* <HorizontalShipmentCapture /> */}
        </Route>

        <Route path='/shipment/routedetail/:routeId'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Route Detail</PageTitle>
          {Admin ? <RouteDetail /> : <Redirect to='/shipment/shipment' />}
          {/* <RouteDetail /> */}
        </Route>

        <Route path='/shipment/fleetdetail/:fleetId'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Fleet detail</PageTitle>
          {Admin ? <FleetDetail /> : <Redirect to='/shipment/shipment' />}
          {/* <FleetDetail /> */}
        </Route>

        <Route path='/shipment/pricesettingdetail/:id'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Price Setting</PageTitle>
          {Admin || Finance ? <PriceSettingDetail /> : <Redirect to='/shipment/shipment' />}
          {/* <PriceSettingDetail /> */}
        </Route>
        {/* <Route path='/shipment/CaptureFreightShipment'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Capture Freight Shipment</PageTitle>
          <CaptureFreightShipment />
        </Route> */}
        <Route path='/shipment/manifest'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Manifest</PageTitle>
          {Admin || Finance || Agent ? <ViewManifests /> : <Redirect to='/shipment/shipment' />}
          {/* <ViewManifests /> */}
        </Route>

        <Route path='/shipment/groupwaybill'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Group Waybill</PageTitle>
          {Admin || Finance || Agent ? <ViewGroupWaybills /> : <Redirect to='/shipment/shipment' />}
          {/* <ViewGroupWaybills /> */}
        </Route>

        <Route path='/shipment/processmanifest'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Process Manifest</PageTitle>
          {Admin || Finance || Agent ? <Manifest /> : <Redirect to='/shipment/shipment' />}
          {/* <Manifest /> */}
        </Route>

        <Route path='/shipment/processdispatch'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Process Dispatch</PageTitle>
          {Admin || Finance || Agent ? <ProcessDispatch /> : <Redirect to='/shipment/shipment' />}
          {/* <ProcessDispatch /> */}
        </Route>

        <Route path='/shipment/processgroupwaybill'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Process Group Waybill</PageTitle>
          {Admin || Agent ? <GroupWayBill /> : <Redirect to='/' />}
          {/* <GroupWayBill /> */}
        </Route>

        <Route path='/shipment/shipmentdetail/:waybill'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Manifest</PageTitle>
          {Admin || Finance || Agent ? <ShipmentDetail /> : <Redirect to='/shipment/shipment' />}
          {/* <ShipmentDetail /> */}
        </Route>

        <Route path='/shipment/manifestdetail/:manifestCode'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Manifest Detail</PageTitle>
          {Admin || Finance || Agent ? <ManifestDetail /> : <Redirect to='/shipment/shipment' />}
          {/* <ManifestDetail /> */}
        </Route>

        <Route path='/shipment/trips'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Trip</PageTitle>
          {Admin || Finance || Agent ? <ViewTrips /> : <Redirect to='/shipment/shipment' />}
          {/* <ViewTrips /> */}
        </Route>

        <Redirect from='/shipment/' exact={true} to='/shipment/users' />
        <Redirect to='/shipment/users' />
      </Switch>
    </>
  )
}

export default ShipmentPage
