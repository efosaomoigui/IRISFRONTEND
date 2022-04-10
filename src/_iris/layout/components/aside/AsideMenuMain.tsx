/* eslint-disable react/jsx-no-target-blank */
import {useIntl} from 'react-intl'
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
        icon='/media/icons/duotune/art/art002.svg'
        title='Admin Settings'
        fontIcon='bi-layers'
      >
        <AsideMenuItem to='/admin/Users' title='Users' hasBullet={true} />
        <AsideMenuItem to='/admin/roles' title='Roles' hasBullet={true} />
        {/* <AsideMenuItem to='/admin/permissions' title='Permissions' hasBullet={true} /> */}
        {/* <AsideMenuItem to='/adminSettings/userDetails' title='User Profile' hasBullet={true} /> */}
      </AsideMenuItemWithSub>

      {/* SETTINGS */}
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>
            Wallet Management
          </span>
        </div>
      </div>
      <AsideMenuItemWithSub
        to='/wallet'
        icon='/media/icons/duotune/general/gen019.svg'
        title='Wallets'
        fontIcon='bi-layers'
      >
        {/* <AsideMenuItem to='/wallet/Users' title='Wallets' hasBullet={true} /> */}
        <AsideMenuItem to='/wallet/transactions' title='Wallet Transactions' hasBullet={true} />
        {/* <AsideMenuItem to='/settings/Fleets' title='Fleets' hasBullet={true} />
        <AsideMenuItem to='/settings/Routes' title='Routes' hasBullet={true} />
        <AsideMenuItem to='/settings/Tripsanddispatch' title='Trips & Dispatch' hasBullet={true} />
        <AsideMenuItem to='/settings/Price' title='Price' hasBullet={true} /> */}
      </AsideMenuItemWithSub>

      {/* SHIPMENT modules */}
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>
            Shipment Management
          </span>
        </div>
      </div>
      <AsideMenuItemWithSub
        to='/shipment/Shipment'
        icon='/media/icons/duotune/general/gen019.svg'
        title='Shipments'
        fontIcon='bi-layers'
      >
        <AsideMenuItem to='/shipment/shipment' title='View Shipment' hasBullet={true} />
        <AsideMenuItemWithSub
          to='/shipment/CaptureShipment'
          icon='/media/icons/duotune/general/gen019.svg'
          title='Capture'
          fontIcon='bi-layers'
        >
          <AsideMenuItem to='/shipment/CaptureShipment' title='Capture Shipment' hasBullet={true} />
        </AsideMenuItemWithSub>
        <AsideMenuItemWithSub
          to='/shipment'
          icon='/media/icons/duotune/general/gen019.svg'
          title='Processing Center'
          fontIcon='bi-layers'
        >
          {/* <AsideMenuItem to='/shipment/SortShipment' title='Sort Shipment' hasBullet={true} /> */}
          <AsideMenuItem to='/shipment/Manifest' title='Manifest' hasBullet={true} />
          {/* <AsideMenuItem to='/shipment/Dispatch' title='Dispatch' hasBullet={true} /> */}
        </AsideMenuItemWithSub>

        <AsideMenuItemWithSub
          to='/shipment'
          icon='/media/icons/duotune/general/gen019.svg'
          title='Settings'
          fontIcon='bi-layers'
        >
          <AsideMenuItem to='/shipment/routes' title='Route' hasBullet={true} />
          <AsideMenuItem to='/shipment/viewfleet' title='Fleet' hasBullet={true} />
          <AsideMenuItem to='/shipment/ViewPriceSettings' title='Price Setting' hasBullet={true} />
        </AsideMenuItemWithSub>
      </AsideMenuItemWithSub>

      {/* SHIPMENT REQUEST */}
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>SHIPMENT REQUEST</span>
        </div>
      </div>
      <AsideMenuItemWithSub
        to='/shipmentrequest/'
        icon='/media/icons/duotune/general/gen025.svg'
        title='shipment request'
        fontIcon='bi-layers'
      >
        <AsideMenuItem to='/shipmentrequest/request' title='request' hasBullet={true} />
      </AsideMenuItemWithSub>

      {/* PAYMENT MODULE */}
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>PAYMENT</span>
        </div>
      </div>
      <AsideMenuItemWithSub
        to='/payment/'
        icon='/media/icons/duotune/communication/com006.svg'
        title='Payment'
        fontIcon='bi-layers'
      >
        {/* <AsideMenuItem to='/payment/wallet' title='Wallets' hasBullet={true} />
        <AsideMenuItem to='/payment/transaction' title='Transaction' hasBullet={true} /> */}
        <AsideMenuItem to='/payment/paymentlog' title='Payment Log' hasBullet={true} />
        <AsideMenuItem to='/payment/invoice' title='Invoice' hasBullet={true} />
      </AsideMenuItemWithSub>

      {/* <AsideMenuItemWithSub
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
      </AsideMenuItemWithSub> */}

      {/* MONITORING */}
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>MONITORING</span>
        </div>
      </div>
      <AsideMenuItemWithSub
        to='/monitor/trips'
        icon='/media/icons/duotune/general/gen025.svg'
        title='Monitoring'
        fontIcon='bi-layers'
      >
        <AsideMenuItem to='/monitor/trips' title='Trip' hasBullet={true} />
        {/* <AsideMenuItem to='/monitor/addtrack' title='Add Track' hasBullet={true} /> */}
        <AsideMenuItem to='/monitor/trackhistory' title='Track History' hasBullet={true} />
        {/* <AsideMenuItem to='/monitor/searchtrip' title='Search Trip' hasBullet={true} /> */}
      </AsideMenuItemWithSub>
      {/* <AsideMenuItemWithSub
        to='/reporting'
        icon='/media/icons/duotune/general/gen019.svg'
        title='Wallet'
        fontIcon='bi-layers'
      >
        <AsideMenuItem to='/reporting/WalletReporting' title='Wallet reporting' hasBullet={true} />
      </AsideMenuItemWithSub> */}
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
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>FULFILLMENT</span>
        </div>
      </div>
      <AsideMenuItemWithSub
        to='/fulfillment/collectioncenter'
        icon='/media/icons/duotune/general/gen022.svg'
        title='Fulfillment'
        fontIcon='bi-layers'
      >
        <AsideMenuItem
          to='/fulfillment/collectioncenter'
          title='Collection Center'
          hasBullet={true}
        />
      </AsideMenuItemWithSub>

      {/* <div className='menu-item'>
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
      </AsideMenuItemWithSub> */}
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
