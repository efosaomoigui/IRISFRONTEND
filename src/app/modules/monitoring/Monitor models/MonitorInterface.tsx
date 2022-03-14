
export interface ITripModel {
    id: string
    tripReference: string
    routeCode: string
    fleetid: string
    fleet: string
    manifestId: string
    manifest: string
    driver: string
    startTime: string
    endTime: string
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
