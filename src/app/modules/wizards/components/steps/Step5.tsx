import React, {ChangeEvent, FC, useState} from 'react'
import {KTSVG, toAbsoluteUrl} from '../../../../../_iris/helpers'
import {Field, ErrorMessage} from 'formik'
import {IPaymentCriteriaModel} from '../../../payment/PaymentModels/PaymentmentInterfaces'
import agent from '../../../../../setup/axios/AxiosAgent'
import {toast} from 'react-toastify'
import {v4 as uuid} from 'uuid'
import paid from './paid.png'
import unpaid from './unpaid.png'
import {numberFormat} from '../../../walletmanagement/Models/WalletInterfaces'

interface Props {
  radioState?: string
  values?: any
  handleChange?: (event: ChangeEvent<HTMLInputElement>) => void
  grandTotal?: number
  handlePaymentStatus: (value: boolean) => void
  handlePaymentMethod: (value: number) => void
}

const Step5: FC<Props> = ({
  values,
  handleChange,
  radioState,
  handlePaymentStatus,
  handlePaymentMethod,
}: Props) => {
  const [paymentSummary, showPaymentSummary] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [showError, setShowError] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(true)
  const [paidstatus, setPaidStatus] = useState(false)
  const [paidstatus2, setPaidStatus2] = useState(false)

  const handleClick = () => {
    var total = 0

    if (radioState === 'mailandparcel' || radioState === 'freight') {
      for (var i = 0; i < values.itemsB.length; i++) {
        let nValue = parseInt(values.itemsB[i].LineTotal)
        if (!isNaN(nValue)) {
          total += nValue
        }
      }
    } else if (radioState === 'TruckLoad') {
      for (var i = 0; i < values.itemsA.length; i++) {
        let nValue = parseInt(values.itemsA[i].LineTotal)
        if (!isNaN(nValue)) {
          total += nValue
        }
      }
    }

    values.grandTotal = total
    showPaymentSummary(true)
  }

  const handleWalletPayment = () => {
    const walletCode = '00000'
    const invoiceCode = '00000'
    const userCode = uuid()

    setIsSubmitting(true)

    const paymentCriteria: IPaymentCriteriaModel = {
      amount: values.grandTotal,
      customerPhoneNumber: values.shipperPhoneNumber.toString(),
      userId: userCode,
      invoiceNumber: invoiceCode,
      walletNumber: walletCode,
      shimentCategory: 1,
      routeId: values.route,
      paymentStatus: false,
      paymentMethod: 1,
      description: 'Wallet Debit Transaction',
      values: values,
    }

    if (radioState === 'mailandparcel') {
      paymentCriteria.shimentCategory = 1
    } else if (radioState === 'TruckLoad') {
      paymentCriteria.shimentCategory = 2
    }

    // console.log("Payment Log", paymentCriteria )
    agent.PaymentLog.makePayment(paymentCriteria).then((response) => {
      if (response.validationErrors!.length > 0) {
        toast.error(response.validationErrors?.toString())
        setErrorMessage(response.validationErrors!.toString())
        setIsSubmitting(false)
        setShowError(true)
      } else {
        setPaidStatus(response.paymentStatus)
        values.paymentMade = response.paymentStatus
        if (response.paymentStatus) {
          toast.success('Shipment Creation Was Successful!')
          setSuccessMessage('Shipment Creation Was Successful!')
          handlePaymentStatus(true)
          handlePaymentMethod(1)
        } else {
          toast.error('Payment processing failed, Please try again or use another payment method!')
          setErrorMessage(
            'Payment processing failed, Please try again or use another payment method!'
          )
          console.log('Error: ', errorMessage)
        }

        if (response.paymentStatus) {
          setPaidStatus2(false)
        }
        setInterval(() => {
          setShowForm(false)
        }, 1000)

        setIsSubmitting(false)
        setShowError(false)
      }
    })
  }

  const handlePostPaidPayment = () => {
    const walletCode = '00000'
    const invoiceCode = '00000'
    const userCode = uuid()

    setIsSubmitting(true)

    const paymentCriteria: IPaymentCriteriaModel = {
      amount: values.grandTotal,
      customerPhoneNumber: values.shipperPhoneNumber.toString(),
      userId: userCode,
      invoiceNumber: invoiceCode,
      walletNumber: walletCode,
      shimentCategory: 1,
      routeId: values.route,
      paymentStatus: false,
      paymentMethod: 2,
      description: 'Pay Later Debit Transaction',
      values: values,
    }

    if (radioState === 'mailandparcel') {
      paymentCriteria.shimentCategory = 1
    } else if (radioState === 'TruckLoad') {
      paymentCriteria.shimentCategory = 2
    } else if (radioState === 'freight') {
      paymentCriteria.shimentCategory = 3
    }

    // console.log("Payment Log", paymentCriteria )
    agent.PaymentLog.makePayment(paymentCriteria).then((response) => {
      if (response.validationErrors!.length > 0) {
        toast.error(response.validationErrors?.toString())
        setPaidStatus2(response.paymentStatus)
        setErrorMessage(response.validationErrors!.toString())
        // console.log('ERR: ', errorMessage)
        setIsSubmitting(false)
        setShowError(true)
      } else {
        setPaidStatus2(response.paymentStatus)
        if (radioState === 'mailandparcel') {
          toast.success('Shipment payment set to pay Later!')
          alert(response.paymentStatus)
          setPaidStatus2(response.paymentStatus)
        }
        if (radioState === 'freight') {
          toast.success('Shipment payment set to pay Later!')
          setPaidStatus2(response.paymentStatus)
        }

        if (response.paymentStatus) {
          setPaidStatus(false)
        }

        setSuccessMessage('Shipment payment set to pay Later')
        handlePaymentMethod(3)
        handlePaymentStatus(true)
        setInterval(() => {
          setShowForm(false)
        }, 1000)
        setIsSubmitting(false)
        setShowError(false)
      }
    })
  }

  return (
    <div className='w-100'>
      <div className='pb-2 pb-lg-15'>
        <h2 className='fw-bolder text-dark'>Payment Options</h2>

        <div className='text-gray-400 fw-bold fs-6'></div>
      </div>

      <div className='row'>
        <div className='col-lg-4'>
          <Field
            type='radio'
            className='btn-check'
            name='paymentMethod'
            value='wallet'
            id='kt_create_payment_wallet'
            onClick={handleClick}
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
              <span className='text-dark fw-bolder d-block fs-4 mb-2'>Wallet</span>
              <span className='text-gray-400 fw-bold fs-6'>Wallet Accepted</span>
            </span>
          </label>
        </div>

        <div className='col-lg-4'>
          <Field
            type='radio'
            className='btn-check'
            name='paymentMethod'
            value='creditdebitcard'
            id='kt_create_payment_creditdebit'
            onClick={handleClick}
          />
          <label
            className='btn btn-outline btn-outline-dashed btn-outline-default p-7 d-flex align-items-center'
            htmlFor='kt_create_payment_creditdebit'
          >
            <KTSVG path='/media/icons/duotune/finance/fin006.svg' className='svg-icon-3x me-5' />

            <span className='d-block fw-bold text-start'>
              <span className='text-dark fw-bolder d-block fs-4 mb-2'>Credit/Debit Card</span>
              <span className='text-gray-400 fw-bold fs-6'>Debit Card Accepted</span>
            </span>
          </label>
        </div>

        <div className='col-lg-4'>
          <Field
            type='radio'
            className='btn-check'
            name='paymentMethod'
            value='postpaid'
            id='kt_create_payment_postpaid'
            onClick={handleClick}
          />
          <label
            className='btn btn-outline btn-outline-dashed btn-outline-default p-7 d-flex align-items-center'
            htmlFor='kt_create_payment_postpaid'
          >
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

      <div className='row'>
        <div className='mb-0'>
          <div className='notice d-flex bg-light-warning rounded border-warning border border-dashed p-2 m-1'>
            <div className='' style={{width: '100%'}}>
              <div className='fw-bold'>
                <div className='fs-6 text-gray-700'>
                  <div className='row g-5 g-xxl-12'>
                    <div className='col-xl-12'>
                      {successMessage && (
                        <div className='alert alert-success' role='alert'>
                          {successMessage}
                        </div>
                      )}
                      {errorMessage && (
                        <div className='alert alert-danger' role='alert'>
                          {errorMessage}
                        </div>
                      )}
                      {paymentSummary && (
                        <div className='card mb-5 mb-xl-12' id='kt_profile_details_view'>
                          {values.paymentMethod === 'wallet' && (
                            <div className='card-header cursor-pointer'>
                              <div className='card-title m-0'>
                                {!paidstatus && <h3 className='fw-bolder m-0'>Pay Now</h3>}
                                {paidstatus && (
                                  <h3 className='fw-bolder m-0'>Order Confirmation</h3>
                                )}
                              </div>
                              <div className='card-title m-2'>
                                {!paidstatus && (
                                  <button
                                    type='button'
                                    style={{width: '88%'}}
                                    className='btn btn-primary btn-lg ml-3'
                                    onClick={handleWalletPayment}
                                  >
                                    {isSubmitting && (
                                      <span className='spinner-border text-warning'></span>
                                    )}
                                    {!isSubmitting && (
                                      <span>
                                        Pay NGN {numberFormat(Number(values.grandTotal))} with
                                        wallet
                                      </span>
                                    )}
                                  </button>
                                )}
                                {paidstatus && <img src={paid} alt='Logo' />}
                              </div>
                            </div>
                          )}

                          {values.paymentMethod === 'creditdebitcard' && (
                            <div className='card-header cursor-pointer'>
                              <div className='card-title m-0'>
                                {!paidstatus && <h3 className='fw-bolder m-0'>Pay Now</h3>}
                                {paidstatus && (
                                  <h3 className='fw-bolder m-0'>Order Confirmation</h3>
                                )}
                              </div>
                              <div className='card-title m-2'>
                                {!paidstatus && (
                                  <button
                                    type='button'
                                    style={{width: '88%'}}
                                    className='btn btn-primary btn-lg ml-3'
                                    onClick={handlePostPaidPayment}
                                    disabled
                                  >
                                    {isSubmitting && (
                                      <span className='spinner-border text-warning'></span>
                                    )}
                                    {!isSubmitting && (
                                      <span>
                                        Pay NGN {numberFormat(Number(values.grandTotal))} with
                                        Credit/Debit Card
                                      </span>
                                    )}
                                  </button>
                                )}

                                {paidstatus && <img src={paid} alt='Logo' />}
                              </div>
                            </div>
                          )}

                          {values.paymentMethod === 'postpaid' && (
                            <div className='card-header cursor-pointer'>
                              <div className='card-title m-0'>
                                {!paidstatus2 && <h3 className='fw-bolder m-0'>Pay Later</h3>}
                                {paidstatus2 && (
                                  <h3 className='fw-bolder m-0'>Order Confirmation</h3>
                                )}
                              </div>
                              <div className='card-title m-2'>
                                {!paidstatus2 && (
                                  <button
                                    type='button'
                                    style={{width: '88%'}}
                                    className='btn btn-primary btn-lg ml-3'
                                    onClick={handlePostPaidPayment}
                                  >
                                    {isSubmitting && (
                                      <span className='spinner-border text-warning'></span>
                                    )}
                                    {!isSubmitting && (
                                      <span>
                                        Pay NGN {numberFormat(Number(values.grandTotal))} with Post
                                        Paid
                                      </span>
                                    )}
                                  </button>
                                )}
                                {paidstatus2 && <img src={unpaid} alt='Logo' />}
                              </div>
                            </div>
                          )}

                          <div className='card-body p-12'>
                            <div className='row mb-12'>
                              <label className='col-lg-4 fw-bold text-muted'>WayBill #</label>

                              <div className='col-lg-8'>
                                <span className='fw-bolder fs-6 text-dark'>
                                  {values.waybillNumber}
                                </span>
                              </div>
                            </div>

                            <div className='row mb-12'>
                              <label className='col-lg-4 fw-bold text-muted'>Invoice #</label>

                              <div className='col-lg-8'>
                                <span className='fw-bolder fs-6 text-dark'>
                                  {values.invoiceNumber}
                                </span>
                              </div>
                            </div>

                            <div className='row mb-12'>
                              <label className='col-lg-4 fw-bold text-muted'>
                                Shipment Category
                              </label>

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

                              <div className='col-lg-8'>0{values.shipperPhoneNumber}</div>
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
                              <label className='col-lg-4 fw-bold text-muted'>
                                Receiver Phone Number
                              </label>

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
                                              <div className='col'>{item.weight}tons</div>
                                            </div>
                                            <div className='row m-2'>
                                              <div className='col'>
                                                <strong>Description</strong>
                                              </div>
                                              <div className='col'>
                                                {item.t_shipmentDescription}
                                              </div>
                                            </div>
                                            <div className='row m-2'>
                                              <div className='col'>
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
                                              <div className='col mb-5'>
                                                {item.m_shipmentDescription}
                                              </div>
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
                              <h3 className='fw-bolder m-0'>
                                {numberFormat(Number(values.grandTotal))}
                              </h3>
                            </div>
                          </div>
                        </div>
                      )}
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

export {Step5}
