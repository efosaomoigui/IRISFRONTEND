import {useEffect, useState} from 'react'
import {Spinner} from 'react-bootstrap-v5'
import {Link, useParams} from 'react-router-dom'
import agent from '../../../../../setup/axios/AxiosAgent'
import {numberFormat} from '../../../walletmanagement/Models/WalletInterfaces'
import {IShipmentModel, product} from '../../ShipmentModels/ShipmentInterfaces'
import paid from './paid.png'
import unpaid from './unpaid.png'

export function ShipmentDetail() {
  const [loadingData, setLoadingData] = useState(true)
  let {waybill} = useParams<{waybill: string}>()
  const [shipmentdetails, setShipmentDetails] = useState<IShipmentModel>()

  function getShipment(shipmentId: string) {
    agent.Shipment.details(waybill).then((response) => {
      setShipmentDetails(response)
      setLoadingData(false)
    })
  }

  const volume = (l: number, b: number, h: number) => {
    return l * b * h
  }

  const volumetricWeight = (volume: number) => {
    return Number((volume / 6000).toFixed(4))
  }

  const chargeableWeight = (volumetricWeight: number, w: number) => {
    return volumetricWeight > w ? volumetricWeight : w
  }

  var Barcode = require('react-barcode')

  const productLabel = (value: number) => {
    let productLabel = product.find((item) => item.optionValue === value)
    return productLabel!.optionLabel
  }

  useEffect(() => {
    getShipment(waybill)
  }, [waybill])

  return (
    <div className='row g-5 g-xxl-8'>
      <div className='col-xl-12'>
        <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
          <div className='card-header cursor-pointer'>
            <div className='card-title m-0'>
              <h3 className='fw-bolder m-0'>Shipment Details</h3>
            </div>
            {/* 
            <Link to='/adminSettings/settings' className='btn btn-primary align-self-center'>
              Edit Shipment
            </Link> */}
          </div>
          {loadingData ? (
            <div>
              <Spinner animation='border' />
            </div>
          ) : (
            <div className='card-body p-9'>
              {shipmentdetails && (
                <>
                  <div className='col-xl-12'>
                    <div className='card mb-5 mb-xl-12' id='kt_profile_details_view'>
                      <div className='card-body p-12'>
                        <div className='row mb-12'>
                          <label className='col-lg-4 fw-bold text-muted'>WayBill #</label>

                          <div className='col-lg-8'>
                            <span className='fw-bolder fs-6 text-dark'>
                              {shipmentdetails.waybill && (
                                <Barcode
                                  width={2}
                                  height={40}
                                  margin={0}
                                  value={shipmentdetails.waybill}
                                />
                              )}
                            </span>
                          </div>
                        </div>

                        <div className='row mb-12'>
                          <label className='col-lg-4 fw-bold text-muted'>Invoice #</label>

                          <div className='col-lg-8'>
                            <span className='fw-bolder fs-6 text-dark'>
                              {shipmentdetails.waybill && (
                                <Barcode
                                  width={2}
                                  height={40}
                                  margin={0}
                                  value={shipmentdetails.invoice}
                                />
                              )}
                            </span>
                          </div>
                        </div>

                        <div className='row mb-12'>
                          <label className='col-lg-4 fw-bold text-muted'>Shipment Category</label>

                          <div className='col-lg-8'>
                            <span className='fw-bolder fs-6 text-dark'>
                              {/* {shipmentdetails.shipmentCategory} */}
                              {shipmentdetails.shipmentCategory === '1' && 'Mail And Parcel'}
                              {shipmentdetails.shipmentCategory === 'MailAndParcel' &&
                                'Mail And Parcel'}
                              {shipmentdetails.shipmentCategory === '0' && 'Mail And Parcel'}
                              {shipmentdetails.shipmentCategory === '0' && 'Mail And Parcel'}
                              {shipmentdetails.shipmentCategory === '3' && 'International Freight'}
                              {shipmentdetails.shipmentCategory === 'InternationalFreight' &&
                                'International Freight'}
                              {shipmentdetails.shipmentCategory === '2' && 'Truck Load'}
                              {shipmentdetails.shipmentCategory === 'TruckLoad' && 'Truck Load'}
                            </span>
                          </div>
                        </div>

                        <div className='row mb-12'>
                          <label className='col-lg-4 fw-bold text-muted'>Departure</label>

                          <div className='col-lg-8 fv-row'>
                            <span className='fw-bold fs-6'>{shipmentdetails.departure}</span>
                          </div>
                        </div>

                        <div className='row mb-12'>
                          <label className='col-lg-4 fw-bold text-muted'>Destination</label>

                          <div className='col-lg-8 fv-row'>
                            <span className='fw-bold fs-6'>{shipmentdetails.destination}</span>
                          </div>
                        </div>
                        <div className='row mb-12'>
                          <label className='col-lg-4 fw-bold text-muted'>Payment Status</label>
                          <div className='col-lg-8'>
                            {shipmentdetails.paidStatus === 'Paid' && (
                              <img src={paid} width={80} alt='Logo' />
                            )}
                            {shipmentdetails.paidStatus === 'Pending' && (
                              <img src={unpaid} alt='Logo' width={80} />
                            )}
                          </div>
                        </div>

                        <div className='row mb-12'>
                          <label className='col-lg-4 fw-bold text-muted'>shipperFullName</label>

                          <div className='col-lg-8 fv-row'>
                            <span className='fw-bold fs-6'>{shipmentdetails.customerName}</span>
                          </div>
                        </div>

                        <div className='row mb-12'>
                          <label className='col-lg-4 fw-bold text-muted'>
                            shipper Address
                            <i
                              className='fas fa-exclamation-circle ms-1 fs-7'
                              data-bs-toggle='tooltip'
                              title='Phone number must be active'
                            ></i>
                          </label>

                          <div className='col-lg-8 d-flex align-items-center'>
                            <span className='fw-bolder fs-6 me-2'>
                              {shipmentdetails.customerAddress}
                            </span>
                          </div>
                        </div>

                        <div className='row mb-12'>
                          <label className='col-lg-4 fw-bold text-muted'>
                            shipper Phone Number
                          </label>

                          <div className='col-lg-8'>0{shipmentdetails.customerPhoneNumber}</div>
                        </div>

                        <div className='row mb-12'>
                          <label className='col-lg-4 fw-bold text-muted'>
                            Receiver FullName
                            <i
                              className='fas fa-exclamation-circle ms-1 fs-7'
                              data-bs-toggle='tooltip'
                              title='Country of origination'
                            ></i>
                          </label>

                          <div className='col-lg-8'>
                            <span className='fw-bolder fs-6 text-dark'>
                              {shipmentdetails.recieverName}
                            </span>
                          </div>
                        </div>

                        <div className='row mb-10'>
                          <label className='col-lg-4 fw-bold text-muted'>Receiver Address</label>

                          <div className='col-lg-8'>
                            <span className='fw-bolder fs-6 text-dark'>
                              {shipmentdetails.recieverAddress}
                            </span>
                          </div>
                        </div>

                        <div className='row mb-10'>
                          <label className='col-lg-4 fw-bold text-muted'>
                            Receiver Phone Number
                          </label>

                          <div className='col-lg-8'>
                            <span className='fw-bold fs-6'>
                              0{shipmentdetails.recieverPhoneNumber}
                            </span>
                          </div>
                        </div>
                        <div className='row mb-12'>
                          <div className='col-lg-12'>
                            {shipmentdetails.shipmentCategory === 'TruckLoad' && (
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
                                      {shipmentdetails!.shipmentItems!.map(
                                        (item: any, index: number) => (
                                          <tr key={index}>
                                            <th scope='row'>{index + 1}</th>
                                            <td>{item.ton}tons</td>
                                            <td>{item.shipmentDescription}</td>
                                            <td>{productLabel(Number(item.shipmentProduct))}</td>
                                            <td>{item.quantity}</td>
                                            <td>{numberFormat(Number(item.lineTotal))}</td>
                                          </tr>
                                        )
                                      )}
                                    </tbody>
                                    {/* <tfoot>
                                      <td>22{numberFormat(Number(values.grandTotal))}</td>
                                    </tfoot> */}
                                  </table>
                                </div>
                              </div>
                            )}

                            {(shipmentdetails.shipmentCategory === 'MailAndParcel' ||
                              shipmentdetails.shipmentCategory === 'freight') && (
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
                                      {shipmentdetails!.shipmentItems!.map(
                                        (item: any, index: number) => (
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
                                            <td>{item.shipmentDescription}</td>
                                            <td>{numberFormat(Number(item.lineTotal))}</td>
                                          </tr>
                                        )
                                      )}
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
                      <div className='card-header cursor-pointer'>
                        <div className='card-title m-0'>
                          <h3 className='fw-bolder m-0'>Grand Total</h3>
                        </div>
                        <div className='card-title m-0'>
                          <h3 className='fw-bolder m-0'>
                            {numberFormat(Number(shipmentdetails.grandTotal))}{' '}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className='row mb-7'>
                  <label className='col-lg-4 fw-bold text-muted'>Shipment Name</label>

                  <div className='col-lg-8'>
                    <span className='fw-bolder fs-6 text-dark'>{shipmentdetails?.ShipmentId}</span>
                  </div>
                </div>
                <div className='row mb-7'>
                  <label className='col-lg-4 fw-bold text-muted'>Shipment Name</label>

                  <div className='col-lg-8'>
                    <span className='fw-bolder fs-6 text-dark'>{shipmentdetails?.ShipmentId}</span>
                  </div>
                </div>
                <div className='row mb-7'>
                  <label className='col-lg-4 fw-bold text-muted'>Waybill</label>

                  <div className='col-lg-8'>
                    <span className='fw-bolder fs-6 text-dark'>{shipmentdetails?.Waybill}</span>
                  </div>
                </div>
                <div className='row mb-7'>
                  <label className='col-lg-4 fw-bold text-muted'>Customer</label>

                  <div className='col-lg-8'>
                    <span className='fw-bolder fs-6 text-dark'>{shipmentdetails?.Customer}</span>
                  </div>
                </div>
                <div className='row mb-7'>
                  <label className='col-lg-4 fw-bold text-muted'>Address Id</label>

                  <div className='col-lg-8'>
                    <span className='fw-bolder fs-6 text-dark'>
                      {shipmentdetails?.CustomerAddress}
                    </span>
                  </div>
                </div>
                <div className='row mb-7'>
                  <label className='col-lg-4 fw-bold text-muted'>Reciever</label>

                  <div className='col-lg-8'>
                    <span className='fw-bolder fs-6 text-dark'>{shipmentdetails?.Reciever}</span>
                  </div>
                </div>
                <div className='row mb-7'>
                  <label className='col-lg-4 fw-bold text-muted'>Reciever Address</label>

                  <div className='col-lg-8'>
                    <span className='fw-bolder fs-6 text-dark'>
                      {shipmentdetails?.RecieverAddress}
                    </span>
                  </div>
                </div>
                <div className='row mb-7'>
                  <label className='col-lg-4 fw-bold text-muted'>Pick Up Options</label>

                  <div className='col-lg-8'>
                    <span className='fw-bolder fs-6 text-dark'>
                      {shipmentdetails?.PickupOptions}
                    </span>
                  </div>
                </div>
                <div className='row mb-7'>
                  <label className='col-lg-4 fw-bold text-muted'>Shipment Items</label>

                  <div className='col-lg-8'>
                    <span className='fw-bolder fs-6 text-dark'>
                      {shipmentdetails?.ShipmentItems}
                    </span>
                  </div>
                </div>

                <div className='row mb-10'>
                  <label className='col-lg-4 fw-bold text-muted'>Allow Changes</label>

                  <div className='col-lg-8'>
                    <span className='fw-bold fs-6'>Yes</span>
                  </div>
                </div> */}
                </>
              )}

              {!shipmentdetails && (
                <>
                  <h4>Sorry, Shipment does not exit!</h4>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
