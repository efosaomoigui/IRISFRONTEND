import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { MenuComponent } from '../assets/ts/components';
import { InviteUsers, Main } from '../partials';
import { AddUserModal } from '../../app/modules/usermanagement/modals/AddUserModal';
import { AsideDefault } from './components/aside/AsideDefault';
import { Content } from './components/Content';
import { Footer } from './components/Footer';
import { HeaderWrapper } from './components/header/HeaderWrapper';
import { ScrollTop } from './components/ScrollTop';
import { Toolbar } from './components/toolbar/Toolbar';
import { PageDataProvider } from './core';

import { AddFleetModal } from '../../app/modules/shipmentmanagement/modals/AddFleetModal';
import { AddRouteModal } from '../../app/modules/shipmentmanagement/modals/AddRouteModal';
import { AddWalletModal } from '../../app/modules/walletmanagement/modals/AddWalletModal';
import { AddRoleModal } from '../../app/modules/usermanagement/modals/AddRoleModal';
import { AddPermissionModal } from '../../app/modules/usermanagement/modals/AddPermissionModal';

const MasterLayout: React.FC = ({children}) => {
  const location = useLocation()
  useEffect(() => {
    setTimeout(() => {
      MenuComponent.reinitialization()
    }, 500)
  }, [])

  useEffect(() => {
    setTimeout(() => {
      MenuComponent.reinitialization()
    }, 500)
  }, [location.key])

  return (
    <PageDataProvider>
      <div className='page d-flex flex-row flex-column-fluid'>
        <AsideDefault />
        <div className='wrapper d-flex flex-column flex-row-fluid' id='kt_wrapper'>
          <HeaderWrapper />

          <div id='kt_content' className='content d-flex flex-column flex-column-fluid'>
            <Toolbar />
            <div className='post d-flex flex-column-fluid' id='kt_post'>
              <Content>{children}</Content>
            </div>
          </div>
          <Footer />
        </div>
      </div>

      {/* begin:: Drawers */}
      {/* <ActivityDrawer /> */}
        {/* <RightToolbar/> */}
      {/* <DrawerMessenger /> */}
      {/* end:: Drawers */}

      {/* begin:: Modals */}
      <Main />
      <InviteUsers />

      {/* custom modals for iris */}
      <AddUserModal />
      <AddWalletModal />
      <AddFleetModal />
      <AddRouteModal />
      <AddPermissionModal />
      <AddRoleModal />
{/* 
          

          <AddRouteModal />

          <AddPriceModal />

          <AddTripModal />

          <AddWalletModal /> */}
    {/* end custom modals for iris */}

      {/* <UpgradePlan /> */}
      {/* end:: Modals */}
      <ScrollTop />
    </PageDataProvider>
  )
}

export {MasterLayout}
