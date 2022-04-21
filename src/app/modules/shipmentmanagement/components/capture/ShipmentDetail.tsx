import {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import agent from '../../../../../setup/axios/AxiosAgent'
import { numberFormat } from '../../../walletmanagement/Models/WalletInterfaces'
import {IShipmentModel} from '../../ShipmentModels/ShipmentInterfaces'

export function ShipmentDetail() {
  let {waybill} = useParams<{waybill: string}>()
  const [shipmentdetails, setShipmentDetails] = useState<IShipmentModel>()

  function getShipment(shipmentId: string) {
    agent.Shipment.details(waybill).then((response) => {
      setShipmentDetails(response)
    })
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

          <div className='card-body p-9'>
            {shipmentdetails && (
              <>
                <div className='col-xl-12'>
                  <div className='card mb-5 mb-xl-12' id='kt_profile_details_view'>
                    
                    <div className='card-body p-12'>
                      <div className='row mb-12'>
                        <label className='col-lg-4 fw-bold text-muted'>WayBill #</label>

                        <div className='col-lg-8'>
                          <span className='fw-bolder fs-6 text-dark'>{shipmentdetails.waybill}</span>
                        </div>
                      </div>

                      <div className='row mb-12'>
                        <label className='col-lg-4 fw-bold text-muted'>Invoice #</label>

                        <div className='col-lg-8'>
                          <span className='fw-bolder fs-6 text-dark'>{shipmentdetails.invoice}</span>
                        </div>
                      </div>

                      <div className='row mb-12'>
                        <label className='col-lg-4 fw-bold text-muted'>Shipment Category</label>

                        <div className='col-lg-8'>
                          <span className='fw-bolder fs-6 text-dark'>
                            {shipmentdetails.shipmentCategory}
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
                          <span className='fw-bolder fs-6 me-2'>{shipmentdetails.customerAddress}</span>
                        </div>
                      </div>

                      <div className='row mb-12'>
                        <label className='col-lg-4 fw-bold text-muted'>shipper Phone Number</label>

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
                          <span className='fw-bolder fs-6 text-dark'>{shipmentdetails.recieverAddress}</span>
                        </div>
                      </div>

                      <div className='row mb-10'>
                        <label className='col-lg-4 fw-bold text-muted'>Receiver Phone Number</label>

                        <div className='col-lg-8'>
                          <span className='fw-bold fs-6'>0{shipmentdetails.recieverPhoneNumber}</span>
                        </div>
                      </div>
                      <div className='row mb-12'>
                        <div className='col-lg-12'>
                          {shipmentdetails.shipmentCategory === 'TruckLoad' && (
                            <div className='card' style={{width: '99%'}}>
                              <div className='container'>
                                <div className='mb-3'>
                                  <h3>Shipment Items</h3>
                                </div>
                                <hr className='bg-success border-1 border-top border-danger'></hr>
                                {shipmentdetails!.shipmentItems!.map((item: any, index: number) => {
                                  return (
                                    <div key={index}>
                                      <div className='row m-2'>
                                        <div className='col'>
                                          <strong>Weight</strong>
                                        </div>
                                        <div className='col'>{item.ton}tons</div>
                                      </div>
                                      <div className='row m-2'>
                                        <div className='col'>
                                          <strong>Description</strong>
                                        </div>
                                        <div className='col'>{item.t_shipmentDescription}</div>
                                      </div>
                                      <div className='row m-2'>
                                        <div className='col'>
                                          <strong>Total</strong>
                                        </div>
                                        <div className='col mb-5'>
                                          <h3 className='fw-bolder m-0'>NGN{item.LineTotal}</h3>
                                        </div>
                                      </div>
                                    </div>
                                  )
                                })}
                              </div>
                            </div>
                          )}

                          {shipmentdetails.shipmentCategory === 'MailAndParcel' && (
                            <div className='card' style={{width: '99%'}}>
                              <div className='container'>
                                <div className='mb-3'>
                                  <h3>Shipment Items</h3>
                                </div>
                                <hr className='bg-success border-1 border-top border-danger'></hr>
                                {shipmentdetails!.shipmentItems!.map((item: any, index: number) => {
                                  return (
                                    <div key={index}>
                                      <div className='row'>
                                        <div className='col'>
                                          <strong>Weight</strong>
                                        </div>
                                        <div className='col'>{item.weight}kg</div>
                                      </div>
                                      <div className='row'>
                                        <div className='col'>
                                          <strong>Length</strong>
                                        </div>
                                        <div className='col'>{item.length}cm</div>
                                      </div>
                                      <div className='row'>
                                        <div className='col'>
                                          <strong>Breadth</strong>
                                        </div>
                                        <div className='col'>{item.breadth}cm</div>
                                      </div>
                                      <div className='row'>
                                        <div className='col'>
                                          <strong>Height</strong>
                                        </div>
                                        <div className='col'>{item.height}cm</div>
                                      </div>
                                      <div className='row'>
                                        <div className='col'>
                                          <strong>Description</strong>
                                        </div>
                                        <div className='col mb-5'>{item.m_shipmentDescription}</div>
                                      </div>
                                      <div className='row'>
                                        <div className='col mt-3'>
                                          <strong>Total</strong>
                                        </div>
                                        <div className='col mb-5'>
                                          <h3 className='fw-bolder m-0'>
                                            {numberFormat(Number(item.lineTotal))}
                                          </h3>
                                        </div>
                                      </div>
                                    </div>
                                  )
                                })}
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
                          <h3 className='fw-bolder m-0'>NGN {shipmentdetails.grandTotal}</h3>
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
        </div>
      </div>
    </div>
  )
}
