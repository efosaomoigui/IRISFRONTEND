import React, {ChangeEvent, FC, useEffect, useState} from 'react'
import {KTSVG} from '../../../../../_iris/helpers'
import {Link, Redirect} from 'react-router-dom'
import {numberFormat} from '../../../walletmanagement/Models/WalletInterfaces'
import {ErrorMessage, Field, useFormikContext} from 'formik'
import {Divider} from '@material-ui/core'
import paid from './paid.png'
import unpaid from './unpaid.png'
import {IRouteModel} from '../../../shipmentmanagement/ShipmentModels/ShipmentInterfaces'

interface Props {
  values?: any
  handleChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

const FinalStep: FC<Props> = () => {
  const formikProps = useFormikContext()
  const values = formikProps.values as any
  const [loadingData, setLoadingData] = useState(true)
  const [paidstatus, setPaidStatus] = useState(false)

  const [total, setTotal] = useState(0)
  const [grandTotal, setGrandTotal] = useState(0)

  let intitVal = 0
  let totalVal = values.itemsB.reduce((accumVariable: number, curValue: any) => accumVariable + curValue.linetotal, intitVal)

  const handleClick = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    formikProps.setFieldValue('PaymentMethod', newValue)
    // alert(newValue)
  }

  const getRoute = () => {
    if (values != null) {
      let obj = values.routeVals.find((o: IRouteModel) => o.routeId === values.route)
      return obj
    }
    return null
  }

  var Barcode = require('react-barcode')

  return (
    <div className='w-100'>
      <div className='mb-0'>
        <div className='d-flex  rounded  border border-dashed p-2 m-1'>
          <div className='' style={{width: '100%'}}>
            <div className='fw-bold'>
              <div className='fs-6 text-gray-800'>
                <div className='row g-5 g-xxl-12'>
                  <div className='col-xl-12'>
                    <div className='card mb-5 mb-xl-12' id='kt_profile_details_view'>
                      <div className='card-header cursor-pointer'>
                        <div className='card-title m-0'>
                          <h3 className='fw-bolder mb-5'>Payment Methods</h3>
                        </div>
                        <div className='card-title m-0'>
                          <div className='row'>
                            <div className='col-lg-4'>
                              <Field type='radio' className='btn-check' name='paymentMethod' value='wallet' id='kt_create_payment_wallet' onClick={handleClick} />
                              <label className='btn btn-outline btn-outline-dashed btn-outline-default p-7 d-flex align-items-center mb-10' htmlFor='kt_create_payment_wallet'>
                                <KTSVG path='/media/icons/duotune/communication/com005.svg' className='svg-icon-3x me-5' />

                                <span className='d-block fw-bold text-start'>
                                  <span className='text-dark fw-bolder d-block fs-4 mb-2'>Wallet</span>
                                  <span className='text-gray-400 fw-bold fs-6'>Wallet</span>
                                </span>
                              </label>
                            </div>

                            <div className='col-lg-4'>
                              <Field type='radio' className='btn-check' name='paymentMethod' value='creditdebitcard' id='kt_create_payment_creditdebit' onClick={handleClick} />
                              <label className='btn btn-outline btn-outline-dashed btn-outline-default p-7 d-flex align-items-center' htmlFor='kt_create_payment_creditdebit'>
                                <KTSVG path='/media/icons/duotune/finance/fin006.svg' className='svg-icon-3x me-5' />

                                <span className='d-block fw-bold text-start'>
                                  <span className='text-dark fw-bolder d-block fs-6 mb-2'>Debit Card</span>
                                  <span className='text-gray-400 fw-bold fs-6'>Credit/Debit</span>
                                </span>
                              </label>
                            </div>

                            <div className='col-lg-4'>
                              <Field type='radio' className='btn-check' name='paymentMethod' value='postpaid' id='kt_create_payment_postpaid' onClick={handleClick} />
                              <label className='btn btn-outline btn-outline-dashed btn-outline-default p-7 d-flex align-items-center' htmlFor='kt_create_payment_postpaid'>
                                <KTSVG path='/media/icons/duotune/finance/fin006.svg' className='svg-icon-3x me-5' />

                                <span className='d-block fw-bold text-start'>
                                  <span className='text-dark fw-bolder d-block fs-4 mb-2'>Post Paid</span>
                                  <span className='text-gray-400 fw-bold fs-6'>Post Paid</span>
                                </span>
                              </label>
                            </div>

                            <div className='text-danger mt-2'>
                              <ErrorMessage name='shipmentCategory' />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className='card-body p-12'>
                        <div className='row mb-12'>
                          <label className='col-lg-4 fw-bold text-muted'>Payment Method</label>

                          <div className='col-lg-8'>
                            <span className='fw-bolder fs-6 text-dark'>
                              {/* {values.paymentMethod.toUpperCase()} */}
                              {values.paymentMethod === 'wallet' && 'WALLET'}
                              {values.paymentMethod === 'postpaid' && 'POST PAID'}
                              {values.paymentMethod === 'CREDITDEBITCARD' && 'PAYMENT CARD'}
                            </span>
                          </div>
                        </div>
                        <div className='row mb-12'>
                          <label className='col-lg-4 fw-bold text-muted'>WayBill #</label>

                          <div className='col-lg-8'>
                            {/* <span className='fw-bolder fs-6 text-dark'>{values.waybillNumber}</span> */}
                            {values.waybillNumber && <Barcode width={2} height={40} margin={0} value={values.waybillNumber} />}
                          </div>
                        </div>

                        <div className='row mb-12'>
                          <label className='col-lg-4 fw-bold text-muted'>Invoice #</label>

                          <div className='col-lg-8'>
                            {/* <span className='fw-bolder fs-6 text-dark'>{values.invoiceNumber}</span> */}
                            {values.waybillNumber && <Barcode width={2} height={40} margin={0} value={values.invoiceNumber} />}
                          </div>
                        </div>

                        <div className='row mb-12'>
                          <label className='col-lg-4 fw-bold text-muted'>Shipment Category</label>

                          <div className='col-lg-8'>
                            <span className='fw-bolder fs-6 text-dark'>
                              {values.shipmentCategory === 'mailandparcel' && 'Mail And Parcel'}
                              {values.shipmentCategory === 'freight' && 'International Freight'}
                              {values.shipmentCategory === 'TruckLoad' && 'Truck Load'}
                            </span>
                          </div>
                        </div>

                        <div className='row mb-12'>
                          <label className='col-lg-4 fw-bold text-muted'>Departure</label>

                          <div className='col-lg-8 fv-row'>
                            <span className='fw-bold fs-6'>
                              {/* {values.route.toUpperCase()} */}
                              {getRoute().departure}
                            </span>
                          </div>
                        </div>

                        <div className='row mb-12'>
                          <label className='col-lg-4 fw-bold text-muted'>Destination</label>

                          <div className='col-lg-8 fv-row'>
                            <span className='fw-bold fs-6'>
                              {/* {values.route.toUpperCase()} */}
                              {getRoute().destination}
                            </span>
                          </div>
                        </div>

                        <div className='row mb-12'>
                          <label className='col-lg-4 fw-bold text-muted'>Shipper Full Name</label>

                          <div className='col-lg-8 fv-row'>
                            <span className='fw-bold fs-6'>{values.shipperFullName}</span>
                          </div>
                        </div>

                        <div className='row mb-12'>
                          <label className='col-lg-4 fw-bold text-muted'>Departure Address</label>

                          <div className='col-lg-8 d-flex align-items-center'>
                            <span className='fw-bolder fs-6 me-2'>{values.shipperAddress}</span>
                          </div>
                        </div>

                        <div className='row mb-12'>
                          <label className='col-lg-4 fw-bold text-muted'>Shipper Phone Number</label>

                          <div className='col-lg-8'>{'+' + values.shipperPhoneNumber}</div>
                        </div>
                        <div className='row mb-12'>
                          <label className='col-lg-4 fw-bold text-muted'>Payment Status</label>

                          <div className='col-lg-8'>
                            {paidstatus && <img src={paid} width={80} alt='Logo' />}
                            {!paidstatus && <img src={unpaid} alt='Logo' width={80} />}
                          </div>
                        </div>

                        <div className='row mb-12'>
                          <label className='col-lg-4 fw-bold text-muted'>Receiver FullName</label>

                          <div className='col-lg-8'>
                            <span className='fw-bolder fs-6 text-dark'>{values.receiverFullName}</span>
                          </div>
                        </div>

                        <div className='row mb-10'>
                          <label className='col-lg-4 fw-bold text-muted'>Destination Address</label>

                          <div className='col-lg-8'>
                            <span className='fw-bolder fs-6 text-dark'>{values.receiverAddress}</span>
                          </div>
                        </div>

                        <div className='row mb-10'>
                          <label className='col-lg-4 fw-bold text-muted'>Receiver Phone Number</label>

                          <div className='col-lg-8'>
                            <span className='fw-bold fs-6'>{'+' + values.receiverPhoneNumber}</span>
                          </div>
                        </div>
                        <div className='row mb-3'>
                          <div className='col-lg-12'>
                            {values.shipmentCategory === 'TruckLoad' && (
                              <div className='card  table-responsive' style={{width: '99%'}}>
                                <div className='container'>
                                  <div className='mb-3'>
                                    <h3>Shipment Items</h3>
                                  </div>
                                  <hr className='bg-success border-1 border-top border-danger'></hr>
                                  <table className='table'>
                                    <thead>
                                      <tr>
                                        <th scope='col'>#</th>
                                        <th scope='col'>Truck Capacity</th>
                                        <th scope='col'>Description</th>
                                        <th scope='col'>Total</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {values.itemsA.map((item: any, index: number) => (
                                        <tr key={index}>
                                          <th scope='row'>{index + 1}</th>
                                          <td>{item.ton}tons</td>
                                          <td>{item.t_shipmentDescription}</td>
                                          <td>{numberFormat(Number(item.LineTotal))}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                    {/* <tfoot>
                                      <td>22{numberFormat(Number(values.grandTotal))}</td>
                                    </tfoot> */}
                                  </table>
                                </div>
                              </div>
                            )}

                            {(values.shipmentCategory === 'mailandparcel' || values.shipmentCategory === 'freight') && (
                              <div className='card  table-responsive' style={{width: '99%'}}>
                                <div className='container'>
                                  <div className='mb-3'>
                                    <h3>Shipment Items</h3>
                                  </div>
                                  <hr className='bg-success border-1 border-top border-danger'></hr>
                                  <table className='table'>
                                    <thead>
                                      <tr>
                                        <th scope='col'>#</th>
                                        <th scope='col'>Weight</th>
                                        <th scope='col'>Length</th>
                                        <th scope='col'>Breadth</th>
                                        <th scope='col'>Height</th>
                                        <th scope='col'>Description</th>
                                        <th scope='col'>Total</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {values.itemsB.map((item: any, index: number) => (
                                        <tr key={index}>
                                          <th scope='row'>{index + 1}</th>
                                          <td>{item.weight}kg</td>
                                          <td>{item.length}cm</td>
                                          <td>{item.breadth}cm</td>
                                          <td>{item.height}cm</td>
                                          <td>{item.m_shipmentDescription}</td>
                                          <td>{numberFormat(Number(item.LineTotal))}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                    {/* <tfoot>
                                      <td colSpan={7} className='text-end'>
                                        <Divider />
                                        <strong>
                                          Grand Total: {numberFormat(Number(values.grandTotal))}
                                        </strong>
                                      </td>
                                    </tfoot> */}
                                  </table>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <hr className='bg-success border-1 border-top border-danger'></hr>
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

export {FinalStep}
