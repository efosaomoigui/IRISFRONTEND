
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
    tripReference: string
    action  : string
    location : string
    timeStamp : string
    status : string
    message?: string
    validationErrors?: string[]
    trackhistorydto?: {}
}
