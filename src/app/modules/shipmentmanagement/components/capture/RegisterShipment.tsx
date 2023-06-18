import React, {useState} from 'react'
import MultiStepForm, {FormStep} from '../../../layout/forms/MultiStepForm'
import ServiceStep from '../../../wizards/components/steps/ServiceStep'
import * as Yup from 'yup'
import {inits} from '../../../wizards/components/CreateAccountWizardHelper'
import ShipperStep from '../../../wizards/components/steps/ShipperStep'
import {FormikValues, validateYupSchema} from 'formik'
import {ShipmentItemStep} from '../../../wizards/components/steps/ShipmentItemStep'
import {SummaryStep} from '../../../wizards/components/steps/SummaryStep'
import {IPaymentCriteriaModel} from '../../../payment/PaymentModels/PaymentmentInterfaces'
import {v4 as uuid} from 'uuid'
import {toast} from 'react-toastify'
import agent from '../../../../../setup/axios/AxiosAgent'
import {FinalStep} from '../../../wizards/components/steps/FinalStep'
import {Redirect} from 'react-router-dom'
import {IUserModel} from '../../../auth/models/AuthInterfaces'
import {shallowEqual, useSelector} from 'react-redux'
import {RootState} from '../../../../../setup'
import {userInfo} from 'os'

const createAccountSchemas = [
  Yup.object({
    shipmentCategory: Yup.string().required().label('Shipment Type'),
  }),
  Yup.object({
    shipperFullName: Yup.string().required().label('Shipper Full Name'),
    shipperAddress: Yup.string().required().label('Shipper Address'),
    shipperPhoneNumber: Yup.string().required().label('Shipper Phone'),
    receiverFullName: Yup.string().required().label('Receiver Full Name'),
    receiverAddress: Yup.string().required().label('Receiver Address'),
    receiverPhoneNumber: Yup.string().required().label('Receiver Phone'),
    route: Yup.string().required().label('Route'),
  }),
  Yup.object({
    ton: Yup.string().required('Weight is required'),
  }),
  Yup.object({
    itemsA: Yup.array().of(
      Yup.object().shape({
        t_clientWaybill: Yup.string().required('Client Waybill is required'),
        t_shipmentType: Yup.string().required('Product is required'),
        t_quantity: Yup.string().required('Quantity is required'),
      })
    ),
    itemsB: Yup.array().of(
      Yup.object().shape({
        weight: Yup.string().required('Weight is required'),
        length: Yup.string().required('Length is required'),
        breadth: Yup.string().required('Breadth is required'),
        height: Yup.string().required('Height is required'),
        quantity: Yup.string().required('Quantity is required'),
      })
    ),
  }),
]

const serviceSchema = Yup.object({
  shipmentCategory: Yup.string().required().label('Shipment Type'),
})

const shipperDetailsSchema = Yup.object({
  shipperFullName: Yup.string().required().label('Shipper Full Name'),
  shipperAddress: Yup.string().required().label('Shipper Address'),
  shipperPhoneNumber: Yup.string().required().label('Shipper Phone'),
  receiverFullName: Yup.string().required().label('Receiver Full Name'),
  receiverAddress: Yup.string().required().label('Receiver Address'),
  receiverPhoneNumber: Yup.string().required().label('Receiver Phone'),
  route: Yup.string().required().label('Route'),
})

const shipmentItemsSchema = Yup.object({
  ton: Yup.string().required().label('Truck Capacity'),
  t_clientWaybill: Yup.string().required('Client Waybill is required'),

  itemsA: Yup.array().of(
    Yup.object().shape({
      t_shipmentType: Yup.string().required('Product is required'),
      t_quantity: Yup.string().required('Quantity is required'),
    })
  ),
  itemsB: Yup.array().of(
    Yup.object().shape({
      weight: Yup.string().required('Weight is required'),
      length: Yup.string().required('Length is required'),
      breadth: Yup.string().required('Breadth is required'),
      height: Yup.string().required('Height is required'),
      quantity: Yup.string().required('Quantity is required'),
    })
  ),
})

const RegisterShipment = () => {
  const [paymentSummary, showPaymentSummary] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [showError, setShowError] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(true)
  const [paidstatus, setPaidStatus] = useState(false)
  const [registerstatus, setRegisterStatus] = useState(false)
  const [paidstatus2, setPaidStatus2] = useState(false)

  const user: IUserModel = useSelector<RootState>(({auth}) => auth.user, shallowEqual) as IUserModel
  inits.shipperFullName = user.firstName + ' ' + user.lastName
  inits.shipperPhoneNumber = user.phoneNumber

  const initialValues = inits

  // console.log('User: ', initialValues)
  const handleGrandTotal = (values: FormikValues | any) => {
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

    return total
  }

  const handleShipmentRegister = (values: FormikValues | any) => {
    const walletCode = '00000'
    const invoiceCode = '00000'
    const userCode = uuid()

    setIsSubmitting(true)
    values.grandTotal = handleGrandTotal(values)

    const paymentCriteria: IPaymentCriteriaModel = {
      amount: values.grandTotal,
      customerPhoneNumber: values.shipperPhoneNumber.toString(),
      userId: userCode,
      invoiceNumber: invoiceCode,
      walletNumber: walletCode,
      shipmentCategory: 1,
      routeId: values.route,
      paymentStatus: false,
      isShipmentRegistered: false,
      paymentMethod: 1,
      description: 'Wallet Debit Transaction',
      values: values,
    }

    if (values.shipmentCategory === 'mailandparcel') {
      paymentCriteria.shipmentCategory = 1
    } else if (values.shipmentCategory === 'TruckLoad') {
      paymentCriteria.shipmentCategory = 2
    } else if (values.shipmentCategory === 'freight') {
      paymentCriteria.shipmentCategory = 3
    }

    // console.log("Payment Log", paymentCriteria )
    agent.Shipment.registerShipment(paymentCriteria).then((response) => {
      if (response.validationErrors!.length > 0) {
        toast.error(response.validationErrors?.toString())
        setErrorMessage(response.validationErrors!.toString())
        setIsSubmitting(false)
        setShowError(true)
      } else {
        setRegisterStatus(response.isShipmentRegistered!)
        values.paymentMade = response.paymentStatus
        if (response.isShipmentRegistered) {
          if (values.shipmentCategory === 'mailandparcel') {
            setSuccessMessage('Shipment Creation Was Successful!')
            setRegisterStatus(response.isShipmentRegistered!)
          }
          if (values.shipmentCategory === 'TruckLoad') {
            setSuccessMessage('Shipment Creation Was Successful!')
            setRegisterStatus(response.isShipmentRegistered!)
          }
          if (values.shipmentCategory === 'freight') {
            setSuccessMessage('Shipment Creation Was Successful!')
            setRegisterStatus(response.isShipmentRegistered!)
          }
          toast.success('Shipment Creation Was Successful!')
          setSuccessMessage('Shipment Creation Was Successful!')
        } else {
          toast.error('Payment processing failed, Please try again or use another payment method!')
          setErrorMessage(
            'Payment processing failed, Please try again or use another payment method!'
          )
        }
        setIsSubmitting(false)
        setShowError(false)
      }
    })
  }

  const handlePayment = (values: FormikValues | any) => {
    const walletCode = '00000'
    const invoiceCode = '00000'
    const userCode = uuid()

    setIsSubmitting(true)

    if (values.grandTotal > 0) {
      const paymentCriteria: IPaymentCriteriaModel = {
        amount: values.grandTotal,
        customerPhoneNumber: values.shipperPhoneNumber.toString(),
        userId: userCode,
        invoiceNumber: invoiceCode,
        walletNumber: walletCode,
        waybillNumber: walletCode,
        shipmentCategory: 1,
        routeId: values.route,
        paymentStatus: false,
        paymentMethod: 1,
        description: 'Wallet Debit Transaction',
        values: values,
      }

      if (values.paymentMethod === 'wallet') {
        paymentCriteria.paymentMethod = 1
      } else if (values.paymentMethod === 'creditdebitcard') {
        paymentCriteria.paymentMethod = 2
      } else if (values.paymentMethod === 'postpaid') {
        paymentCriteria.paymentMethod = 2
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
          } else {
            toast.error(
              'Payment processing failed, Please try again or use another payment method!'
            )
            setErrorMessage(
              'Payment processing failed, Please try again or use another payment method!'
            )
            setPaidStatus(true)
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
    <>
      <div className='card'>
        <div className='card-body'>
          <MultiStepForm initialValues={initialValues} onSubmit={handlePayment}>
            <FormStep stepName='Shipment Category' validationSchema={serviceSchema}>
              <ServiceStep />
            </FormStep>
            <FormStep
              stepName='Shippers Details'
              onSubmit={(values: FormikValues) => console.log(values)}
              validationSchema={shipperDetailsSchema}
            >
              <ShipperStep />
            </FormStep>

            <FormStep
              stepName='Shipment Items'
              onSubmit={(values: FormikValues) => handleShipmentRegister(values)}
              validationSchema={shipmentItemsSchema}
            >
              <ShipmentItemStep />
            </FormStep>

            <FormStep
              stepName='Summary'
              onSubmit={(values: FormikValues) => console.log(values)}
              validationSchema={shipperDetailsSchema}
            >
              <SummaryStep />
            </FormStep>

            <FormStep
              stepName='Complete'
              // onSubmit={(values: FormikValues) => console.log(values)}
              validationSchema={shipperDetailsSchema}
            >
              {paidstatus && <Redirect to='/shipment/shipment' />}
              <FinalStep />
            </FormStep>
          </MultiStepForm>
        </div>
      </div>
    </>
  )
}

export default RegisterShipment
