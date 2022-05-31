import axios, {AxiosResponse} from 'axios'
import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {toast} from 'react-toastify'
import {
  IPermissionModel,
  IPermissionTypesModel,
  IRoleModel,
  IUserModel,
  IUserRole,
} from '../../app/modules/auth/models/AuthInterfaces'
import {actions} from '../../app/modules/auth/redux/AuthRedux'
import {IFulfilmentModel} from '../../app/modules/fulfillment/models/FulfilmentInterface'
import {
  ITrackHistoryModel,
  ITripModel,
} from '../../app/modules/monitoring/Monitor models/MonitorInterface'
import {
  IInvoiceModel,
  IPaymentCriteriaModel,
  IPaymentLogModel,
} from '../../app/modules/payment/PaymentModels/PaymentmentInterfaces'
import {
  IFleetModel,
  IGroupWayBillModel,
  ILinePriceModel,
  IManifestModel,
  IPriceModel,
  IRouteModel,
  IShipmentInvoiceModel,
  IShipmentModel,
  IShipmentWayBillAndInvoiceModel,
  OptionValue,
  TripActionAndStatusVm,
} from '../../app/modules/shipmentmanagement/ShipmentModels/ShipmentInterfaces'
import {ShipmentModel} from '../../app/modules/shipmentmanagement/ShipmentModels/ShipmentModel'
import {IShipmentRequestModel} from '../../app/modules/shipmentrequest/models/ShipmentRequestInterface'
import {IWalletSearch} from '../../app/modules/walletmanagement/components/settings/ViewWallet'
import {
  IWalletModel,
  IWalletTransactionModel,
} from '../../app/modules/walletmanagement/Models/WalletInterfaces'

// import { ILogPaymentModel } from '../../app/modules/payment/PaymentModels/LogPaymentModel';

const responseBody = <T>(response: AxiosResponse<T>) => response.data
const API_URL = process.env.REACT_APP_API_URL

const request = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

// Users Request Starts
const Users = {
  list: () => request.get<IUserModel[]>(`${API_URL}/UserManagement/GetUsers`),
  details: (userid: string) =>
    request.get<IUserModel>(`${API_URL}/UserManagement/GetUser/${userid}`),
  create: (users: IUserModel) =>
    request.post<IUserModel>(`${API_URL}/UserManagement/Register`, users),
  update: (users: IUserModel) =>
    request.put<IUserModel>(`${API_URL}/UserManagement/UpdateUser`, users),
  delete: (id: string) => request.del<void>(`${API_URL}/UserManagement/GetUser${id}`),
}
const Roles = {
  list: () => request.get<IRoleModel[]>(`${API_URL}/UserManagement/GetRoles`),
  details: (roleid: string) =>
    request.get<IRoleModel>(`${API_URL}/UserManagement/GetRoleById/${roleid}`),
  create: (roles: IRoleModel) =>
    request.post<IRoleModel>(`${API_URL}/UserManagement/AddRole`, roles),
  update: (roles: IRoleModel) =>
    request.put<IRoleModel>(`${API_URL}/UserManagement/GetUser/${roles.id}`, {}),
  delete: (id: string) => request.del<void>(`${API_URL}/UserManagement/GetUser${id}`),
  AddRole: (userrole: IUserRole) =>
    request.post<IUserRole>(`${API_URL}/UserManagement/AddUserToRole`, userrole),
}
const Permissions = {
  list: () => request.get<IPermissionModel[]>(`${API_URL}/UserManagement/GetPermissions`),
  details: (roleId: string) =>
    request.get<IPermissionModel>(
      `${API_URL}/UserManagement/Permissions/GetPermissionsByRoleId/${roleId}`
    ),
  create: (permission: IPermissionModel) =>
    request.post<IPermissionModel>(`${API_URL}/UserManagement/AddPermissionToRole`, permission),
  update: (permission: IPermissionModel) =>
    request.put<IPermissionModel>(`${API_URL}/UserManagement/GetUser/${permission.roleId}`, {}),
  delete: (id: string) => request.del<void>(`${API_URL}/UserManagement/GetUser${id}`),
  permissionTypes: () =>
    request.get<IPermissionTypesModel[]>(`${API_URL}/UserManagement/GetPermissionTypes`),
}

// wallet Starts here
const Wallet = {
  list: () => request.get<IWalletModel[]>(`${API_URL}/Wallet/WalletNumber/all`),
  details: (walletid: string) =>
    request.get<IWalletModel>(`${API_URL}/Wallet/Wallets/GetWalletById/${walletid}`),
  create: (wallet: IWalletModel) =>
    request.post<IWalletModel>(`${API_URL}/Wallet/WalletNumber`, wallet),
  update: (wallet: IWalletModel) =>
    request.put<IWalletModel>(`${API_URL}/Wallet/WalletNumber/${wallet.id}`, {}),
  delete: (id: string) => request.del<void>(`${API_URL}/Wallet/WalletNumber${id}`),
  searrchWallet: (walletNumber: string) =>
    request.get<IWalletSearch>(`${API_URL}/Wallet/Wallets/GetWalletByWalletNumber/${walletNumber}`),
  credit: (wallet: IWalletModel) =>
    request.post<IWalletModel>(`${API_URL}/Wallet/CreditWallet`, wallet),
  debit: (wallet: IWalletModel) =>
    request.post<IWalletModel>(`${API_URL}/Wallet/DebitWallet`, wallet),
}

// wallet transaction Starts here
const WalletTransaction = {
  list: () => request.get<IWalletTransactionModel[]>(`${API_URL}/Wallet/WalletTransaction/all`),
  details: (transactionid: string) =>
    request.get<IWalletTransactionModel>(
      `${API_URL}/Wallet/WalletTransaction/GetWalletTransactionById/${transactionid}`
    ),
  userWallet: (userid: string) =>
    request.get<IWalletTransactionModel[]>(
      `${API_URL}/Wallet/GetWalletTransactionByUserId/${userid}`
    ),
  create: (wallettransaction: IWalletTransactionModel) =>
    request.post<IWalletTransactionModel>(`${API_URL}/Wallet/WalletTransaction`, wallettransaction),
  update: (wallettransaction: IWalletTransactionModel) =>
    request.put<IWalletTransactionModel>(
      `${API_URL}/Wallet/WalletTransaction/${wallettransaction.id}`,
      {}
    ),
  delete: (id: string) => request.del<void>(`${API_URL}/Shipment/GetUser${id}`),
}

// Route Request Starts
const Route = {
  list: () => request.get<IRouteModel[]>(`${API_URL}/ShipmentSettings/Route/all`),
  details: (routeid: string) =>
    request.get<IRouteModel>(`${API_URL}/ShipmentSettings/GetRouteById/${routeid}`),
  create: (route: IRouteModel) =>
    request.post<IRouteModel>(`${API_URL}/ShipmentSettings/Route`, route),
  update: (route: IRouteModel) =>
    request.put<IRouteModel>(`${API_URL}/ShipmentSettings/Route/edit`, route),
  delete: (id: string) => request.del<void>(`${API_URL}/ShipmentSettings/Route/${id}`),
}

// Shipment Request Starts
const Shipment = {
  list: () => request.get<IShipmentModel[]>(`${API_URL}/Shipment/Shipment/all`),
  details: (waybill: string) =>
    request.get<IShipmentModel>(`${API_URL}/Shipment/GetShipmentByWayBillNumber/${waybill}`),
  shipmentByRoute: (routeid: string) =>
    request.get<IShipmentModel[]>(`${API_URL}/Shipment/GetShipmentByRouteId/${routeid}`),
  create: (shipment: IShipmentModel) =>
    request.post<IShipmentModel>(`${API_URL}/Shipment/Shipment`, shipment),
  update: (shipment: IShipmentModel) =>
    request.put<IRouteModel>(`${API_URL}/Shipment/Shipment/edit`, shipment),
  delete: (id: string) => request.del<void>(`${API_URL}/Shipment/Shipment/delete/${id}`),
  NewWayBillNumber: () =>
    request.get<IShipmentWayBillAndInvoiceModel>(
      `${API_URL}/Shipment/Shipment/WaybillAndInvoiceNumber`
    ),
}

const Manifest = {
  list: () => request.get<IManifestModel[]>(`${API_URL}/Manifest/Manifest/all`),

  Routelist: () => request.get<IRouteModel[]>(`${API_URL}/Manifest/GroupWayBill/RouteForManifest`),
  details: (manifestcode: string) =>
    request.get<IManifestModel>(`${API_URL}/Manifest/GetManifestByManifestCode/${manifestcode}`),
  create: (manifest: IManifestModel) =>
    request.post<IManifestModel>(`${API_URL}/Manifest/Manifest`, manifest),
  update: (manifest: IManifestModel) =>
    request.put<IManifestModel>(`${API_URL}/Manifest/Manifest/edit/${manifest.Id}`, {}),
  delete: (id: string) => request.del<void>(`${API_URL}/Manifest/Manifest/delete/${id}`),
  GetManifestCode: () => request.get<string>(`${API_URL}/Manifest/Manifest/ManifestNumber/`),
  GetManifestByRouteId: (routeid: string) =>
    request.get<IManifestModel[]>(`${API_URL}/Manifest/GetManifestByRouteId/${routeid}`),
}

const GroupWayBill = {
  list: () => request.get<IGroupWayBillModel[]>(`${API_URL}/GroupWayBill/GroupWayBill/Getall`),
  Routelist: () =>
    request.get<IRouteModel[]>(`${API_URL}/GroupWayBill/GroupWayBill/RouteForGroupWaybill`),
  details: (groupwaybill: string) =>
    request.get<IGroupWayBillModel>(
      `${API_URL}/Manifest/GetManifestByManifestCode/${groupwaybill}`
    ),
  GetGroupWaybillByRouteId: (routeid: string) =>
    request.get<IGroupWayBillModel[]>(
      `${API_URL}/GroupWayBill/GetGroupWaybillByRouteId/${routeid}`
    ),
  create: (groupwaybill: IGroupWayBillModel) =>
    request.post<IGroupWayBillModel>(`${API_URL}/GroupWayBill/CreateGroupWayBill`, groupwaybill),
  update: (manifest: IGroupWayBillModel) =>
    request.put<IGroupWayBillModel>(`${API_URL}/Manifest/Manifest/edit/${manifest.Id}`, {}),
  delete: (id: string) => request.del<void>(`${API_URL}/Manifest/Manifest/delete/${id}`),
  GetGroupWayBillCode: () =>
    request.get<string>(`${API_URL}/GroupWayBill/GroupWayBill/GroupWaybillNumber/`),
}

// Fleet Request Starts
const Fleet = {
  list: () => request.get<IFleetModel[]>(`${API_URL}/ShipmentSettings/Fleet/all`),
  details: (fleetid: string) =>
    request.get<IFleetModel>(`${API_URL}/ShipmentSettings/GetFleetById/${fleetid}`),
  create: (fleet: IFleetModel) =>
    request.post<IFleetModel>(`${API_URL}/ShipmentSettings/Fleet`, fleet),
  update: (fleet: IFleetModel) =>
    request.put<IFleetModel>(`${API_URL}/ShipmentSettings/Fleet/edit`, fleet),
  delete: (id: string) => request.del<void>(`${API_URL}/ShipmentSettings/Fleet${id}`),
}

// Fleet Request Starts
const Price = {
  list: () => request.get<IPriceModel[]>(`${API_URL}/ShipmentSettings/Price/all`),
  details: (priceid: string) =>
    request.get<IPriceModel>(`${API_URL}/ShipmentSettings/GetPriceById/${priceid}`),
  create: (price: IPriceModel) =>
    request.post<IPriceModel>(`${API_URL}/ShipmentSettings/Price`, price),
  update: (price: IPriceModel) =>
    request.put<IPriceModel>(`${API_URL}/ShipmentSettings/Price/edit`, price),
  delete: (id: string) => request.del<void>(`${API_URL}/ShipmentSettings/Price${id}`),
  getLinePrice: (price: ILinePriceModel) =>
    request.post<ILinePriceModel>(`${API_URL}/ShipmentSettings/PriceSettings`, price),
}

export function axiosPrice(price: ILinePriceModel) {
  const promise = axios.post(`${API_URL}/ShipmentSettings/PriceSettings`, price)
  const dataPromise = promise.then((response) => response.data)
  return dataPromise
}

// Payment Request Starts
const PaymentLog = {
  list: () => request.get<IPaymentLogModel[]>(`${API_URL}/Payment/PaymentLog/all`),
  details: (paymentid: string) =>
    request.get<IPaymentLogModel>(`${API_URL}/Payment/Invoice/all${paymentid}`),
  create: (payment: IPaymentLogModel) =>
    request.post<IPaymentLogModel>(`${API_URL}/Payment/Payment`, payment),
  update: (payment: IPaymentLogModel) =>
    request.put<IPaymentLogModel>(`${API_URL}/Payment/Payment/edit/${payment.PaymentId}`, {}),
  delete: (id: string) => request.del<void>(`${API_URL}/Payment/Payment/delete${id}`),
  makePayment: (paymentCriteria: IPaymentCriteriaModel) =>
    request.post<IPaymentCriteriaModel>(`${API_URL}/Payment/Payment/MakePayment`, paymentCriteria),
}

const Invoice = {
  list: () => request.get<IInvoiceModel[]>(`${API_URL}/Payment/Invoice/all`),
  details: (invoicecode: string) =>
    request.get<IInvoiceModel>(`${API_URL}/Payment/Invoice/GetInvoiceByInvoiceId/${invoicecode}`),
  create: (invoice: IInvoiceModel) =>
    request.post<IInvoiceModel>(`${API_URL}/Payment/Payment`, invoice),
  update: (invoice: IInvoiceModel) =>
    request.put<IInvoiceModel>(`${API_URL}/Payment/Invoice/edit`, invoice),
  delete: (id: string) => request.del<void>(`${API_URL}/Payment/Payment/delete${id}`),
}

// Monitoring Request Starts
const Trip = {
  list: () => request.get<ITripModel[]>(`${API_URL}/Trip/Trip/all`),
  details: (tripid: string) =>
    request.get<ITripModel>(`${API_URL}/Trip/Trip/GetTripByTripId/${tripid}`),
  create: (trip: ITripModel) => request.post<ITripModel>(`${API_URL}/Trip/Trip/Add`, trip),
  update: (trip: ITripModel) => request.put<ITripModel>(`${API_URL}/Trip/Trip/edit/${trip.id}`, {}),
  delete: (id: string) => request.del<void>(`${API_URL}/Trip/Trip/delete${id}`),
  GetDispatchCode: () => request.get<string>(`${API_URL}/Trip/Trip/TripNumber/`),
  GetActionAndStatus: () =>
    request.get<TripActionAndStatusVm>(`${API_URL}/Trip/Trip/ActionAndStatus/`),
  searchTripByRef: (tripRef: string) =>
    request.get<ITripModel[]>(`${API_URL}/Trip/Trip/GetTripByreferencCode/${tripRef}`),
}

const TrackHistory = {
  list: () => request.get<ITrackHistoryModel[]>(`${API_URL}/TrackHistory/TrackHistory/all`),
  details: (trackhistoryid: string) =>
    request.get<ITrackHistoryModel>(
      `${API_URL}/TrackHistory/GetTrackHistoryById/${trackhistoryid}`
    ),
  create: (trackhistory: ITrackHistoryModel) =>
    request.post<ITrackHistoryModel>(`${API_URL}/TrackHistory/TrackHistory`, trackhistory),
  update: (trackhistory: ITrackHistoryModel) =>
    request.put<ITrackHistoryModel>(`${API_URL}/TrackHistory/TrackHistory/edit`, trackhistory),
  delete: (id: string) => request.del<void>(`${API_URL}/UserManagement/GetUser${id}`),
  searrchTrack: (waybill: string) =>
    request.get<ITrackHistoryModel[]>(
      `${API_URL}/TrackHistory/TrackHistory/GetTrackHistoryByCode/${waybill}`
    ),
}
// Fulfilment Request Starts
const CollectionCenter = {
  list: () => request.get<IFulfilmentModel[]>(`${API_URL}/Shipment/CollectionCenter/all`),
  details: (CollectionCenterid: string) =>
    request.get<IFulfilmentModel>(`${API_URL}/UserManagement/GetUser/${CollectionCenterid}`),
  create: (CollectionCenter: IFulfilmentModel) =>
    request.post<IFulfilmentModel>(`${API_URL}/Shipment/CollectionCenter`, CollectionCenter),
  update: (CollectionCenter: IFulfilmentModel) =>
    request.put<IFulfilmentModel>(`${API_URL}/Shipment/CollectionCenter/edit`, CollectionCenter),
  delete: (id: string) => request.del<void>(`${API_URL}/Shipment/CollectionCenter/delete${id}`),
}

const ShipmentRequest = {
  list: () =>
    request.get<IShipmentRequestModel[]>(`${API_URL}/ShipmentRequest/ShipmentRequest/all`),
  details: (ownerId: string) =>
    request.get<IShipmentRequestModel>(`${API_URL}/UserManagement/GetUser/${ownerId}`),
  create: (shipmentrequest: IShipmentRequestModel) =>
    request.post<IShipmentRequestModel>(
      `${API_URL}/ShipmentRequest/ShipmentRequest`,
      shipmentrequest
    ),
  update: (shipmentrequest: IShipmentRequestModel) =>
    request.put<IShipmentRequestModel>(
      `${API_URL}/Shipment/CollectionCenter/edit/${shipmentrequest.shipmentId}`,
      {}
    ),
  delete: (id: string) => request.del<void>(`${API_URL}/Shipment/CollectionCenter/delete${id}`),
}

const agent = {
  Users,
  Roles,
  Route,
  Shipment,
  Permissions,
  Fleet,
  Wallet,
  WalletTransaction,
  Price,
  GroupWayBill,
  PaymentLog,
  Trip,
  CollectionCenter,
  TrackHistory,
  Manifest,
  Invoice,
  ShipmentRequest,
}

export default agent
