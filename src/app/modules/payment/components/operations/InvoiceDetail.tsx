import {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import agent from '../../../../../setup/axios/AxiosAgent'
import { IInvoiceModel } from '../../PaymentModels/PaymentmentInterfaces'


export function InvoiceDetail() {
  let {InvoiceId} = useParams<{InvoiceId: string}>()
  const [invoicedetails, setInvoiceDetails] = useState<IInvoiceModel>()

  function getInvoice(invoiceid: string) {
    agent.Invoice.details(InvoiceId).then((response) => {
        setInvoiceDetails(response)
    })
  }

  useEffect(() => {
    getInvoice(InvoiceId)
  }, [InvoiceId])

  return (
    <div className='row g-5 g-xxl-8'>
      <div className='col-xl-12'>
        <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
          <div className='card-header cursor-pointer'>
            <div className='card-title m-0'>
              <h3 className='fw-bolder m-0'>Invoice Details</h3>
            </div>

            <Link to='/adminSettings/settings' className='btn btn-primary align-self-center'>
              Edit Invoice
            </Link>
          </div>

          <div className='card-body p-9'>

            {invoicedetails && <>
              <div className='col-xl-12'>
                  <div className='card mb-5 mb-xl-12' id='kt_profile_details_view'>
                    
                    <div className='card-body p-12'>
                      <div className='row mb-12'>
                        <label className='col-lg-4 fw-bold text-muted'>WayBill #</label>

                        <div className='col-lg-8'>
                          <span className='fw-bolder fs-6 text-dark'>{invoicedetails.Waybill}</span>
                        </div>
                      </div>

                      <div className='row mb-12'>
                        <label className='col-lg-4 fw-bold text-muted'>Invoice #</label>

                        <div className='col-lg-8'>
                          <span className='fw-bolder fs-6 text-dark'>{invoicedetails.InvoiceCode}</span>
                        </div>
                      </div>

                      <div className='row mb-12'>
                        <label className='col-lg-4 fw-bold text-muted'>shipperFullName</label>

                        <div className='col-lg-8 fv-row'>
                          <span className='fw-bold fs-6'>{invoicedetails.customerName}</span>
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
                          {/* <span className='fw-bolder fs-6 me-2'>{invoicedetails.c}</span> */}
                        </div>
                      </div>

                      <div className='row mb-12'>
                        <label className='col-lg-4 fw-bold text-muted'>shipper Phone Number</label>

                        {/* <div className='col-lg-8'>0{invoicedetails.customerPhoneNumber}</div> */}
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
                            {/* {invoicedetails.recieverName} */}
                          </span>
                        </div>
                      </div>

                      <div className='row mb-10'>
                        <label className='col-lg-4 fw-bold text-muted'>Receiver Address</label>

                        <div className='col-lg-8'>
                          {/* <span className='fw-bolder fs-6 text-dark'>{invoicedetails.recieverAddress}</span> */}
                        </div>
                      </div>

                      <div className='row mb-10'>
                        <label className='col-lg-4 fw-bold text-muted'>Receiver Phone Number</label>

                        <div className='col-lg-8'>
                          {/* <span className='fw-bold fs-6'>0{invoicedetails.recieverPhoneNumber}</span> */}
                        </div>
                      </div>

                    </div>
                    <hr className='bg-success border-1 border-top border-danger'></hr>
                    <div className='card-header cursor-pointer'>
                        <div className='card-title m-0'>
                          <h3 className='fw-bolder m-0'>Grand Total</h3>
                        </div>
                        <div className='card-title m-0'>
                          {/* <h3 className='fw-bolder m-0'>NGN {invoicedetails.grandTotal}</h3> */}
                        </div>
                      </div>
                  </div>
                </div>
            </>}

            {!invoicedetails && <><h4>Sorry, Invoice Log does not exit!</h4></>}

          </div>
        </div>
      </div>
    </div>
  )
}
