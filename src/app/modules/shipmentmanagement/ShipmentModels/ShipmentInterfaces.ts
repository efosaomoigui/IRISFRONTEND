
export interface IFleetModel {
    FleetId: string;
    RegistrationNumber: string;
    ChasisNumber: string;
    EngineNumber: string;
    Status: string;
    FleetType: string;
    Capacity: string;
    Description: string;
    FleetModel: string;
    FleetMake: string;
    OwnerId: string;
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
   
    Category: string;
    RouteId: string;
    Route: string;
    UnitWeight: number;
    PricePErUnit: string;
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