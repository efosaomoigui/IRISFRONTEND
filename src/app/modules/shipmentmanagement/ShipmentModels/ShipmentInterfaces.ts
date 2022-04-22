
export interface IFleetModel {
    fleetId: string;
    fleetType: number;
    registrationNumber: string;
    chassisNumber: string;
    engineNumber: string;
    status: boolean;
    capacity: number;
    description: string;
    fleetModel: string;
    fleetMake: string;
    ownerId: string;
    message?: string
    validationErrors?: string[]
    fleetdto?: {}
}

export interface IRouteModel {
    routeId: string
    routeName: string
    departure: string
    destination: string
    message?: string
    validationErrors?: string[]
    routedto?: {}
} 

export interface IShipmentModel {
    shipmentId?:string
    waybill?:string
    invoice?:string
    departure?:string
    shipmentCategory?:string
    shipmentRouteId?:string
    destination?:string
    createdDate?:string
    customerName?:string
    customer?:string
    customerPhoneNumber?:string
    recieverPhoneNumber?:string
    grandTotal?:string
    customerAddress?:[{}]
    recieverName?:string
    Reciever?:string
    recieverAddress?:[{}]
    pickupOptions?:string
    shipmentItems?:IShipmentItems[]
    serviceCenterId?:string
} 

export interface IBaseShipmentModel {
    waybill?:string
    destination?:string
    routeId?:string
} 


export interface IShipmentItems {
    ShipmentItemId?:string 
    Weight ?:string
    length?:string
    breadth?:string
    Height ?:string
    DimensionUnit?:string
    ShipmentDescription?:string
    ShipmentProduct?:string
    Shipment ?:string
    LineTotal?:string
}

export interface IShipmentWayBillAndInvoiceModel {
    waybill:string
    invoice:string
}

export interface IShipmentInvoiceModel {
    Invoice:string
}

export interface IPriceModel {
    id?: string; 
    category: number;
    routeId: string;
    departure?: string;
    destination?: string;
    routeName?: string;
    unitWeight: number;
    pricePerUnit: number;
    product?:number;
    message?: string
    validationErrors?: string[]
    pricedto?: {}
} 

export interface ILinePriceModel {
    weight: number;
    length: number;
    breadth: number;
    height: number;
    lineTotal:number;
    ShimentCategory: number;
    routeId: string;
    pricedData?:any;
} 

export interface IManifestModel {
    Id?:string
    manifestCode: string;
    groupWayBillId: string;
    departure?: string;
    destination?: string;
    UserId?: string; 
    serviceCenterId: string;
    message?: string
    validationErrors?: string[] 
    manifestdto?: {}
} 

export interface IGroupWayBillModel {
    Id? : string
    GroupCode? : string
    Shipment? : string
    Waybills? : IBaseShipmentModel[]
    departure?: string;
    destination?: string;
    UserId?: string; 
    RId?   : string
    GroupRId?  : string      
    ServiceCenterId? : string
    message?: string 
    validationErrors?: string[]
} 