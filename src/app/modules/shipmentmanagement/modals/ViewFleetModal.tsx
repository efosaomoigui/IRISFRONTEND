/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC } from 'react'
import { KTSVG } from '../../../../_iris/helpers'
import { ViewFleetForm } from '../shipmentformwidget/ViewFleetForm'


const ViewFleetModal: FC = () => {
  // const users = [
  //   {
  //     avatar: '/media/avatars/150-1.jpg',
  //     name: 'Emma Smith',
  //     email: 'e.smith@kpmg.com.au',
  //     access: '1',
  //   },
  //   {
  //     state: 'danger',
  //     name: 'Melody Macy',
  //     email: 'melody@altbox.com',
  //     access: '1',
  //   },
  // ]

  return (
    <div className='modal fade' id='kt_modal_addfleetf' aria-hidden='true'>
      <div className='modal-dialog mw-650px'>
        <div className='modal-content'>
          <div className='modal-header pb-0 border-0 justify-content-end'>
            <div className='btn btn-sm btn-icon btn-active-color-primary' data-bs-dismiss='modal'>
              <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
            </div>
          </div>

          <div className='modal-body scroll-y mx-5 mx-xl-18 pt-0 pb-15'>
            <div className='text-center mb-13'>
              <h1 className='mb-3'>Add Fleet</h1>
            </div>

            {/* form starts from here */}
            <div className='separator d-flex flex-center mb-8'>
              <span className='text-uppercase bg-body fs-7 fw-bold text-muted px-3'></span>
            </div>

            {/* start form */}
            <ViewFleetForm />
            {/* end form */}
          </div>
        </div>
      </div>
    </div>
  )
}

export { ViewFleetModal }

