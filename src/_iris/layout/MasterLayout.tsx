import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { AddSearchTripModal } from '../../app/modules/monitoring/monitor modal/AddSearchTripModal'
import { AddTrackModal } from '../../app/modules/monitoring/monitor modal/AddTrackModal'
import { AddTripModal } from '../../app/modules/monitoring/monitor modal/AddTripModal'
import { AddFleetModal } from '../../app/modules/shipmentmanagement/modals/AddFleetModal'
import { AddRouteModal } from '../../app/modules/shipmentmanagement/modals/AddRouteModal'
import { AddPermissionModal } from '../../app/modules/usermanagement/modals/AddPermissionModal'
import { AddRoleModal } from '../../app/modules/usermanagement/modals/AddRoleModal'
import { AddUserModal } from '../../app/modules/usermanagement/modals/AddUserModal'
import { AddWalletModal } from '../../app/modules/walletmanagement/modals/AddWalletModal'
import { AddWalletTransactionModal } from '../../app/modules/walletmanagement/modals/AddWalletTransactionModal'
import { MenuComponent } from '../assets/ts/components'
import { Main } from '../partials'
import { AsideDefault } from './components/aside/AsideDefault'
import { Content } from './components/Content'
import { Footer } from './components/Footer'
import { HeaderWrapper } from './components/header/HeaderWrapper'
import { ScrollTop } from './components/ScrollTop'
import { Toolbar } from './components/toolbar/Toolbar'
import { PageDataProvider } from './core'



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
          {/* the header  */}
          <HeaderWrapper />

          <div id='kt_content' className='content d-flex flex-column flex-column-fluid'>
          {/* the toolbar with breadcrumbs */}
            <Toolbar />

            <div className='post d-flex flex-column-fluid' id='kt_post'>
              {/* all otehr contents are inject here */}
              <Content>{children}</Content>
            </div>
          </div>
          <Footer />
        </div>
      </div>

      {/* begin:: Modals */}
      <Main />
      {/* <InviteUsers /> */}

      {/* custom modals for iris */}
      <AddUserModal />
      <AddWalletModal />
      <AddWalletTransactionModal />
      <AddFleetModal />
      <AddRouteModal />
      <AddPermissionModal />
      <AddRoleModal />
      <AddSearchTripModal />
      <AddTrackModal />
      <AddTripModal />

      {/* scrolltop */}
      <ScrollTop />
    </PageDataProvider>
  )
}

export { MasterLayout }

