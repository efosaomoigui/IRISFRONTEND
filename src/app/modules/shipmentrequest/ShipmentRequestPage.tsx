import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { PageLink, PageTitle } from '../../../_iris/layout/core'
import { ShipmentHeader } from '../shipmentmanagement/ShipmentHeader'
import { ShipmentRequest } from './components/ShipmentRequest'

const userBreadCrumbs: Array<PageLink> = [
    {
        title: 'Shipment Request',
        path: '/shipmentrequest/request',
        isSeparator: false,
        isActive: false,
    },
    
]

const ShipmentRequestPage: React.FC = () => {
    return (
        <>
            <ShipmentHeader />
            <Switch>
                <Route path='/shipmentrequest/request'>
                    <PageTitle breadcrumbs={userBreadCrumbs}>Shipment Request</PageTitle>
                    <ShipmentRequest />
                </Route>
                {/* <Route path='/shipment/fleet'>
                    <PageTitle breadcrumbs={userBreadCrumbs}>Add Fleet</PageTitle>
                </Route>
                <Route path='/shipment/viewfleet'>
                    <PageTitle breadcrumbs={userBreadCrumbs}>View Fleets</PageTitle>
                    <ViewFleets />
                </Route> */}

                {/* <Route path='/shipment/ViewPriceSettings'>
                    <PageTitle breadcrumbs={userBreadCrumbs}>Price Settings</PageTitle>
                    <ViewPriceSettings />
                </Route>

                <Route path='/shipment/shipment'>
                    <PageTitle breadcrumbs={userBreadCrumbs}>View Shipment</PageTitle>
                    <ViewShipment />
                </Route> */}

                {/* <Route path='/shipment/CaptureShipment'>
                    <PageTitle breadcrumbs={userBreadCrumbs}>Capture Shipment</PageTitle> */}
                    {/* <CaptureShipment /> */}
                    {/* <HorizontalShipmentCapture />
                </Route> */}

                {/* <Route path='/shipment/routedetail/:routeId'>
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
                </Route> */}
                {/* <Route path='/shipment/CaptureFreightShipment'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Capture Freight Shipment</PageTitle>
          <CaptureFreightShipment />
        </Route> */}
                {/* <Route path='/shipment/Manifest'>
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
                </Route> */}

                <Redirect from='/shipmentrequest/request' exact={true} to='/shipment/users' />
                <Redirect to='/shipment/users' />
            </Switch>
        </>
    )
}

export default ShipmentRequestPage
