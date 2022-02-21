import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_iris/layout/core'
import { ViewTrackHistory } from './components/operations/trackhistory/ViewTrackHistory'
import { ViewTrips } from './components/operations/trips/ViewTrips'
import { MonitorHeader } from './MonitorHeader'


const userBreadCrumbs: Array<PageLink> = [
  {
    title: 'Trips',
    path: '/monitor/trips',
    isSeparator: false,
    isActive: false,
  },
  {
    title: 'Add Track',
    path: '/monitor/addtrip',
    isSeparator: false,
    isActive: false,
  },
  {
    title: 'Track History',
    path: '/monitor/trackhistory',
    isSeparator: false,
    isActive: false,
  },
  {
    title: 'Search Trip',
    path: '/monitor/addtrip',
    isSeparator: false,
    isActive: false,
  }
]

const MonitorPage: React.FC = () => {
  return (
    <>
      <MonitorHeader />
      <Switch>
        <Route path='/monitor/trips'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Trips</PageTitle>
          <ViewTrips />
        </Route>
        <Route path='/monitor/trackhistory'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Track History</PageTitle>
          <ViewTrackHistory />
        </Route>
        <Redirect from='/monitor/' exact={true} to='/monitor/trips' />
        <Redirect to='/monitor/trips' />
      </Switch>
    </>
  )
}

export default MonitorPage
