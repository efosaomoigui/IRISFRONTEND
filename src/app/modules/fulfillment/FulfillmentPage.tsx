import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_iris/layout/core'
import { CollectionCenterDetail } from './components/operations/CollectionCenterDetail'
import { CollectionCenter } from './components/operations/ViewCollectionCenter'
import { FulfillmentHeader } from './FulfillmentHeader'


const userBreadCrumbs: Array<PageLink> = [
  {
    title: 'Collection Center',
    path: '/fulfillment/collectioncenter',
    isSeparator: false,
    isActive: false,
  }
  
]

const FulfillmentPage: React.FC = () => {
  return (
    <>
      <FulfillmentHeader />
      <Switch>
        <Route path='/fulfillment/collectioncenter'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Collection Center</PageTitle>
          <CollectionCenter />
        </Route>

        <Route path='/fulfillment/collectioncenterdetail/:Id'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Collection Center</PageTitle>
          <CollectionCenterDetail />
        </Route>
       
        <Redirect from='/fulfillment/' exact={true} to='/fulfillment/collectioncenter' />
        <Redirect to='/fulfillment/collectioncenter' />
      </Switch>
    </>
  )
}

export default FulfillmentPage
