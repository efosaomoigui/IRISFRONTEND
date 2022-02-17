
export interface IPaymentLogModel {
    PaymentId: string
    PaymentName: string
    PaymentModel: string
}

export interface IInvoiceModel {
    Id: string
    InvoiceCode: string
    ShipmentId: string
    Shipment: string
    PaymentMethod: string
    ShipStatus: string
}

