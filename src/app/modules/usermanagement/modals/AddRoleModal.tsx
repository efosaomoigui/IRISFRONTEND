/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC} from 'react'
import {KTSVG, toAbsoluteUrl} from '../../../../_iris/helpers'
import { AddRoleForm } from '../userformwidget/AddRoleForm'

const AddRoleModal: FC = () => {
  const users = [
    {
      avatar: '/media/avatars/150-1.jpg',
      name: 'Emma Smith',
      email: 'e.smith@kpmg.com.au',
      access: '1',
    },
    {
      state: 'danger',
      name: 'Melody Macy',
      email: 'melody@altbox.com',
      access: '1',
    },
  ]

  return (
    <div className='modal fade' id='kt_modal_addrole' aria-hidden='true'>
      <div className='modal-dialog mw-650px'>
        <div className='modal-content'>
          <div className='modal-header pb-0 border-0 justify-content-end'>
            <div className='btn btn-sm btn-icon btn-active-color-primary' data-bs-dismiss='modal'>
              <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
            </div>
          </div>

          <div className='modal-body scroll-y mx-5 mx-xl-18 pt-0 pb-15'>
            <div className='text-center mb-13'>
              <h1 className='mb-3'>Add Role</h1>
            </div>

          {/* form starts from here */}
            <div className='separator d-flex flex-center mb-8'>
              <span className='text-uppercase bg-body fs-7 fw-bold text-muted px-3'></span>
            </div>

          {/* start form */}
          <AddRoleForm />
          {/* end form */}
          </div>
        </div>
      </div>
    </div>
  )
}

export { AddRoleModal}
