import React, {FC} from 'react'
import {KTSVG} from '../../../../../_iris/helpers'
import {Link} from 'react-router-dom'

interface Props {
  values?: any
}

const Step4: FC<Props> = ({values}: Props) => {
  return (
    <div className='w-100'>
      <div className='pb-1 pb-lg-4'>
        <h2 className='fw-bolder text-dark'>Shipment Summary!</h2>

        <div className='text-gray-400 fw-bold fs-6'>
          Please check the following items for correctness to continue
        </div>
      </div>

      <div className='mb-0'>
        <div className='notice d-flex bg-light-warning rounded border-warning border border-dashed p-2 m-1'>
          <div className='' style={{width: '100%'}}>
            <div className='fw-bold'>
              <div className='fs-6 text-gray-700'>
                <div className='row g-5 g-xxl-12'>
                  <div className='col-xl-12'>
                    <div className='card mb-5 mb-xl-12' id='kt_profile_details_view'>
                      <div className='card-header cursor-pointer'>
                        <div className='card-title m-0'>
                          <h3 className='fw-bolder m-0'>Grand Total</h3>
                        </div>
                        <div className='card-title m-0'>
                          <h3 className='fw-bolder m-0'>NGN 0.00</h3>
                        </div>
                      </div>

                      <div className='card-body p-12'>
                        <div className='row mb-12'>
                          <label className='col-lg-4 fw-bold text-muted'>Shipment Category</label>

                          <div className='col-lg-8'>
                            <span className='fw-bolder fs-6 text-dark'>
                              {values.shipmentCategory}
                            </span>
                          </div>
                        </div>

                        <div className='row mb-12'>
                          <label className='col-lg-4 fw-bold text-muted'>Route</label>

                          <div className='col-lg-8 fv-row'>
                            <span className='fw-bold fs-6'>{values.route.toUpperCase()}</span>
                          </div>
                        </div>

                        <div className='row mb-12'>
                          <label className='col-lg-4 fw-bold text-muted'>shipperFullName</label>

                          <div className='col-lg-8 fv-row'>
                            <span className='fw-bold fs-6'>{values.shipperFullName}</span>
                          </div>
                        </div>

                        <div className='row mb-12'>
                          <label className='col-lg-4 fw-bold text-muted'>
                            shipperAddress
                            <i
                              className='fas fa-exclamation-circle ms-1 fs-7'
                              data-bs-toggle='tooltip'
                              title='Phone number must be active'
                            ></i>
                          </label>

                          <div className='col-lg-8 d-flex align-items-center'>
                            <span className='fw-bolder fs-6 me-2'>{values.shipperAddress}</span>
                          </div>
                        </div>

                        <div className='row mb-12'>
                          <label className='col-lg-4 fw-bold text-muted'>
                            shipperPhoneNumbery Site
                          </label>

                          <div className='col-lg-8'>{values.shipperPhoneNumber}</div>
                        </div>

                        <div className='row mb-12'>
                          <label className='col-lg-4 fw-bold text-muted'>
                            receiverFullName
                            <i
                              className='fas fa-exclamation-circle ms-1 fs-7'
                              data-bs-toggle='tooltip'
                              title='Country of origination'
                            ></i>
                          </label>

                          <div className='col-lg-8'>
                            <span className='fw-bolder fs-6 text-dark'>
                              {values.receiverFullName}
                            </span>
                          </div>
                        </div>

                        <div className='row mb-10'>
                          <label className='col-lg-4 fw-bold text-muted'>receiverAddress</label>

                          <div className='col-lg-8'>
                            <span className='fw-bolder fs-6 text-dark'>
                              {values.receiverAddress}
                            </span>
                          </div>
                        </div>

                        <div className='row mb-10'>
                          <label className='col-lg-4 fw-bold text-muted'>receiverPhoneNumber</label>

                          <div className='col-lg-8'>
                            <span className='fw-bold fs-6'>{values.receiverPhoneNumber}</span>
                          </div>
                        </div>
                        <div className='row mb-12'>
                          <div className='col-lg-12'>
                            <ul className='list-group'>
                              <li className='list-group-item active' aria-current='true'>
                                Shipment Items
                              </li>
                              <li className='list-group-item'>A second item</li>
                              <li className='list-group-item'>A third item</li>
                              <li className='list-group-item'>A fourth item</li>
                              <li className='list-group-item'>And a fifth one</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <hr className="bg-success border-1 border-top border-danger"></hr>
                      <div className='card-header cursor-pointer'>
                        <div className='card-title m-0'>
                          <h3 className='fw-bolder m-0'>Grand Total</h3>
                        </div>
                        <div className='card-title m-0'>
                          <h3 className='fw-bolder m-0'>NGN 0.00</h3>
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

export {Step4}
