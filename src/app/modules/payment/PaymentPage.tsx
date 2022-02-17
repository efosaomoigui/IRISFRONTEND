import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_iris/layout/core'
import { Invoice } from './components/operations/Invoice'
import { PaymentLog } from './components/operations/PaymentLog'
import { PaymentHeader } from './PaymentHeader'



const userBreadCrumbs: Array<PageLink> = [
 
  
  {
    title: 'Payment Log',
    path: '/payment/paymentlog',
    isSeparator: false,
    isActive: false,
  },
  {
    title: 'Invoice',
    path: '/payment/invoice',
    isSeparator: false,
    isActive: false,
  }
]

const UserPage: React.FC = () => {
  return (
    <>
      <PaymentHeader />
      <Switch>
        {/* <Route path='/payment/wallet'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Wallet</PageTitle>
          <ViewWallets />
        </Route>
        <Route path='/payment/transaction'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Transaction</PageTitle>
          <WalletTransactions />
        </Route> */}
        <Route path='/payment/paymentlog'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Payment Log</PageTitle>
          <PaymentLog />
        </Route>
        <Route path='/payment/invoice'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Invoice</PageTitle>
          <Invoice />
        </Route>
        
        <Redirect from='/admin/' exact={true} to='/admin/users' />
        <Redirect to='/admin/users' />
      </Switch>
    </>
  )
}

export default UserPage
