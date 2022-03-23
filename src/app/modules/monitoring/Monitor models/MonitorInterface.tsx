
export interface ITripModel {
    id: string
    tripReference: string
    routeCode: string
    fleet: string
    driver: string
    groupWayBillManifestMap: []
    dispatcher: string 
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
