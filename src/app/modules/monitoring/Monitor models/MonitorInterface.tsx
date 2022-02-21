
export interface ITripModel {
    id: string
    TripReference: string
    RouteCode: string
    fleetid: string
    fleet: string
    ManifestId: string
    manifest: string
    Driver: string
    Dispatcher: string
    DriverDispatchFee: string
    Miscelleneous: string
    FuelCosts: string
    FuelUsed: string
    StartTime: string
    EndTime: string
    status: string
}

export interface ITrackHistoryModel {
    id: string
    TripId : string
    Action  : string
    Location : string
    TimeStamp : string
    Status : string
}
