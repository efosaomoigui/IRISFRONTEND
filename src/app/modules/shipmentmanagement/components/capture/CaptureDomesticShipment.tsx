import React from 'react'
import { FeedsWidget6, TablesWidget2 } from '../../../../../_iris/partials/widgets'
import { HorizontalShipmentCapture } from './HorizontalShipmentCapture'

export function CaptureDomesticShipment() {
  return (
    <div className='row g-5 g-xxl-8'>
      <div className='col-xl-12'>
        <HorizontalShipmentCapture />
        {/* <FeedsWidget6 className='mb-5 mb-xxl-8' /> */}
      </div>
    </div>
  )
}
