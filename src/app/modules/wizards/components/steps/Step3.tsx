import React, {ChangeEvent, FC, useEffect, useState} from 'react'
import {Field, ErrorMessage} from 'formik'
import {Label} from 'semantic-ui-react'

interface Props {
  radioState?: string
}

const Step3: FC<Props> = ({radioState}: Props) => {
  const [hideAndShowMailAndParcel, setHideAndShowMailAndParcel] = useState("")
  const [hideTruck, setHideTruck] = useState(false)

  return (
    <div className='w-100'>
      <div className='pb-10 pb-lg-15'>
        <h2 className='fw-bolder text-dark'>Package/Shipment Items</h2>
      </div>

      <div className='mb-10 fv-row'>
        <div className='container'>
          <div className='row'>
            <div className='col-12'>
            {radioState ==='TruckLoad' && (
              <div className='row mb-2' data-kt-buttons='true'>
                <div className='col'>
                  <div className='mb-0 fv-row'>
                    <label className='d-flex align-items-center form-label mb-5'>
                      <h3>Truck Shipment</h3>
                      <i
                        className='fas fa-exclamation-circle ms-2 fs-7'
                        data-bs-toggle='tooltip'
                        title='Monthly billing will be based on your account plan'
                      ></i>
                    </label>

                    <div className='mb-0'>
                      <div className='row mb-2' data-kt-buttons='true'>
                        <label className='form-label'>Weight (Tons)</label>
                        <div className='col'>
                          <Field
                            type='radio'
                            className='btn-check'
                            name='ton10'
                            value='10'
                            id='kt_tons_select_1'
                          />
                          <label
                            className='btn btn-outline btn-outline-dashed btn-outline-default w-100 p-4'
                            htmlFor='kt_tons_select_1'
                          >
                            <span className='fw-bolder fs-3'>10 Tons</span>
                          </label>
                        </div>

                        <div className='col'>
                          <Field
                            type='radio'
                            className='btn-check'
                            name='ton15'
                            value='15'
                            id='kt_tons_select_2'
                          />
                          <label
                            className='btn btn-outline btn-outline-dashed btn-outline-default w-100 p-4'
                            htmlFor='kt_tons_select_2'
                          >
                            <span className='fw-bolder fs-3'>20 Tons</span>
                          </label>
                        </div>

                        <div className='col mb-10'>
                          <Field
                            type='radio'
                            className='btn-check'
                            name='ton15'
                            value='15'
                            id='kt_tons_select_3'
                          />
                          <label
                            className='btn btn-outline btn-outline-dashed btn-outline-default w-100 p-4'
                            htmlFor='kt_tons_select_3'
                          >
                            <span className='fw-bolder fs-3'>30 Tons</span>
                          </label>
                        </div>
                      </div>

                      <div className='fv-row mb-10'>
                        <label className='form-label'>Shipment Description</label>

                        <Field
                          name='t_shipmentDescription'
                          className='form-control form-control-lg form-control-solid'
                          rows={3}
                        ></Field>

                        <div className='text-danger mt-2'>
                          <ErrorMessage name='t_shipmentDescription' />
                        </div>
                      </div>

                      <div className='fv-row mb-10'>
                        <label className='form-label'>Product Type</label>

                        <Field
                          as='textarea'
                          name='shipmentType'
                          className='form-control form-control-lg form-control-solid'
                          rows={3}
                        ></Field>

                        <div className='text-danger mt-2'>
                          <ErrorMessage name='shipmentType' />
                        </div>
                      </div>

                      <div className='input-group mb-12'>
                        <span className='input-group-text'>
                          <strong>₦</strong>
                        </span>
                        <span className='input-group-text'>
                          <strong>0.00</strong>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
               )}
            </div>

            <div className='col-12'>
              {radioState ==='mailandparcel' && (
                <div className='row mb-2' data-kt-buttons='true'>
                  <div className='col'>
                    <div className='mb-0 fv-row'>
                      <label className='d-flex align-items-center form-label mb-5'>
                        <h3>Mail & Parcel/Freight</h3>
                        <i
                          className='fas fa-exclamation-circle ms-2 fs-7'
                          data-bs-toggle='tooltip'
                          title='Monthly billing will be based on your account plan'
                        ></i>
                      </label>

                      <div className='mb-10'>
                        <div className='row mb-2' data-kt-buttons='true'>
                          <label className='form-label'>Weight (Kg)</label>
                          <div className='col'>
                            <Field
                              name='weight'
                              className='form-control form-control-lg form-control-solid'
                              rows={3}
                            ></Field>

                            <div className='text-danger mt-2'>
                              <ErrorMessage name='weight' />
                            </div>
                          </div>
                        </div>

                        <div className='row mt-5' data-kt-buttons='true'>
                          <label className='form-label'>
                            Volume (cm<sup>3</sup>)
                          </label>
                          <div className='col'>
                            <Label>
                              {' '}
                              Length
                              <Field
                                name='length'
                                className='form-control form-control-lg form-control-solid'
                                rows={3}
                              ></Field>
                            </Label>

                            <div className='text-danger mt-2'>
                              <ErrorMessage name='length' />
                            </div>
                          </div>

                          <div className='col'>
                            <Label>
                              {' '}
                              breadth
                              <Field
                                name='breadth'
                                className='form-control form-control-lg form-control-solid'
                                rows={3}
                              ></Field>
                            </Label>

                            <div className='text-danger mt-2'>
                              <ErrorMessage name='breadth' />
                            </div>
                          </div>

                          <div className='col mb-10'>
                            <Label>
                              {' '}
                              Height
                              <Field
                                name='height'
                                className='form-control form-control-lg form-control-solid'
                                rows={3}
                              ></Field>
                            </Label>

                            <div className='text-danger mt-2'>
                              <ErrorMessage name='height' />
                            </div>
                          </div>
                        </div>

                        <div className='fv-row mb-10'>
                          <label className='form-label'>Shipment Description</label>
                          <Field
                            as='textarea'
                            name='m_shipmentDescription'
                            className='form-control form-control-lg form-control-solid'
                            rows={3}
                          ></Field>

                          <div className='text-danger mt-2'>
                            <ErrorMessage name='m_shipmentDescription' />
                          </div>
                        </div>

                        <div className='row mb-10'>
                          <div className='col mb-6'>
                            <label className='form-label'>Volume Weight</label>
                            <div className='input-group mb-12'>
                              <span className='input-group-text'>
                                <strong>Kg</strong>
                              </span>
                              <span className='input-group-text'>
                                <strong>0.00</strong>
                              </span>
                            </div>
                          </div>
                          <div className='col mb-6'>
                            <label className='form-label'>Total</label>
                            <div className='input-group mb-12'>
                              <span className='input-group-text'>
                                <strong>₦</strong>
                              </span>
                              <span className='input-group-text'>
                                <strong>0.00</strong>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export {Step3}
