export interface IShipmentRequestModel {
    FirstName: string;
    LastName: string;
    email: string;
    PhoneNumber: string;
    Description: string;
    Waybill: string;
    Customer: string;
    GrandTotal: string;
    Reciever: string;
    pickUpOptions: string;
    ownerId: string;
    message?: string
    validationErrors?: string[]
    shipmentrequestdto?: {}
}