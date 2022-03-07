import React, {useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import {AddCollectionCenterModal} from '../../app/modules/fulfillment/modals/AddCollectionCenterModal'
import {AddTrackHistoryModal} from '../../app/modules/monitoring/monitor modal/AddTrackHistoryModal'
import {AddTripModal} from '../../app/modules/monitoring/monitor modal/AddTripModal'
import {AddInvoiceModal} from '../../app/modules/payment/paymentmodals/AddInvoiceModal'
import {AddPaymentLogModal} from '../../app/modules/payment/paymentmodals/AddPaymentLogModal'
import {AddFleetModal} from '../../app/modules/shipmentmanagement/modals/AddFleetModal'
import {AddManifestModal} from '../../app/modules/shipmentmanagement/modals/AddManifestModal'
import {AddRouteModal} from '../../app/modules/shipmentmanagement/modals/AddRouteModal'
import {AddPermissionModal} from '../../app/modules/usermanagement/modals/AddPermissionModal'
import {AddRoleModal} from '../../app/modules/usermanagement/modals/AddRoleModal'
import {AddUserModal} from '../../app/modules/usermanagement/modals/AddUserModal'
import {AddWalletModal} from '../../app/modules/walletmanagement/modals/AddWalletModal'
import {AddWalletTransactionModal} from '../../app/modules/walletmanagement/modals/AddWalletTransactionModal'
import {MenuComponent} from '../assets/ts/components'
import {Main} from '../partials'
import {AddPriceModal} from '../../app/modules/shipmentmanagement/modals/AddPriceModal'
import {AsideDefault} from './components/aside/AsideDefault'
import {Content} from './components/Content'
import {Footer} from './components/Footer'
import {HeaderWrapper} from './components/header/HeaderWrapper'
import {ScrollTop} from './components/ScrollTop'
import {Toolbar} from './components/toolbar/Toolbar'
import {PageDataProvider} from './core'
import {EditUserModal} from '../../app/modules/usermanagement/modals/EditUserModal'
import {EditWalletModal} from '../../app/modules/walletmanagement/modals/EditWalletModal'
import { EditRoleModal } from '../../app/modules/usermanagement/modals/EditRoleModal'
import { EditPermissionModal } from '../../app/modules/usermanagement/modals/EditPermissionModal'
import { EditWalletTransactionModal } from '../../app/modules/walletmanagement/modals/EditWalletTransactionModal'
import { EditFleetModal } from '../../app/modules/shipmentmanagement/modals/EditFleetModal'
import { EditManifestModal } from '../../app/modules/shipmentmanagement/modals/EditManifestModal'
import { EditPriceModal } from '../../app/modules/shipmentmanagement/modals/EditPriceModal'
import { EditRouteModal } from '../../app/modules/shipmentmanagement/modals/EditRouteModal'
import { EditTripModal } from '../../app/modules/monitoring/monitor modal/EditTripModal'
import { EditTrackHistoryModal } from '../../app/modules/monitoring/monitor modal/EditTrackHistoryModal'


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
      <EditUserModal />

      <AddWalletModal />
      <EditWalletModal />

      <AddWalletTransactionModal />
      <EditWalletTransactionModal />

      <AddPermissionModal />
      <EditPermissionModal />

      <AddRoleModal />
      <EditRoleModal />

      <AddFleetModal />
      <EditFleetModal />

      <AddTripModal />
      <EditTripModal />

      <AddPriceModal />
      <EditPriceModal />

      <AddRouteModal />
      <EditRouteModal />

      <AddCollectionCenterModal />

      <AddManifestModal />
      <EditManifestModal />

      <AddPaymentLogModal />
      <AddInvoiceModal />
      
      <AddTrackHistoryModal />
      <EditTrackHistoryModal />
      {/* scrolltop */}
      <ScrollTop />
    </PageDataProvider>
  )
}

export {MasterLayout}
