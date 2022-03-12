import React, {FC} from 'react'
import {KTSVG} from '../../../../../_iris/helpers'
import {Field, ErrorMessage} from 'formik'

const Step2: FC = () => {
  return (
    <div className='w-100'>
      <div className='pb-2 pb-lg-6'>
        <h2 className='fw-bolder text-dark'>Route</h2>
      </div>

      <div className='mb-15 fv-row'>
        <div className='container'>
          <div className='row'>
            <div className='col-6'>
              <Field as='select' name='departure' className='form-select'>
                <option value='red'>Red</option>
                <option value='green'>Green</option>
                <option value='blue'>Blue</option>
              </Field>
            </div>

            <div className='col-6'>
              <Field as='select' name='destination' className='form-select'>
                <option value='red'>Red</option>
                <option value='green'>Green</option>
                <option value='blue'>Blue</option>
              </Field>
            </div>
          </div>
        </div>
      </div>

      <div className='pb-10 pb-lg-15'>
        <h2 className='fw-bolder text-dark'>Shippers Information</h2>
      </div>

      <div className='mb-10 fv-row'>
        <div className='container'>
          <div className='row'>
            <div className='col-6'>
              <div className='row mb-2' data-kt-buttons='true'>
                <div className='col'>
                  <div className='mb-0 fv-row'>
                    <label className='d-flex align-items-center form-label mb-5'>
                      <h3>Shipper</h3>
                      <i
                        className='fas fa-exclamation-circle ms-2 fs-7'
                        data-bs-toggle='tooltip'
                        title='Monthly billing will be based on your account plan'
                      ></i>
                    </label>

                    <div className='mb-0'>
                      <div className='fv-row mb-10'>
                        <label className='form-label'>Full Name</label>

                        <Field
                          name='shipperFullName'
                          className='form-control form-control-lg form-control-solid'
                          rows={3}
                        ></Field>

                        <div className='text-danger mt-2'>
                          <ErrorMessage name='shipperFullName' />
                        </div>
                      </div>

                      <div className='fv-row mb-10'>
                        <label className='form-label'>Address</label>

                        <Field
                          as='textarea'
                          name='shipperAddress'
                          className='form-control form-control-lg form-control-solid'
                          rows={3}
                        ></Field>

                        <div className='text-danger mt-2'>
                          <ErrorMessage name='shipperAddress' />
                        </div>
                      </div>

                      <div className='fv-row mb-10'>
                        <label className='form-label'>Contact Phone</label>

                        <Field
                          name='shipperPhoneNumber'
                          className='form-control form-control-lg form-control-solid'
                          rows={3}
                        ></Field>

                        <div className='text-danger mt-2'>
                          <ErrorMessage name='shipperPhoneNumber' />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='col-6'>
              <div className='row mb-2' data-kt-buttons='true'>
                <div className='col'>
                  <div className='mb-0 fv-row'>
                    <label className='d-flex align-items-center form-label mb-5'>
                      <h3>Receiver</h3>
                      <i
                        className='fas fa-exclamation-circle ms-2 fs-7'
                        data-bs-toggle='tooltip'
                        title='Monthly billing will be based on your account plan'
                      ></i>
                    </label>

                    <div className='mb-0'>
                      <div className='fv-row mb-10'>
                        <label className='form-label'>Full Name</label>

                        <Field
                          name='receiverFullName'
                          className='form-control form-control-lg form-control-solid'
                          rows={3}
                        ></Field>

                        <div className='text-danger mt-2'>
                          <ErrorMessage name='receiverFullName' />
                        </div>
                      </div>

                      <div className='fv-row mb-10'>
                        <label className='form-label'>Address</label>

                        <Field
                          as='textarea'
                          name='receiverAddress'
                          className='form-control form-control-lg form-control-solid'
                          rows={3}
                        ></Field>

                        <div className='text-danger mt-2'>
                          <ErrorMessage name='receiverAddress' />
                        </div>
                      </div>

                      <div className='fv-row mb-10'>
                        <label className='form-label'>Contact Phone</label>

                        <Field
                          name='receiverPhoneNumber'
                          className='form-control form-control-lg form-control-solid'
                          rows={3}
                        ></Field>
                        <div className='text-danger mt-2'>
                          <ErrorMessage name='receiverPhoneNumber' />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export {Step2}
