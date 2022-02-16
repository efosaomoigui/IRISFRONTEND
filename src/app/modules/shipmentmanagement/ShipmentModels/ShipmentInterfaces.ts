
export interface IFleetModel {
    FleetId: string
    FleetName: string
    FleetModel: string
    FleetMake: string
    FleetType: string
}

export interface IRouteModel {
    RouteId: string
    CodeName: string
    departureCentreId: string
    destinationCentreId: string
    Distance: string
} 

export interface IShipmentModel {
    ShipmentId: string
    WayBillNumber: string
    FirstName: string
    LastName: string
} 
export interface IPriceModel {
    id: string;
    Category: string;
    RouteId: string;
    Route: string;
    UnitWeight: number;
    PricePErUnit: string;
} 