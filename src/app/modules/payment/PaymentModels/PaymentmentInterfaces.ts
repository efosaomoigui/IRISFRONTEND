export interface IPaymentLogModel {
  PaymentId: string
  Amount: string
  PaymentMethod: string
  User: string
  TransactionId: string
}

export interface IInvoiceModel {
  Id: string
  InvoiceCode: string
  Waybill?: string
  amount?: string
  customerName?: string
  ShipmentId: string
  Shipment?: string
  PaymentMethod: string
  Status: string
}

export interface IPaymentCriteriaModel {
  paymentMethod?: number
  customerPhoneNumber: string
  amount: number
  userId?: string
  walletTransactionType?: number
  invoiceNumber: string
  walletNumber: string
  waybillNumber?: string
  shipmentCategory: number
  routeId: null
  paymentStatus: boolean
  isShipmentRegistered?: boolean
  description: string
  pricedto?: {}
  values?: [{}]
  accessToken?: {}
  expireAt?: string
  message?: {}
  success?: boolean
  validationErrors?: []
}

export interface IUpdatePaymentModel {
  paymentMethod?: number
  amount: number
  userId?: string
  invoiceNumber: string
  waybillNumber?: string
  shipmentCategory: number
  paymentStatus: boolean
  message?: {}
  success?: boolean
  validationErrors?: []
}
