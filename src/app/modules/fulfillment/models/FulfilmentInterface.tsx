export interface IFulfilmentModel {
    Id?:string
    shipmentId: string
    shipment: string
    collectionStatus: boolean
    userId: string
    message?: string
    validationErrors?: string[]
    collectioncenterdto?: {}
}