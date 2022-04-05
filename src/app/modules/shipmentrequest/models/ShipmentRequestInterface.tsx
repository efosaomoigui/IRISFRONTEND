export interface IShipmentRequestModel {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    description: string;
    waybill: string;
    customer: string;
    recieverAddress: string;
    reciever: string;
    pickupOptions: string;
    shipmentId: string;
    customerAddress: string;
    serviceCenterId: string;
    message?: string
    validationErrors?: string[]
    shipmentrequestdto?: {}
}