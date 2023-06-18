import React, {ChangeEvent, FC, useEffect, useState} from 'react'
import {KTSVG} from '../../../../../_iris/helpers'
import {Link} from 'react-router-dom'
import {numberFormat} from '../../../walletmanagement/Models/WalletInterfaces'
import {useFormikContext} from 'formik'
import {Divider} from '@material-ui/core'
import {IRouteModel} from '../../../shipmentmanagement/ShipmentModels/ShipmentInterfaces'

interface Props {
  values?: any
  handleChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

const SummaryStep: FC<Props> = () => {
  const formikProps = useFormikContext()
  const values = formikProps.values as any
  const [loadingData, setLoadingData] = useState(true)

  const [total, setTotal] = useState(0)
  const [grandTotal, setGrandTotal] = useState(0)

  let intitVal = 0
  let totalVal = values.itemsB.reduce(
    (accumVariable: number, curValue: any) => accumVariable + curValue.linetotal,
    intitVal
  )

  const volume = (l: number, b: number, h: number) => {
    return l * b * h
  }

  const volumetricWeight = (volume: number) => {
    return Number((volume / 6000).toFixed(4))
  }

  const chargeableWeight = (volumetricWeight: number, w: number) => {
    return volumetricWeight > w ? volumetricWeight : w
  }

  // //USE EFFECT HOOK
  useEffect(() => {
    const handleGrandTotal = () => {
      var total = 0

      if (values.shipmentCategory === 'mailandparcel' || values.shipmentCategory === 'freight') {
        for (var i = 0; i < values.itemsB.length; i++) {
          let nValue = parseInt(values.itemsB[i].LineTotal)
          if (!isNaN(nValue)) {
            total += nValue
          }
        }
      } else if (values.shipmentCategory === 'TruckLoad') {
        for (var i = 0; i < values.itemsA.length; i++) {
          let nValue = parseInt(values.itemsA[i].LineTotal)
          if (!isNaN(nValue)) {
            total += nValue
          }
        }
      }
      //   values.grandTotal = total
      formikProps.setFieldValue('grandTotal', total)
      setLoadingData(false)
      //   showPaymentSummary(true)
    }

    if (loadingData) {
      handleGrandTotal()
    }
  }, [])

  const getRoute = () => {
    if (values != null) {
      let obj = values.routeVals.find((o: IRouteModel) => o.routeId === values.route)
      return obj
    }
    return null
  }

  // console.log('arrays : ', getRoute())

  return (
    <div className='w-100'>
      <div className='mb-0'>
        <div className='d-flex  rounded  border border-dashed p-2 m-1'>
          <div className='' style={{width: '100%'}}>
            <div className='fw-bold'>
              <div className='fs-6 text-gray-700'>
                <div className='row g-5 g-xxl-12'>
                  <div className='col-xl-12'>
                    <div className='card mb-5 mb-xl-12' id='kt_profile_details_view'>
                      <div className='card-header cursor-pointer'>
                        <div className='card-title m-0'>
                          <h3 className='fw-bolder m-0'>Shipment Summary</h3>
                        </div>
                        <div className='card-title m-0'>
                          {/* <h3 className='fw-bolder m-0'>NGN {values.grandTotal}</h3> */}
                        </div>
                      </div>

                      <div className='card-body p-12'>
                        <div className='row mb-12'>
                          <label className='col-lg-4 fw-bold text-muted'>WayBill #</label>

                          <div className='col-lg-8'>
                            <span className='fw-bolder fs-6 text-dark'>{values.waybillNumber}</span>
                          </div>
                        </div>

                        <div className='row mb-12'>
                          <label className='col-lg-4 fw-bold text-muted'>Invoice #</label>

                          <div className='col-lg-8'>
                            <span className='fw-bolder fs-6 text-dark'>{values.invoiceNumber}</span>
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
                          <label className='col-lg-4 fw-bold text-muted'>
                            Shippers Phone Number
                          </label>

                          <div className='col-lg-8'>{'+' + values.shipperPhoneNumber}</div>
                        </div>

                        <div className='row mb-12'>
                          <label className='col-lg-4 fw-bold text-muted'>
                            Receiver FullName
                            {/* <i className='fas fa-exclamation-circle ms-1 fs-7' data-bs-toggle='tooltip' title='Country of origination'></i> */}
                          </label>

                          <div className='col-lg-8'>
                            <span className='fw-bolder fs-6 text-dark'>
                              {values.receiverFullName}
                            </span>
                          </div>
                        </div>

                        <div className='row mb-10'>
                          <label className='col-lg-4 fw-bold text-muted'>Destination Address</label>

                          <div className='col-lg-8'>
                            <span className='fw-bolder fs-6 text-dark'>
                              {values.receiverAddress}
                            </span>
                          </div>
                        </div>

                        <div className='row mb-10'>
                          <label className='col-lg-4 fw-bold text-muted'>
                            Receiver Phone Number
                          </label>

                          <div className='col-lg-8'>
                            <span className='fw-bold fs-6'>{'+' + values.receiverPhoneNumber}</span>
                          </div>
                        </div>
                        <div className='row mb-3'>
                          <div className='col-lg-12'>
                            {values.shipmentCategory === 'TruckLoad' && (
                              <div className='card' style={{width: '99%'}}>
                                <div className='container   table-responsive'>
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
                                        <th scope='col'>Product</th>
                                        <th scope='col'>Quantity</th>
                                        <th scope='col'>Total</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {values.itemsA.map((item: any, index: number) => (
                                        <tr key={index}>
                                          <th scope='row'>{index + 1}</th>
                                          <td>{values.ton}tons</td>
                                          <td>{item.t_shipmentDescription}</td>
                                          <td>{item.t_shipmentType}</td>
                                          <td>{item.t_quantity}</td>
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

                            {(values.shipmentCategory === 'mailandparcel' ||
                              values.shipmentCategory === 'freight') && (
                              <div className='card' style={{width: '99%'}}>
                                <div className='container   table-responsive'>
                                  <div className='mb-3'>
                                    <h3>Shipment Items</h3>
                                  </div>
                                  <hr className='bg-success border-1 border-top border-danger'></hr>
                                  <table className='table'>
                                    <thead>
                                      <tr>
                                        <th scope='col'>#</th>
                                        <th scope='col'>Gross Weight</th>
                                        <th scope='col'>Volume</th>
                                        <th scope='col'>Volumetric Weight</th>
                                        <th scope='col'>Chargeable Weight</th>
                                        <th scope='col'>Description</th>
                                        <th scope='col'>Total</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {values.itemsB.map((item: any, index: number) => (
                                        <tr key={index}>
                                          <th scope='row'>{index + 1}</th>
                                          <td>{item.weight}kg</td>
                                          <td>
                                            {volume(
                                              Number(item.length),
                                              Number(item.breadth),
                                              Number(item.breadth)
                                            )}
                                            cm
                                          </td>
                                          <td>
                                            {volumetricWeight(
                                              volume(
                                                Number(item.length),
                                                Number(item.breadth),
                                                Number(item.breadth)
                                              )
                                            )}
                                            kgcm<sup>3</sup>
                                          </td>
                                          <td>
                                            {chargeableWeight(
                                              volumetricWeight(
                                                volume(
                                                  Number(item.length),
                                                  Number(item.breadth),
                                                  Number(item.breadth)
                                                )
                                              ),
                                              item.weight
                                            )}
                                            kg
                                          </td>
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

export {SummaryStep}
