
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
    ShipmentId:string
    Waybill:string
    CreatedDate?:string
    CustomerNaame?:string
    Customer:string
    GrandTotal:string
    CustomerAddress:[{}]
    RecieverName?:string
    Reciever:string
    RecieverAddress:[{}]
    PickupOptions:string
    ShipmentItems:[{}]
    ServiceCenterId?:string
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
    serviceCenterId: string;
    message?: string
    validationErrors?: string[]
    manifestdto?: {}
} 