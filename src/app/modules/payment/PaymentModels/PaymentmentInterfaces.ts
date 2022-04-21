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
  userId: string
  walletTransactionType?: number
  invoiceNumber: string
  walletNumber: string
  shimentCategory: number
  routeId: null
  paymentStatus: boolean
  description: string
  pricedto?: {}
  values?: [{}]
  accessToken?: {}
  expireAt?: string
  message?: {}
  success?: boolean
  validationErrors?: []
}
