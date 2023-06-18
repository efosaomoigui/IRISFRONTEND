import * as Yup from 'yup'
import {IRouteModel} from '../../shipmentmanagement/ShipmentModels/ShipmentInterfaces'

export interface ICreateAccount {
  shipmentCategory?: string
  shipperFullName?: string
  shipperAddress?: string
  shipperEmail?: string
  shipperPhoneNumber?: string
  receiverFullName?: string
  receiverAddress?: string
  receiverEmail?: string
  receiverPhoneNumber?: string
  route?: string
  shipmentOption?: string
  estimatedPickUpTime?: string
  ton?: string
  t_clientWaybill?: string
  itemsA: Array<{
    // ton?: string
    t_shipmentDescription?: string
    t_shipmentType?: number | string
    t_quantity?: string
    itemsValue?: string
    LineTotal?: number
  }>
  itemsB: Array<{
    weight?: number
    length?: number
    breadth?: number
    height?: number
    quantity?: number
    volume?: string
    volumetricWeight?: string
    chargeableWeight?: string
    pricePerUnit?: string
    m_shipmentDescription?: string
    itemsValueMail?: string
    LineTotal?: number
  }>
  grandTotal?: number
  grandTotalArray?: number[]
  paymentMethod?: string
  waybillNumber?: string
  invoiceNumber?: string
  paymentMade?: boolean
  routeVals?: IRouteModel[]
}

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
    itemsA: Yup.array().of(
      Yup.object().shape({
        ton: Yup.string().required('Weight is required'),
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

const inits: ICreateAccount = {
  shipmentCategory: 'mailandparcel',
  shipperFullName: '',
  shipperAddress: '',
  shipperEmail: '',
  shipperPhoneNumber: '',
  receiverFullName: '',
  receiverAddress: '',
  receiverEmail: '',
  receiverPhoneNumber: '',
  route: '',
  shipmentOption: '',
  estimatedPickUpTime: '',
  ton: '10',
  t_clientWaybill: '1',
  itemsA: [
    {
      // ton: '10',
      t_shipmentDescription: '',
      t_shipmentType: 1,
      t_quantity: '1',
      itemsValue: '1',
      LineTotal: 0.0,
    },
  ],
  itemsB: [
    {
      weight: 1.0,
      length: 1.0,
      breadth: 1.0,
      height: 1.0,
      quantity: 1.0,
      volume: '',
      volumetricWeight: '',
      chargeableWeight: '',
      pricePerUnit: '',
      m_shipmentDescription: '',
      itemsValueMail: '1',
      LineTotal: 0.0,
    },
  ],
  grandTotal: 0,
  grandTotalArray: [0],
  paymentMethod: '',
  waybillNumber: '',
  invoiceNumber: '',
  paymentMade: false,
}

export {createAccountSchemas, inits}
