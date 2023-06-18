export interface IFleetModel {
  fleetId?: string
  fleetType: number
  chassisNumber: string
  status?: boolean
  capacity: number
  fleetModel: string
  fleetMake: string
  ownerId: string
  ownerName?: string
  message?: string
  validationErrors?: string[]
  fleetdto?: {}
}

export interface IRouteModel {
  routeId?: string
  routeName: string
  departure: string
  destination: string
  message?: string
  validationErrors?: string[]
  routedto?: {}
}

export interface IDashBoardModel {
  monthData: string
  month: string
}

export interface IShipmentModel {
  shipmentId?: string
  waybill?: string
  invoice?: string
  departure?: string
  shipmentCategory?: string
  shipmentRouteId?: string
  destination?: string
  createdDate?: string
  customerName?: string
  customer?: string
  paidStatus?: string
  customerPhoneNumber?: string
  recieverPhoneNumber?: string
  grandTotal?: string
  customerAddress?: [{}]
  recieverName?: string
  Reciever?: string
  recieverAddress?: [{}]
  pickupOptions?: string
  ton?: string
  clientWaybill?: string
  shipmentItems?: IShipmentItems[]
  serviceCenterId?: string
}

export const product = [
  {optionValue: '', optionLabel: 'Select Product Type'},
  {optionValue: 2, optionLabel: 'Tomatoes'},
  {optionValue: 3, optionLabel: 'Vedan'},
  {optionValue: 4, optionLabel: 'Noodles'},
  {optionValue: 5, optionLabel: 'Flour'},
  {optionValue: 6, optionLabel: 'Cowbell'},
  {optionValue: 7, optionLabel: 'Nestle'},
  {optionValue: 8, optionLabel: 'Bigi'},
]

const productLabel = (value: number) => {
  let productLabel = product.find((item) => item.optionValue === value)
  return productLabel!.optionLabel
}

export interface IBaseShipmentModel {
  waybill?: string
  destination?: string
  routeId?: string
}

export interface OptionValue {
  name: number
  value: string
}
export interface TripActionAndStatusVm {
  actions: OptionValue[]
  status: OptionValue[]
}

export interface IBaseGroupWayBillModel {
  groupCode?: string
  manifestCode?: string
  groupWayBillCode?: string
  destination?: string
  departure?: string
  routeId?: string
  createdDate?: string
}

export interface IShipmentItems {
  ShipmentItemId?: string
  Weight?: string
  length?: string
  breadth?: string
  Height?: string
  DimensionUnit?: string
  ShipmentDescription?: string
  ShipmentProduct?: string
  Shipment?: string
  Quantity?: string
  LineTotal?: string
}

export interface IShipmentWayBillAndInvoiceModel {
  waybill: string
  invoice: string
}

export interface IShipmentInvoiceModel {
  Invoice: string
}

export interface IPriceModel {
  id?: string
  category: number
  routeId: string
  departure?: string
  destination?: string
  routeName?: string
  unitWeight: number
  pricePerUnit: number
  product?: number
  message?: string
  validationErrors?: string[]
  pricedto?: {}
}

export interface ILinePriceModel {
  weight: number
  length: number
  breadth: number
  height: number
  quantity: number
  lineTotal: number
  ShimentCategory: number
  Product: number
  routeId: string
  pricedData?: any
}

export interface IManifestModel {
  Id?: string
  manifestCode?: string
  GroupWayBillCode?: IBaseGroupWayBillModel[]
  groupWaybills?: IBaseGroupWayBillModel[]
  // GroupWayBillCode?: string;
  groupWayBillId?: string
  RouteId?: string
  departure?: string
  destination?: string
  UserId?: string
  serviceCenterId?: string
  message?: string
  validationErrors?: string[]
  manifestdto?: {}
}

export interface IGroupWayBillModel {
  Id?: string
  groupCode?: string
  Shipment?: string
  waybill?: string
  Waybills?: IBaseShipmentModel[]
  departure?: string
  destination?: string
  createdDate?: string
  UserId?: string
  RId?: string
  GroupRId?: string
  ServiceCenterId?: string
  message?: string
  validationErrors?: string[]
}
