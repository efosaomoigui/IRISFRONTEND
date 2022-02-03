import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_iris/layout/core'
import { AddTrack } from './components/operations/AddTrack'
import { SearchTrip } from './components/operations/SearchTrip'
import { TrackHistory } from './components/operations/TrackHistory'
import { ViewTrips } from './components/operations/ViewTrips'
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
    path: '/monitor/addtrack',
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
    path: '/monitor/searchtrip',
    isSeparator: false,
    isActive: false,
  }
]

const UserPage: React.FC = () => {
  return (
    <>
      <MonitorHeader />
      <Switch>
        <Route path='/monitor/trips'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Trips</PageTitle>
          <ViewTrips />
        </Route>
        <Route path='/monitor/addtrack'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Add Track</PageTitle>
          <AddTrack />
        </Route>
        <Route path='/monitor/trackhistory'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Track History</PageTitle>
          <TrackHistory />
        </Route>
        <Route path='/monitor/searchtrip'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Search Trip</PageTitle>
          <SearchTrip />
        </Route>
        <Redirect from='/monitor/' exact={true} to='/monitor/trips' />
        <Redirect to='/monitor/trips' />
      </Switch>
    </>
  )
}

export default UserPage
