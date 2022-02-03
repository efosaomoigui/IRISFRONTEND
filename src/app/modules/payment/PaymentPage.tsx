import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_iris/layout/core'
import { LogPayment } from './components/operations/LogPayment'
import { PaymentHistory } from './components/operations/PaymentHistory'
import { ViewWallets } from './components/operations/ViewWallets'
import { WalletTransactions } from './components/operations/WalletTransactions'
import { PaymentHeader } from './PaymentHeader'



const userBreadCrumbs: Array<PageLink> = [
  {
    title: 'Wallet',
    path: '/payment/wallet',
    isSeparator: false,
    isActive: false,
  },
  {
    title: 'Transaction',
    path: '/payment/transaction',
    isSeparator: false,
    isActive: false,
  },
  {
    title: 'Log Payment',
    path: '/payment/LogPayment',
    isSeparator: false,
    isActive: false,
  },
  {
    title: 'Payment History',
    path: '/payment/PaymentHistory',
    isSeparator: false,
    isActive: false,
  }
]

const UserPage: React.FC = () => {
  return (
    <>
      <PaymentHeader />
      <Switch>
        <Route path='/payment/wallet'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Wallet</PageTitle>
          <ViewWallets />
        </Route>
        <Route path='/payment/transaction'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Transaction</PageTitle>
          <WalletTransactions />
        </Route>
        <Route path='/payment/LogPayment'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Log Payment</PageTitle>
          <LogPayment />
        </Route>
        <Route path='/payment/PaymentHistory'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Payment History</PageTitle>
          <PaymentHistory />
        </Route>
        
        <Redirect from='/admin/' exact={true} to='/admin/users' />
        <Redirect to='/admin/users' />
      </Switch>
    </>
  )
}

export default UserPage
