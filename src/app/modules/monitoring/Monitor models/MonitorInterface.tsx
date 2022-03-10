
export interface ITripModel {
    id: string
    TripReference: string
    RouteCode: string
    fleetid: string
    fleet: string
    ManifestId: string
    manifest: string
    Driver: string
    StartTime: string
    EndTime: string
    message?: string
    validationErrors?: string[]
    tripdto?: {}
}

export interface ITrackHistoryModel {
    id: string
    TripId : string
    Trip: string
    Action  : string
    Location : string
    TimeStamp : string
    Status : string
    message?: string
    validationErrors?: string[]
    trackhistorydto?: {}
}
