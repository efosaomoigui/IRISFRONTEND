import React from 'react'
import { FeedsWidget6, TablesWidget2 } from '../../../../../_iris/partials/widgets'

export function ViewFleets() {
  return (
    <div className='row g-5 g-xxl-8'>
      <div className='col-xl-6'>
        <TablesWidget2 className='mb-5 mb-xxl-8' />
        <FeedsWidget6 className='mb-5 mb-xxl-8' />
      </div>
    </div>
  )
}
