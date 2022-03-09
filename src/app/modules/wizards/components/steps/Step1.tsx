/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC} from 'react'
import {KTSVG} from '../../../../../_iris/helpers'
import {Field, ErrorMessage} from 'formik'

const Step1: FC = () => {
  return (
    <div className='w-100'>
      <div className='pb-10 pb-lg-15'>
        <h2 className='fw-bolder d-flex align-items-center text-dark'>
          Choose Shipment Category
          <i
            className='fas fa-exclamation-circle ms-2 fs-7'
            data-bs-toggle='tooltip'
            title='Billing is issued based on your selected account type'
          ></i>
        </h2>

        <div className='text-gray-400 fw-bold fs-6 m-3'>
          {/* If you need more info, please check out
          <a href='/dashboard' className='link-primary fw-bolder'>
            {' '}
            Help Page
          </a> */}
        </div>
      </div>

      <div className='fv-row'>
        <div className='row'>
          <div className='col-lg-4'>
            <Field
              type='radio'
              className='btn-check'
              name='shipmentCategory'
              value='mailandparcel'
              id='kt_create_account_form_account_type_mail'
            />
            <label
              className='btn btn-outline btn-outline-dashed btn-outline-default p-7 d-flex align-items-center mb-10'
              htmlFor='kt_create_account_form_account_type_mail'
            >
              <KTSVG
                path='/media/icons/duotune/communication/com005.svg'
                className='svg-icon-3x me-5'
              />

              <span className='d-block fw-bold text-start'>
                <span className='text-dark fw-bolder d-block fs-4 mb-2'>Mail & Parcel</span>
                <span className='text-gray-400 fw-bold fs-6'>
                  Create Shipment for Mail and Parcel
                </span>
              </span>
            </label>
          </div>

          <div className='col-lg-4'>
            <Field
              type='radio'
              className='btn-check'
              name='shipmentCategory'
              value='Truck Load'
              id='kt_create_account_form_account_type_truck'
            />
            <label
              className='btn btn-outline btn-outline-dashed btn-outline-default p-7 d-flex align-items-center'
              htmlFor='kt_create_account_form_account_type_truck'
            >
              <KTSVG path='/media/icons/duotune/finance/fin006.svg' className='svg-icon-3x me-5' />

              <span className='d-block fw-bold text-start'>
                <span className='text-dark fw-bolder d-block fs-4 mb-2'>Truck Load</span>
                <span className='text-gray-400 fw-bold fs-6'>
                  Create shipment for 15, 30 tons truck load
                </span>
              </span>
            </label>
          </div>

          <div className='col-lg-4'>
            <Field
              type='radio'
              className='btn-check'
              name='shipmentCategory'
              value='freight'
              id='kt_create_account_form_account_type_freight'
            />
            <label
              className='btn btn-outline btn-outline-dashed btn-outline-default p-7 d-flex align-items-center'
              htmlFor='kt_create_account_form_account_type_freight'
            >
              <KTSVG path='/media/icons/duotune/finance/fin006.svg' className='svg-icon-3x me-5' />

              <span className='d-block fw-bold text-start'>
                <span className='text-dark fw-bolder d-block fs-4 mb-2'>Freight</span>
                <span className='text-gray-400 fw-bold fs-6'>
                  Create corporate account to mane users
                </span>
              </span>
            </label>
          </div> 

          <div className='text-danger mt-2'>
            <ErrorMessage name='shipmentCategory' />
          </div>
        </div>
      </div>
    </div>
  )
}

export {Step1}
