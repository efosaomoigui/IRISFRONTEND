
export interface IFleetModel {
    id: string;
    registration_Number: string;
    chasis_Number: number;
    engine_Number: number;
    fleet_Type: string;
    capacity: string;
    description: string;
    fleet_Model: string;
    fleet_Make: string;
    owner_Id: string;
}

export interface IRouteModel {
    routId: string
    routeName: string
    depature: string
    destination: string
    isSubRoute: string
    dispatchFee: string
    loaderFee: string
    captainFee: string
    main_Route_Id: string
    availabale_At_Terminal: string
    availabale_Online: string
    route_Type: string
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