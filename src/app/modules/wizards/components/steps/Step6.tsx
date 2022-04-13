import React, {ChangeEvent, FC, useState} from 'react'
import {KTSVG} from '../../../../../_iris/helpers'
import {Link} from 'react-router-dom'
import {numberFormat} from '../../../walletmanagement/Models/WalletInterfaces'
import { useBarcode } from '@createnextapp/react-barcode';
import './print.css'

interface Props {
  waybill?: string 
  invoice?: string
  radioState?: string
  values?: any
  handleChange?: (event: ChangeEvent<HTMLInputElement>) => void
  grandTotal?: number
}

function BarcodeRender(value:string)  
{
  const { inputRef } = useBarcode(
  {
    value:"q",
    options: {
      background: '#ccffff',
    }
  });

  return <svg ref={inputRef} />;
};

export default BarcodeRender;

const Step6: FC<Props> = ({waybill, invoice, values, radioState}: Props) => {
  const [paymentSummary, showPaymentSummary] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [showError, setShowError] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(true)
  const [paidstatus, setPaidStatus] = useState(false)

  const printDocument = () =>{window.print()} 

  return (
    <div className='w-100'>
      <div className='pb-8 pb-lg-10'>
        <h2 className='fw-bolder text-dark'>Shipment Order Confirmation!</h2>
      </div>

      <div className='mb-0'>
        <div className='notice d-flex bg-light-success rounded border-success border border-dashed p-2 m-1'>

          <div className='row mb-12'>
            <div className='col-lg-12'>
              <div className='card mb-5 mb-xl-12' id='kt_profile_details_view'>
                <div className='card-header cursor-pointer'>
                  <div className='card-title m-0'>
                    <h3 className='fw-bolder m-0'>   Invoice #: {BarcodeRender(values.invoiceNumber)}  </h3>
                    
                  </div>
                  {/* <Barcode value={values.invoiceNumber} /> */}
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

                  {/* <div className='row mb-12'>
                    <label className='col-lg-4 fw-bold text-muted'>Invoice #</label>

                    <div className='col-lg-8'>
                      <span className='fw-bolder fs-6 text-dark'>{values.invoiceNumber}</span>
                    </div>
                  </div> */}

                  <div className='row mb-12'>
                    <label className='col-lg-4 fw-bold text-muted'>Shipment Category</label>

                    <div className='col-lg-8'>
                      {values.shipmentCategory === "mailandparcel" && <span className='fw-bolder fs-6 text-dark'>Mail & Parcel (Domestic Shipment)</span>}
                      {/* {values.shipmentCategory === "mailandparcel" && <span className='fw-bolder fs-6 text-dark'>Mail & Parcel (Domestic Shipment)</span>} */}
                      {values.shipmentCategory === "Truckload" && <span className='fw-bolder fs-6 text-dark'>Full Truck Load</span>}
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
                      shipper Address
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
                    <label className='col-lg-4 fw-bold text-muted'>shipper Phone Number</label>

                    <div className='col-lg-8'>0{values.shipperPhoneNumber}</div>
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
                      <span className='fw-bolder fs-6 text-dark'>{values.receiverFullName}</span>
                    </div>
                  </div>

                  <div className='row mb-10'>
                    <label className='col-lg-4 fw-bold text-muted'>Receiver Address</label>

                    <div className='col-lg-8'>
                      <span className='fw-bolder fs-6 text-dark'>{values.receiverAddress}</span>
                    </div>
                  </div>

                  <div className='row mb-10'>
                    <label className='col-lg-4 fw-bold text-muted'>Receiver Phone Number</label>

                    <div className='col-lg-8'>
                      <span className='fw-bold fs-6'>0{values.receiverPhoneNumber}</span>
                    </div>
                  </div>
                  <div className='row mb-12'>
                    <div className='col-lg-12'>
                      {values.shipmentCategory === 'TruckLoad' && (
                        <div className='card' style={{width: '99%'}}>
                          <div className='container'>
                            <div className='mb-3'>
                              <h3>Shipment Items</h3>
                            </div>
                            <hr className='bg-success border-1 border-top border-danger'></hr>
                            {values.itemsA.map((item: any, index: number) => {
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
                                      <h3 className='fw-bolder m-0'>{numberFormat(Number(item.LineTotal))}</h3>
                                    </div>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )}

                      {values.shipmentCategory === 'mailandparcel' && (
                        <div className='card' style={{width: '99%'}}>
                          <div className='container'>
                            <div className='mb-3'>
                              <h3>Shipment Items</h3>
                            </div>
                            <hr className='bg-success border-1 border-top border-danger'></hr>
                            {values.itemsB.map((item: any, index: number) => {
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
                                        {numberFormat(Number(item.LineTotal))}
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
                    <h3 className='fw-bolder m-0'>{numberFormat(Number(values.grandTotal))}</h3>
                  </div>
                </div>
              </div>
              <button onClick={printDocument}>Print</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export {Step6}
