/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import React, {FC} from 'react'
import {shallowEqual, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {IUserModel} from '../../../../app/modules/auth/models/AuthInterfaces'
import {RootState} from '../../../../setup'
import {KTSVG} from '../../../helpers'
import {useLayout} from '../../core'
import {DefaultTitle} from '../header/page-title/DefaultTitle'

const Toolbar1: FC = () => {
  const {classes} = useLayout()
  const user: IUserModel = useSelector<RootState>(({auth}) => auth.user, shallowEqual) as IUserModel

  return (
    <div className='toolbar no-printme' id='kt_toolbar'>
      {/* begin::Container */}
      <div
        id='kt_toolbar_container'
        className={clsx(classes.toolbarContainer.join(' '), 'd-flex flex-stack')}
      >
        <DefaultTitle />

        {/* begin::Actions */}
        <div className='d-flex align-items-center py-1'>
          {/* begin::Wrapper */}
          <div className='me-4'>
            {/* begin::Menu */}
            {/* <a
              href='#'
              className='btn btn-sm btn-flex btn-light btn-active-primary fw-bolder'
              data-kt-menu-trigger='click'
              data-kt-menu-placement='bottom-end'
              data-kt-menu-flip='top-end'
            >
              <KTSVG
                path='/media/icons/duotune/general/gen031.svg'
                className='svg-icon-5 svg-icon-gray-500 me-1'
              />
              Filter
            </a> */}

            {/* end::Menu */}
          </div>
          {/* end::Wrapper */}

          {/* begin::Button */}

          <Link
            href='#'
            className='btn btn-sm btn-secondary mr-4 gap-2'
            style={{marginRight: '5px'}}
            id='kt_toolbar_primary_button'
            to={`/wallet/wtransactions`}
          >
            My Wallet
          </Link>
          <Link
            href='#'
            className='ml-2 btn btn-sm btn-primary'
            id='kt_toolbar_primary_button'
            to={'/shipment/CaptureShipment'}
          >
            Capture Shipment
          </Link>
          {/* end::Button */}
        </div>
        {/* end::Actions */}
      </div>
      {/* end::Container */}
    </div>
  )
}

export {Toolbar1}
