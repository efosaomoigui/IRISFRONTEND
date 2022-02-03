import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_iris/layout/core'
import { DeliverShipment } from './components/operations/DeliverShipment'
import { FulfillmentHeader } from './FulfillmentHeader'



const userBreadCrumbs: Array<PageLink> = [
  {
    title: 'Deliver Shipment',
    path: '/fulfillment/delivershipment',
    isSeparator: false,
    isActive: false,
  }
  
]

const FulfillmentPage: React.FC = () => {
  return (
    <>
      <FulfillmentHeader />
      <Switch>
        <Route path='/fulfillment/delivershipment'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Deliver Shipment</PageTitle>
          <DeliverShipment />
        </Route>
       
        <Redirect from='/fulfillment/' exact={true} to='/fulfillment/delivershipment' />
        <Redirect to='/fulfillment/delivershipment' />
      </Switch>
    </>
  )
}

export default FulfillmentPage
