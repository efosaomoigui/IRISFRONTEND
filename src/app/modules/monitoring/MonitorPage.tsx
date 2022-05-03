import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_iris/layout/core'
import { TrackHistoryDetail } from './components/operations/trackhistory/TrackHistoryDetail'
import { ViewTrackHistory } from './components/operations/trackhistory/ViewTrackHistory'
import { TripDetail } from './components/operations/trips/TripDetail'
import { ViewTrips } from './components/operations/trips/ViewTrips'
import { RegisterTrack } from './monitorformwidget/RegisterTrack'
import { MonitorHeader } from './MonitorHeader'


const userBreadCrumbs: Array<PageLink> = [
  {
    title: 'Track History',
    path: '/monitor/trackhistory',
    isSeparator: false,
    isActive: false,
  },
  {
    title: 'Register Track',
    path: '/monitor/registerTrack',
    isSeparator: false,
    isActive: false,
  },
]

const MonitorPage: React.FC = () => {
  return (
    <>
      {/* <MonitorHeader /> */}
      <Switch>
        <Route path='/monitor/registerTrack'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Register Track</PageTitle>
          <RegisterTrack className={''} />
        </Route>

        <Route path='/monitor/trackhistory'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Track History</PageTitle>
          <ViewTrackHistory />
        </Route>
        
        <Route path='/monitor/tripDetails/:id'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Trip Detail</PageTitle>
          <TripDetail />
          </Route>
        <Route path='/monitor/trackHistoryDetails/:tripReference'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Track History</PageTitle>
          <TrackHistoryDetail />
        </Route>
        <Redirect from='/monitor/' exact={true} to='/monitor/trips' />
        <Redirect to='/monitor/trips' />
      </Switch>
    </>
  )
}

export default MonitorPage
