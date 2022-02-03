import React from 'react'
import { TablesWidget2 } from '../../../../../_iris/partials/widgets'
import { rolemodel } from '../../../usermanagement/Models/RoleModel'

export function DeliverShipment() {
  return (
    <div className='row g-5 g-xxl-8'>
      <div className='col-xl-6'>
        <TablesWidget2 roles={rolemodel}  className='mb-5 mb-xxl-8' />
      </div>
    </div>
  )
}
