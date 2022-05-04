import React, {Suspense, lazy} from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import {Redirect, Route, Switch, useHistory} from 'react-router-dom'
import { RootState } from '../../setup'
import {FallbackView} from '../../_iris/partials'
import { IUserModel } from '../modules/auth/models/AuthInterfaces'
import { ShipmentRequest } from '../modules/shipmentrequest/components/ShipmentRequest'
import ShipmentRequestPage from '../modules/shipmentrequest/ShipmentRequestPage'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {MenuTestPage} from '../pages/MenuTestPage'
import { isThorized } from './access'

export function PrivateRoutes() {
  
  const BuilderPageWrapper = lazy(() => import('../pages/layout-builder/BuilderPageWrapper'))
  const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'))
  const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
  const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
  const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))
  const UserPage = lazy(() => import('../modules/usermanagement/UserPage'))
  const WalletPage = lazy(() => import('../modules/walletmanagement/WalletPage'))
  const ShipmentPage = lazy(() => import('../modules/shipmentmanagement/ShipmentPage'))
  const PaymentPage = lazy(() => import('../modules/payment/PaymentPage'))
  const MonitorPage = lazy(() => import('../modules/monitoring/MonitorPage'))
  const FulfillmentPage = lazy(() => import('../modules/fulfillment/FulfillmentPage'))

  const user: IUserModel = useSelector<RootState>(({auth}) => auth.user, shallowEqual) as IUserModel
  const userRoles = user.roles!
  const {Admin, Finance, Agent, Customer, Driver} = isThorized(userRoles)

  return (
    <Suspense fallback={<FallbackView />}>
      <Switch>
        <Route path='/dashboard' component={DashboardWrapper} />
        <Route path='/builder' component={BuilderPageWrapper} />
        <Route path='/crafted/pages/profile' component={ProfilePage} />
        <Route path='/crafted/pages/wizards' component={WizardsPage} />

        {/* Users module routes */}
        <Route path='/admin/' component={UserPage} >
          {(Admin || Finance) ? <UserPage /> : <DashboardWrapper />}
        </Route>
        {/*  EndUsers module routes */}

        {/* Wallet module routes */}
        <Route path='/wallet/'>
          {(Finance || Admin) ? <WalletPage /> : <DashboardWrapper />}
        </Route>
        {/* end wallet module routes */}

        {/* shipment module routes */}
        <Route path='/shipment/'>
          {(Agent || Admin) ? <ShipmentPage /> : <DashboardWrapper />}
        </Route>
        {/* end shipment module routes */}

        {/* shipment request module routes */}
        <Route path='/shipmentrequest/'>
          {(Agent || Admin) ? <ShipmentRequestPage /> : <DashboardWrapper />}
        </Route>
        {/* end shipment request module routes */}

        {/* payment module routes */}
        <Route path='/payment/'>
          {(Agent || Admin) ? <PaymentPage /> : <DashboardWrapper />}
        </Route>
        {/* end payment module routes */}

        {/* monitor module routes */}
        <Route path='/monitor/'>
          {(Agent || Admin) ? <MonitorPage /> : <DashboardWrapper />}
        </Route>
        {/* end payment module routes */}

        {/* fulfillment module routes */}
        <Route path='/fulfillment/' >
          {(Agent || Admin) ? <FulfillmentPage /> : <DashboardWrapper />}
        </Route>
        {/* end payment module routes */}


        {/* <Route path='/crafted/widgets' component={WidgetsPage} /> */}
        <Route path='/adminSettings/' >
          {(Admin) ? <AccountPage /> : <DashboardWrapper />}
        </Route>
        {/* <Route path='/apps/chat' component={ChatPage} /> */}
        {/* <Route path='/menu-test' component={MenuTestPage} /> */}
        <Redirect from='/' to='/dashboard' />
        <Redirect exact from='/' to='/dashboard' />
        <Redirect to='error/404' />
      </Switch>
    </Suspense>
  )
}
