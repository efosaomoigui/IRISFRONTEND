
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

