export interface IFulfilmentModel {
    
    shipmentId: string
    shipment: string
    collectionStatus: boolean
    userId: string
    message?: string
    validationErrors?: string[]
    collectioncenterdto?: {}
}