import React from 'react';
import { useIntl } from 'react-intl';

import { MenuItem } from './MenuItem';

export function MenuInner() {
  const intl = useIntl()
  return (
    <>
      <MenuItem title={intl.formatMessage({id: 'MENU.DASHBOARD'})} to='/dashboard' />
      <MenuItem title='Capture Shipment' to='/dashboard' />
      <MenuItem title='Wallet Accounts' to='/dashboard' />
      <MenuItem title='Tracking' to='/dashboard' />
      {/* <MenuItem title='Tracking' to='/builder' /> */}
    </>
  )
}
