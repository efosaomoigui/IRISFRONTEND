import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_iris/layout/core'
import {WalletHeader} from './WalletHeader'
import {ViewWallet} from './components/settings/ViewWallet'
import {WalletTransaction} from './components/settings/WalletTransaction'
import {WalletDetail} from './components/settings/WalletDetail'
import {WalletTransactionDetail} from './components/settings/WalletTransactionDetail'
import {UserWalletTransaction} from './components/settings/UserWalletTransaction'
import {IUserModel} from '../auth/models/AuthInterfaces'
import {shallowEqual, useSelector} from 'react-redux'
import {RootState} from '../../../setup'
import {isThorized} from '../../routing/access'
import DashboardWrapper from '../../pages/dashboard/DashboardWrapper'

const userBreadCrumbs: Array<PageLink> = [
  {
    title: 'Wallet',
    path: '/wallet/wallets',
    isSeparator: false,
    isActive: false,
  },
  // {
  //   title: 'Add Wallet',
  //   path: '/wallet/addwallet',
  //   isSeparator: false,
  //   isActive: false,
  // },
  {
    title: 'Wallet Transaction',
    path: '/wallet/transactions',
    isSeparator: false,
    isActive: false,
  },
]

const WalletPage: React.FC = () => {
  const user: IUserModel = useSelector<RootState>(({auth}) => auth.user, shallowEqual) as IUserModel
  const userRoles = user.roles!
  const {Admin, Finance, Agent, Driver} = isThorized(userRoles)
  return (
    <>
      {/* <WalletHeader /> */}
      <Switch>
        <Route path='/wallet/wallets'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Wallet</PageTitle>
          {Finance || Admin ? <ViewWallet /> : <DashboardWrapper />}
          {/* <ViewWallet /> */}
        </Route>
        {/* <Route path='/wallet/addwallet'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Add Wallet</PageTitle>
        </Route> */}
        <Route path='/wallet/transactions'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Wallet Transactions</PageTitle>
          {Finance || Admin || Agent ? <WalletTransaction /> : <DashboardWrapper />}
          {/* <WalletTransaction /> */}
        </Route>
        {/* 
        <Route path='/wallet/walletops'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Wallet Transactions</PageTitle>
          <WalletOps />
        </Route> */}

        <Route path='/wallet/walletdetails/:walletId'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Wallet Details</PageTitle>
          <WalletDetail />
        </Route>

        <Route path='/wallet/wallettransactiondetails/:id'>
          <PageTitle breadcrumbs={userBreadCrumbs}>Wallet Transactions</PageTitle>
          <WalletTransactionDetail />
        </Route>

        <Route path='/wallet/wtransactions/:userId'>
          <PageTitle breadcrumbs={userBreadCrumbs}>My Wallet Transactions</PageTitle>
          <UserWalletTransaction />
        </Route>

        <Route path='/wallet/wtransactions'>
          <PageTitle breadcrumbs={userBreadCrumbs}>My Wallet Transactions</PageTitle>
          <UserWalletTransaction />
        </Route>

        <Redirect from='/wallet/' exact={true} to='/wallet/wallets' />
        <Redirect to='/wallet/wallets' />
      </Switch>
    </>
  )
}

export default WalletPage
