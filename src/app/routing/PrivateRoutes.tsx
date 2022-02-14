import React, {Suspense, lazy} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {FallbackView} from '../../_iris/partials'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {MenuTestPage} from '../pages/MenuTestPage'

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


  return (
    <Suspense fallback={<FallbackView />}>
      <Switch>
        <Route path='/dashboard' component={DashboardWrapper} />
        <Route path='/builder' component={BuilderPageWrapper} />
        <Route path='/crafted/pages/profile' component={ProfilePage} />
        <Route path='/crafted/pages/wizards' component={WizardsPage} />

        {/* Users module routes */}
        <Route path='/admin/' component={UserPage} />
        {/*  EndUsers module routes */}

        {/* Wallet module routes */}
        <Route path='/wallet/' component={WalletPage} />
        {/* end wallet module routes */}

        {/* shipment module routes */}
        <Route path='/shipment/' component={ShipmentPage} />
        {/* end shipment module routes */}

        {/* payment module routes */}
        <Route path='/payment/' component={PaymentPage} />
        {/* end payment module routes */}

        {/* monitor module routes */}
        <Route path='/monitor/' component={MonitorPage} />
        {/* end payment module routes */}

        {/* fulfillment module routes */}
        <Route path='/fulfillment/' component={FulfillmentPage} />
        {/* end payment module routes */}


        <Route path='/crafted/widgets' component={WidgetsPage} />
        <Route path='/adminSettings/' component={AccountPage} />
        <Route path='/apps/chat' component={ChatPage} />
        <Route path='/menu-test' component={MenuTestPage} />
        <Redirect from='/auth' to='/dashboard' />
        <Redirect exact from='/' to='/dashboard' />
        <Redirect to='error/404' />
      </Switch>
    </Suspense>
  )
}
