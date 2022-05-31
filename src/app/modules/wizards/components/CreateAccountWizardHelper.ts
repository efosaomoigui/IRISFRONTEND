import * as Yup from 'yup'

export interface ICreateAccount {
  shipmentCategory: string
  shipperFullName: string
  shipperAddress: string
  shipperPhoneNumber: string
  receiverFullName: string
  receiverAddress: string
  receiverPhoneNumber: string
  route: string
  itemsA: Array<{
    ton: string
    t_shipmentDescription: string
    t_shipmentType: number | string
    t_clientWaybill: string
    LineTotal: number
  }>
  itemsB: Array<{
    weight: string
    length: string
    breadth: string
    height: string
    quantity: string
    volume?: string
    volumetricWeight?: string
    chargeableWeight?: string
    pricePerUnit?: string
    m_shipmentDescription: string
    LineTotal: number
  }>
  grandTotal: number
  grandTotalArray: number[]
  paymentMethod: string
  waybillNumber?: string
  invoiceNumber?: string
  paymentMade?: boolean
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
  shipperPhoneNumber: '',
  receiverFullName: '',
  receiverAddress: '',
  receiverPhoneNumber: '',
  route: '',
  itemsA: [
    {
      ton: '10',
      t_shipmentDescription: '',
      t_shipmentType: 1,
      t_clientWaybill: '1',
      LineTotal: 0.0,
    },
  ],
  itemsB: [
    {
      weight: '1',
      length: '1',
      breadth: '1',
      height: '1',
      quantity: '1',
      volume: '',
      volumetricWeight: '',
      chargeableWeight: '',
      pricePerUnit: '',
      m_shipmentDescription: '1',
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
