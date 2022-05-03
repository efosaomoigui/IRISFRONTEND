import { IUserModel } from "../../auth/models/AuthInterfaces";
import { IFleetModel } from "../../shipmentmanagement/ShipmentModels/ShipmentInterfaces";

export interface ITripModel {
    id?: string
    tripReference?: string
    manifestCode?:string
    routeCode?: string
    routeName?: string
    departure?: string;
    destination?: string;
    fleet?: string
    fleetChasis?: string
    driver?: string
    driverName?: string
    createdDate?: string
    fleetObj?: IFleetModel
    driverObj?: IUserModel
    RouteCode?:string
    fleetFullDetails?:string
    userId?:string
    manifestList?: IBaseTripModel[]
    dispatcher?: string 
    message?: string
    validationErrors?: string[]
    tripdto?: {}
}

export interface IBaseTripModel {
    manifestCode?:string
    destination?:string
    routeId?:string
} 

export interface ITrackHistoryModel {
    id: string
    tripReference: string
    action  : string | number
    location : string
    createdDate? : string
    timeStamp : string
    waybill? : string
    manifestCode? : string
    status : string | number
    message?: string
    validationErrors?: string[]
    trackhistorydto?: {}
}
