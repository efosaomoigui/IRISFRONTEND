import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_iris/layout/core'
import { WalletHeader } from './WalletHeader'
import { ViewWallet } from './components/settings/ViewWallet'
import { WalletTransaction } from './components/settings/WalletTransaction'



const userBreadCrumbs: Array<PageLink> = [
  {
    title: 'View Wallet',
    path: '/wallet/wallets',
    isSeparator: false,
    isActive: false,
  },
  {
    title: 'Add Wallet',
    path: '/wallet/addwallet',
    isSeparator: false,
    isActive: false,
  },
  {
    title: 'Wallet Transaction',
    path: '/wallet/transactions',
    isSeparator: false,
    isActive: false,
  }
]

const WalletPage: React.FC = () => {
  return (
    <>
      <WalletHeader />
      <Switch>
        <Route path='/wallet/wallets'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Wallets</PageTitle>
          <ViewWallet />
        </Route>
        {/* <Route path='/wallet/addwallet'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Add Wallet</PageTitle>
        </Route> */}
        <Route path='/wallet/transactions'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Wallet Transactions</PageTitle>
          <WalletTransaction />
        </Route>
        <Redirect from='/wallet/' exact={true} to='/wallet/wallets' />
        <Redirect to='/wallet/wallets' />
      </Switch>
    </>
  )
}

export default WalletPage
