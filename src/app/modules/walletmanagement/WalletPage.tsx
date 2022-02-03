import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_iris/layout/core'
import { WalletHeader } from './WalletHeader'
import { WalletTransaction } from './components/settings/WalletTransaction'
import { AddWallet } from './components/settings/AddWallet'
import { ViewWallet } from './components/settings/ViewWallet'

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
        <Route path='/wallet/addwallet'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Add Wallet</PageTitle>
          <AddWallet />
        </Route>
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
