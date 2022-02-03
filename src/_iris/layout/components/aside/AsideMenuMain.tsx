/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import {useIntl} from 'react-intl'
import {KTSVG} from '../../../helpers'
import {AsideMenuItemWithSub} from './AsideMenuItemWithSub'
import {AsideMenuItem} from './AsideMenuItem'

export function AsideMenuMain() {
  const intl = useIntl()

  return (
    <>
      <AsideMenuItem
        to='/dashboard'
        icon='/media/icons/duotune/art/art002.svg'
        title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
        fontIcon='bi-app-indicator'
      />
      {/* <AsideMenuItem
        to='/builder'
        icon='/media/icons/duotune/general/gen019.svg'
        title='Layout Builder'
        fontIcon='bi-layers'
      /> */}

      {/* ADMIN PANEL */}
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>USER MANAGEMENT</span>
        </div>
      </div>
      <AsideMenuItemWithSub
        to='/admin'
        icon='/media/icons/duotune/general/gen0 19.svg'
        title='User Management'
        fontIcon='bi-layers'
      >
        <AsideMenuItem to='/admin/Users' title='Users' hasBullet={true} />
        <AsideMenuItem to='/admin/roles' title='Roles' hasBullet={true} />
        <AsideMenuItem to='/admin/permissions' title='Permissions' hasBullet={true} />
      </AsideMenuItemWithSub>
       

      {/* SETTINGS */}
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>WALLET MANAGEMENT</span>
        </div>
      </div>
      <AsideMenuItemWithSub
        to='/wallet'
        icon='/media/icons/duotune/general/gen019.svg'
        title='Wallet Management'
        fontIcon='bi-layers'
       >
        <AsideMenuItem to='/wallet/Users' title='Wallets' hasBullet={true} />
        <AsideMenuItem to='/wallet/addwallet' title='Add Wallets' hasBullet={true} />
        <AsideMenuItem to='/wallet/transactions' title='Wallets Transactions' hasBullet={true} />
        {/* <AsideMenuItem to='/settings/Fleets' title='Fleets' hasBullet={true} />
        <AsideMenuItem to='/settings/Routes' title='Routes' hasBullet={true} />
        <AsideMenuItem to='/settings/Tripsanddispatch' title='Trips & Dispatch' hasBullet={true} />
        <AsideMenuItem to='/settings/Price' title='Price' hasBullet={true} /> */}
      </AsideMenuItemWithSub>

      {/* DOMESTIC SHIPMENT */}
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Shipment Management</span>
        </div>
      </div>
      <AsideMenuItemWithSub
        to='/shipment/CaptureDomesticShipment'
        icon='/media/icons/duotune/general/gen019.svg'
        title='Capture'
        fontIcon='bi-layers'
      >
        <AsideMenuItem to='/shipment/CaptureDomesticShipment' title='Capture Domestic Shipment' hasBullet={true} />
        <AsideMenuItem to='/shipment/CaptureFreightShipment' title='Capture Freight Shipment' hasBullet={true} />
        {/* <AsideMenuItem to='/shipment/viewfleet' title='Shipment' hasBullet={true} />
        <AsideMenuItem to='/shipment/viewfleet' title='Shipment' hasBullet={true} />
        <AsideMenuItem to='/shipment/viewfleet' title='Shipment' hasBullet={true} />
        <AsideMenuItem to='/shipment/viewfleet' title='Shipment' hasBullet={true} />
        <AsideMenuItem to='/shipment/viewfleet' title='Shipment' hasBullet={true} /> */}
        {/* <AsideMenuItem to='/shipment/CaptureShipment' title='capture shipment' hasBullet={true} />
        <AsideMenuItem to='/shipment/Shipment' title='Shipment' hasBullet={true} /> */}
      </AsideMenuItemWithSub>
      <AsideMenuItemWithSub
        to='/shipment'
        icon='/media/icons/duotune/general/gen019.svg'
        title='Processing & Packaging'
        fontIcon='bi-layers'
      >
        <AsideMenuItem to='/shipment/Dispatch' title='Dispatch' hasBullet={true} />
        <AsideMenuItem to='/shipment/Manifest' title='Manifest' hasBullet={true} />
        <AsideMenuItem to='/shipment/SortShipment' title='Sort Shipment' hasBullet={true} />
        {/* <AsideMenuItem to='/shipment/PackagingOptions' title='Packaging Options' hasBullet={true} />
        <AsideMenuItem to='/shipment/GroupPackagingShipment' title='Group & Package Shipment' hasBullet={true} />
        <AsideMenuItem to='/shipment/Manifest' title='Manifest' hasBullet={true} /> */}
      </AsideMenuItemWithSub>

      <AsideMenuItemWithSub
        to='/shipment'
        icon='/media/icons/duotune/general/gen019.svg'
        title='Search'
        fontIcon='bi-layers'
      >
        <AsideMenuItem to='/shipment/SearchShipment' title='Search Shipment' hasBullet={true} />
      </AsideMenuItemWithSub>

      <AsideMenuItemWithSub
        to='/shipment'
        icon='/media/icons/duotune/general/gen019.svg'
        title='Settings'
        fontIcon='bi-layers'
      >
        <AsideMenuItem to='/shipment/routes' title='Routes' hasBullet={true} />
        <AsideMenuItem to='/shipment/addroutes' title='Add Routes' hasBullet={true} />
        <AsideMenuItem to='/shipment/fleet' title='Add Fleet' hasBullet={true} />
        <AsideMenuItem to='/shipment/viewfleet' title='View Fleets' hasBullet={true} />
        <AsideMenuItem to='/shipment/pricesettings' title='Price Settings' hasBullet={true} />
        {/* <AsideMenuItem to='/shipment/ShipmentTracking' title='Shipment Tracking' hasBullet={true} /> */}
      </AsideMenuItemWithSub>
      
      {/* FINANCE AND ACCOUNTING */}
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Finance & Accounting</span>
        </div>
      </div>
      <AsideMenuItemWithSub
        to='/finance-and-accounting'
        icon='/media/icons/duotune/general/gen019.svg'
        title='Wallet Management'
        fontIcon='bi-layers'
      >
        <AsideMenuItem to='/finance-and-accounting/Wallet' title='Wallets' hasBullet={true} />
        <AsideMenuItem to='/finance-and-accounting/Debits' title='Debits' hasBullet={true} />
        <AsideMenuItem to='/finance-and-accounting/Credit' title='Credit' hasBullet={true} />
        <AsideMenuItem to='/finance-and-accounting/ViewTransaction' title='View transaction' hasBullet={true} />
      </AsideMenuItemWithSub>

      <AsideMenuItemWithSub
        to='/finance-and-accounting'
        icon='/media/icons/duotune/general/gen019.svg'
        title='Invoice'
        fontIcon='bi-layers'
      >
        <AsideMenuItem to='/finance-and-accounting/Invoices' title='Invoices' hasBullet={true} />
      </AsideMenuItemWithSub>

      <AsideMenuItemWithSub
        to='/finance-and-accounting'
        icon='/media/icons/duotune/general/gen019.svg'
        title='Payments '
        fontIcon='bi-layers'
      >
        <AsideMenuItem to='/finance-and-accounting/PaymentsLogs' title='Payments Logs' hasBullet={true} />
      </AsideMenuItemWithSub>
      
      {/* REPORTING */}
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Reporting</span>
        </div>
      </div>
      <AsideMenuItemWithSub
        to='/reporting'
        icon='/media/icons/duotune/general/gen019.svg'
        title='Shipment'
        fontIcon='bi-layers'
      >
        <AsideMenuItem to='/reporting/Shipments' title='Shipment' hasBullet={true} />
      </AsideMenuItemWithSub>
      <AsideMenuItemWithSub
        to='/reporting'
        icon='/media/icons/duotune/general/gen019.svg'
        title='Wallet'
        fontIcon='bi-layers'
      >
        <AsideMenuItem to='/reporting/WalletReporting' title='Wallet reporting' hasBullet={true} />
      </AsideMenuItemWithSub>
      {/* <AsideMenuItem
        to='/settings/Routes'
        icon='/media/icons/duotune/general/gen019.svg'
        title='Route'
        fontIcon='bi-layers'
      />
      <AsideMenuItem
        to='/settings/Tripsanddispatch'
        icon='/media/icons/duotune/general/gen019.svg'
        title='Trips & Dispatch'
        fontIcon='bi-layers'
      />
      <AsideMenuItem
        to='/settings/Price'
        icon='/media/icons/duotune/general/gen019.svg'
        title='Price'
        fontIcon='bi-layers'
      /> */}
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Crafted</span>
        </div>
      </div>
      <AsideMenuItemWithSub
        to='/crafted/pages'
        title='Pages'
        fontIcon='bi-archive'
        icon='/media/icons/duotune/general/gen022.svg'
      >
        <AsideMenuItemWithSub to='/crafted/pages/profile' title='Profile' hasBullet={true}>
          <AsideMenuItem to='/crafted/pages/profile/overview' title='Overview' hasBullet={true} />
          <AsideMenuItem to='/crafted/pages/profile/projects' title='Projects' hasBullet={true} />
          <AsideMenuItem to='/crafted/pages/profile/campaigns' title='Campaigns' hasBullet={true} />
          <AsideMenuItem to='/crafted/pages/profile/documents' title='Documents' hasBullet={true} />
          <AsideMenuItem
            to='/crafted/pages/profile/connections'
            title='Connections'
            hasBullet={true}
          />
        </AsideMenuItemWithSub>

        <AsideMenuItemWithSub to='/crafted/pages/wizards' title='Wizards' hasBullet={true}>
          <AsideMenuItem
            to='/crafted/pages/wizards/horizontal'
            title='Horizontal'
            hasBullet={true}
          />
          <AsideMenuItem to='/crafted/pages/wizards/vertical' title='Vertical' hasBullet={true} />
        </AsideMenuItemWithSub>
      </AsideMenuItemWithSub>
      <AsideMenuItemWithSub
        to='/crafted/accounts'
        title='Accounts'
        icon='/media/icons/duotune/communication/com006.svg'
        fontIcon='bi-person'
      >
        <AsideMenuItem to='/crafted/account/overview' title='Overview' hasBullet={true} />
        <AsideMenuItem to='/crafted/account/settings' title='Settings' hasBullet={true} />
      </AsideMenuItemWithSub>
      <AsideMenuItemWithSub
        to='/error'
        title='Errors'
        fontIcon='bi-sticky'
        icon='/media/icons/duotune/general/gen040.svg'
      >
        <AsideMenuItem to='/error/404' title='Error 404' hasBullet={true} />
        <AsideMenuItem to='/error/500' title='Error 500' hasBullet={true} />
      </AsideMenuItemWithSub>
      <AsideMenuItemWithSub
        to='/crafted/widgets'
        title='Widgets'
        icon='/media/icons/duotune/general/gen025.svg'
        fontIcon='bi-layers'
      >
        <AsideMenuItem to='/crafted/widgets/lists' title='Lists' hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/statistics' title='Statistics' hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/charts' title='Charts' hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/mixed' title='Mixed' hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/tables' title='Tables' hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/feeds' title='Feeds' hasBullet={true} />
      </AsideMenuItemWithSub>
      {/* <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Apps</span>
        </div>
      </div> */}
      {/* <AsideMenuItemWithSub
        to='/apps/chat'
        title='Chat'
        fontIcon='bi-chat-left'
        icon='/media/icons/duotune/communication/com012.svg'
      >
        <AsideMenuItem to='/apps/chat/private-chat' title='Private Chat' hasBullet={true} />
        <AsideMenuItem to='/apps/chat/group-chat' title='Group Chart' hasBullet={true} />
        <AsideMenuItem to='/apps/chat/drawer-chat' title='Drawer Chart' hasBullet={true} />
      </AsideMenuItemWithSub>
      <div className='menu-item'>
        <div className='menu-content'>
          <div className='separator mx-1 my-4'></div>
        </div>
      </div>
      <div className='menu-item'>
        <a
          target='_blank'
          className='menu-link'
          href={process.env.REACT_APP_PREVIEW_DOCS_URL + '/docs/changelog'}
        >
          <span className='menu-icon'>
            <KTSVG path='/media/icons/duotune/general/gen005.svg' className='svg-icon-2' />
          </span>
          <span className='menu-title'>Changelog {process.env.REACT_APP_VERSION}</span>
        </a>
      </div> */}
    </>
  )
}
