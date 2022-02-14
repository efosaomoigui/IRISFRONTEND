import React from 'react'
import { ListsWidget3, ListsWidget4, ListsWidget5, ListsWidget6, MixedWidget10, MixedWidget11, MixedWidget2, MixedWidget8, TablesWidget10, TablesWidget5 } from '../../../../../../_iris/partials/widgets'

const RoleUserManagement = () => {
  return (
    <>
    {/* begin::Row */}
    <div className='row gy-5 gx-xl-8'>
      <div className='col-xxl-4'>
        <ListsWidget3 className='card-xxl-stretch mb-xl-3' />
      </div>
      <div className='col-xl-8'>
        <TablesWidget10 className='card-xxl-stretch mb-5 mb-xl-8' />
      </div>
    </div>
    {/* end::Row */}
  </>
  )
}

export default RoleUserManagement