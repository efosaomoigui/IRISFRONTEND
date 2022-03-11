
export interface IFleetModel {
    fleetId: string;
    fleetType: number;
    registrationNumber: string;
    chassisNumber: string;
    engineNumber: string;
    status: boolean;
    capacity: number;
    description: string;
    fleetModel: string;
    fleetMake: string;
    ownerId: string;
    message?: string
    validationErrors?: string[]
    fleetdto?: {}
}

export interface IRouteModel {
    routeId: string
    routeName: string
    departure: string
    destination: string
    message?: string
    validationErrors?: string[]
    routedto?: {}
} 

export interface IShipmentModel {
    ShipmentId: string
    Waybill: string
    Customer: string
    AddressId: string
    GrandTotal: string
    Reciever: string
    RecieverAddress: string
    PickUpOptions: string
    ShipmentItems: string
} 
export interface IPriceModel {
   
    category: number;
    routeId: string;
    unitWeight: number;
    pricePErUnit: number;
    message?: string
    validationErrors?: string[]
    pricedto?: {}
} 
export interface IManifestModel {
    Id: string;
    ManifestCode: string;
    GroupWayBillId: string;
    message?: string
    validationErrors?: string[]
    manifestdto?: {}
} 