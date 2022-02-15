
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
    Id: string
    WayBillPrice: string
    RoutePrice: string
    Currency: string
} 