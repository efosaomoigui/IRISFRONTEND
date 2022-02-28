
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
}

export interface IRouteModel {
    RouteId: string
    RouteName: string
    Departure: string
    Destination: string
    IsSubRoute: boolean
    DispatchFee: number
    LoaderFee: number
    CaptainFee: number
    MainRouteId: number
    AvailableAtTerminal: boolean
    AvailableOnline: boolean
    RouteType: number
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
    id: string;
    Category: string;
    RouteId: string;
    Route: string;
    UnitWeight: number;
    PricePErUnit: string;
} 
export interface IManifestModel {
    Id: string;
    ManifestCode: string;
    GroupWayBillId: string;
    GroupWayBill: string;
    UserId: string;
} 