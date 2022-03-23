
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
    ShipmentId: string
    Shipment: string
    PaymentMethod: string
    ShipStatus: string
}

export interface IPaymentCriteriaModel {
    PaymentMethod?:number
    CustomerPhoneNumber:string
    Amount:number
    UserId:string
    WalletTransactionType?:number
    InvoiceNumber:string
    WalletNumber:string
    ShimentCategory:number
    RouteId:null
    PaymentStatus:boolean
    Description:string
    message?: string
    validationErrors?: string[]
    pricedto?: {}
    Values?:[{}]
} 

