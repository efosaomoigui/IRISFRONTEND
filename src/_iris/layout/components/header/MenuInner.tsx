import React from 'react';
import { useIntl } from 'react-intl';

import { MenuItem } from './MenuItem';

export function MenuInner() {
  const intl = useIntl()
  return (
    <>
      <MenuItem title={intl.formatMessage({id: 'MENU.DASHBOARD'})} to='/dashboard' />
      <MenuItem title='Capture Shipment' to='/shipment/CaptureShipment' />
      <MenuItem title='Wallet' to='/wallet' />
      <MenuItem title='Tracking' to='/monitor/trackhistory' />
      {/* <MenuItem title='Tracking' to='/builder' /> */}
    </>
  )
}
