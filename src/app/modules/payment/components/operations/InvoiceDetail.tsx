import {Button} from '@material-ui/core'
import {ErrorMessage, Field, Form, Formik, FormikValues} from 'formik'
import {useEffect, useState, useRef} from 'react'
import {useReactToPrint} from 'react-to-print'
import {Spinner} from 'react-bootstrap-v5'
import {Link, Redirect, useHistory, useLocation, useParams} from 'react-router-dom'
import {toast} from 'react-toastify'
import {number} from 'yup'
import agent from '../../../../../setup/axios/AxiosAgent'
import {KTSVG} from '../../../../../_iris/helpers'
import {IShipmentModel} from '../../../shipmentmanagement/ShipmentModels/ShipmentInterfaces'
import {numberFormat} from '../../../walletmanagement/Models/WalletInterfaces'
import {IPaymentCriteriaModel, IUpdatePaymentModel} from '../../PaymentModels/PaymentmentInterfaces'
import paid from './paid.png'
import unpaid from './unpaid.png'
import InvoicePrint from './InvoicePrint'
// import './print.css'

export function InvoiceDetail() {
  const [loadingData, setLoadingData] = useState(true)
  let {invoice} = useParams<{invoice: string}>()
  const [shipmentdetails, setShipmentDetails] = useState<IShipmentModel>()
  const [paymentSummary, showPaymentSummary] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [showError, setShowError] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(true)
  const [paidstatus, setPaidStatus] = useState(false)
  const [registerstatus, setRegisterStatus] = useState(false)
  const [paidstatus2, setPaidStatus2] = useState(false)

  const history = useHistory()

  var Barcode = require('react-barcode')

  const componentRef = useRef<HTMLDivElement>(null)
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    copyStyles: true,
  })

  //USE EFFECT HOOK
  useEffect(() => {
    const callFunc = async () => {
      agent.Invoice.detailsByInvoiceCode(invoice).then((response) => {
        setShipmentDetails(response)
        setLoadingData(false)
        console.log('SHI ', shipmentdetails)
      })
    }
    if (loadingData) {
      callFunc()
    }
  }, [])

  const volume = (l: number, b: number, h: number) => {
    return l * b * h
  }

  const volumetricWeight = (volume: number) => {
    return Number((volume / 6000).toFixed(4))
  }

  const chargeableWeight = (volumetricWeight: number, w: number) => {
    return volumetricWeight > w ? volumetricWeight : w
  }

  const paymentCriteria: IUpdatePaymentModel = {
    amount: 0,
    invoiceNumber: '',
    waybillNumber: '',
    shipmentCategory: 1,
    paymentStatus: false,
    paymentMethod: 1,
  }

  const handlePayment = (values: FormikValues | any) => {
    setIsSubmitting(true)

    values.amount = shipmentdetails?.grandTotal
    values.invoiceNumber = shipmentdetails?.invoice
    values.shipmentCategory = shipmentdetails?.shipmentCategory
    values.waybillNumber = shipmentdetails?.waybill

    if (values.amount > 0) {
      if (values.paymentMethod === 'wallet') {
        values.paymentMethod = 1
      } else if (values.paymentMethod === 'creditdebitcard') {
        values.paymentMethod = 2
      } else if (values.paymentMethod === 'postpaid') {
        values.paymentMethod = 2
      }

      if (values.shipmentCategory === 'MailAndParcel') {
        values.shipmentCategory = 1
      } else if (values.shipmentCategory === 'TruckLoad') {
        values.shipmentCategory = 2
      } else if (values.shipmentCategory === 'InternationalFreight') {
        values.shipmentCategory = 3
      }

      // console.log("Payment Log", paymentCriteria )
      agent.PaymentLog.updatePayment(values).then((response) => {
        if (response.validationErrors!.length > 0) {
          toast.error(response.validationErrors?.toString())
          setErrorMessage(response.validationErrors!.toString())
          setIsSubmitting(false)
          setShowError(true)
        } else {
          setPaidStatus(response.paymentStatus)
          if (response.paymentStatus) {
            if (paymentCriteria.paymentMethod === 1) {
              setSuccessMessage('Payment Transaction Was Successful!')
              toast.success('Payment Transaction Was Successful!')
            }
            if (paymentCriteria.paymentMethod === 2) {
              setSuccessMessage('Registered For Later Payment Successful!')
              toast.success('Registered For Later Payment Successful!')
            }
            if (paymentCriteria.paymentMethod === 3) {
              setSuccessMessage('Registered For Later Payment Successful!')
              toast.success('Registered For Later Payment Successful!')
            }
            setPaidStatus(true)
            // return <Redirect to='/payment/invoice' />
            history.push('/payment/invoice')
          } else {
            toast.error(
              'Payment processing failed, Please try again or use another payment method!'
            )
            setErrorMessage(
              'Payment processing failed, Please try again or use another payment method!'
            )
            // console.log('Error: ', errorMessage)
          }

          setInterval(() => {
            setShowForm(false)
          }, 1000)

          setIsSubmitting(false)
          setShowError(false)
        }
      })
    } else {
      toast.error('Grand Total Must Be Greater Than Zero (0)')
    }
  }

  return (
    <div className='row g-5 g-xxl-8'>
      <div className='col-xl-12'>
        <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
          <div className='card-header cursor-pointer'>
            <div className='card-title m-0'>
              <h3 className='fw-bolder m-0'>Invoice Details</h3>
              <button
                onClick={handlePrint}
                style={{marginLeft: '13px', width: '100p%', height: '30px'}}
              >
                Print!
              </button>
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
            <div className='card-body ' ref={componentRef!}>
              {shipmentdetails && (
                <>
                  <div className='col-xl-12'>
                    <div className='card mb-5 mb-xl-12' id='kt_profile_details_view'>
                      <div className='card-body p-2'>
                        {shipmentdetails.paidStatus != 'Paid' && (
                          <h4 className='fw-bolder mb-3'>Please Select a Payment Option</h4>
                        )}
                        <Formik
                          initialValues={paymentCriteria}
                          enableReinitialize
                          onSubmit={handlePayment}
                        >
                          {({values, setFieldValue}) => (
                            <Form>
                              {shipmentdetails.paidStatus != 'Paid' && (
                                <div className='row'>
                                  <div className='col-lg-3'>
                                    <input type='hidden' name='paymentMethod' />
                                    <Field
                                      type='radio'
                                      className='btn-check'
                                      name='paymentMethod'
                                      value='wallet'
                                      id='kt_create_payment_wallet'
                                      onClick={() => {
                                        setFieldValue('paymentMethod', 'wallet')
                                        setFieldValue('waybillNumber', shipmentdetails.waybill)
                                        setFieldValue('invoiceNumber', shipmentdetails.invoice)
                                        setFieldValue('amount', shipmentdetails.grandTotal)
                                        setFieldValue(
                                          'shipmentCategory',
                                          shipmentdetails.shipmentCategory
                                        )
                                      }}
                                    />
                                    <label
                                      className='btn btn-outline btn-outline-dashed btn-outline-default p-7 d-flex align-items-center mb-10'
                                      htmlFor='kt_create_payment_wallet'
                                    >
                                      <KTSVG
                                        path='/media/icons/duotune/communication/com005.svg'
                                        className='svg-icon-3x me-5'
                                      />

                                      <span className='d-block fw-bold text-start'>
                                        <span className='text-dark fw-bolder d-block fs-4 mb-2'>
                                          Wallet
                                        </span>
                                        <span className='text-gray-400 fw-bold fs-6'>Wallet</span>
                                      </span>
                                    </label>
                                  </div>
                                  <div className='col-lg-3'>
                                    <Field
                                      type='radio'
                                      className='btn-check'
                                      name='paymentMethod'
                                      value='creditdebitcard'
                                      id='kt_create_payment_creditdebit'
                                      onClick={() => {
                                        setFieldValue('paymentMethod', 'creditdebitcard')
                                        setFieldValue('waybillNumber', shipmentdetails.waybill)
                                        setFieldValue('invoiceNumber', shipmentdetails.invoice)
                                        setFieldValue('amount', shipmentdetails.grandTotal)
                                        setFieldValue(
                                          'shipmentCategory',
                                          shipmentdetails.shipmentCategory
                                        )
                                      }}
                                    />
                                    <label
                                      className='btn btn-outline btn-outline-dashed btn-outline-default p-7 d-flex align-items-center'
                                      htmlFor='kt_create_payment_creditdebit'
                                    >
                                      <KTSVG
                                        path='/media/icons/duotune/finance/fin006.svg'
                                        className='svg-icon-3x me-5'
                                      />

                                      <span className='d-block fw-bold text-start'>
                                        <span className='text-dark fw-bolder d-block fs-6 mb-2'>
                                          Debit Card
                                        </span>
                                        <span className='text-gray-400 fw-bold fs-6'>
                                          Credit/Debit
                                        </span>
                                      </span>
                                    </label>
                                  </div>
                                  <div className='col-lg-3'>
                                    <Field
                                      type='radio'
                                      className='btn-check'
                                      name='paymentMethod'
                                      value='postpaid'
                                      id='kt_create_payment_postpaid'
                                      onClick={() => {
                                        setFieldValue('paymentMethod', 'postpaid')
                                        setFieldValue('waybillNumber', shipmentdetails.waybill)
                                        setFieldValue('invoiceNumber', shipmentdetails.invoice)
                                        setFieldValue('amount', shipmentdetails.grandTotal)
                                        setFieldValue(
                                          'shipmentCategory',
                                          shipmentdetails.shipmentCategory
                                        )
                                      }}
                                    />
                                    <label
                                      className='btn btn-outline btn-outline-dashed btn-outline-default p-7 d-flex align-items-center'
                                      htmlFor='kt_create_payment_postpaid'
                                    >
                                      <KTSVG
                                        path='/media/icons/duotune/finance/fin006.svg'
                                        className='svg-icon-3x me-5'
                                      />

                                      <span className='d-block fw-bold text-start'>
                                        <span className='text-dark fw-bolder d-block fs-4 mb-2'>
                                          Post Paid
                                        </span>
                                        <span className='text-gray-400 fw-bold fs-6'>
                                          Post Paid
                                        </span>
                                      </span>
                                    </label>
                                  </div>
                                  <div className='col-lg-3'>
                                    <Button
                                      type='submit'
                                      style={{width: '90%'}}
                                      color='primary'
                                      variant='contained'
                                    >
                                      Pay Now
                                    </Button>
                                  </div>
                                  <div className='text-danger mt-2'>
                                    <ErrorMessage name='shipmentCategory' />
                                  </div>
                                </div>
                              )}
                            </Form>
                          )}
                        </Formik>
                      </div>
                      <InvoicePrint shipmentdetails={shipmentdetails!} />

                      {/* <hr className='bg-success border-1 border-top border-danger'></hr> */}
                      {/* <div className='card-header cursor-pointer'>
                          <div className='card-title m-0'>
                            <h3 className='fw-bolder m-0'>Grand Total</h3>
                          </div>
                          <input type='hidden' value={shipmentdetails.grandTotal} name='amount' />
                          <input
                            type='hidden'
                            value={shipmentdetails.waybill}
                            name='shipmentCategory'
                          />
                          <div className='card-title m-0'>
                            <h3 className='fw-bolder m-0'>
                              {numberFormat(Number(shipmentdetails.grandTotal))}{' '}
                            </h3>
                          </div>
                        </div> */}
                    </div>
                  </div>
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
function useNavigate() {
  throw new Error('Function not implemented.')
}
