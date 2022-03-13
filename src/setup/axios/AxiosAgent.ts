import axios, { AxiosResponse } from 'axios';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { IPermissionModel, IRoleModel, IUserModel } from '../../app/modules/auth/models/AuthInterfaces';
import { IFulfilmentModel } from '../../app/modules/fulfillment/models/FulfilmentInterface';
import { ITrackHistoryModel, ITripModel } from '../../app/modules/monitoring/Monitor models/MonitorInterface';
import { IInvoiceModel, IPaymentLogModel } from '../../app/modules/payment/PaymentModels/PaymentmentInterfaces';
import { IFleetModel, IManifestModel, IPriceModel, IRouteModel, IShipmentModel } from '../../app/modules/shipmentmanagement/ShipmentModels/ShipmentInterfaces';
import { ShipmentModel } from '../../app/modules/shipmentmanagement/ShipmentModels/ShipmentModel';
import { IWalletModel, IWalletTransactionModel } from '../../app/modules/walletmanagement/Models/WalletInterfaces';

// import { ILogPaymentModel } from '../../app/modules/payment/PaymentModels/LogPaymentModel';

const responseBody =<T>(response : AxiosResponse<T>) => response.data;
const API_URL = process.env.REACT_APP_API_URL

// const sleep = (delay: number) => 
// {
//   return new Promise((resolve) =>{
//     setTimeout(resolve, delay);
//   })
// }

//show loader when request is delaying
// axios.interceptors.response.use(response => {
//   return response;
// });

// axios.interceptors.response.use(function (response) {
//   return response;
// }, function (error) {
//   if (401 === error.response.status) {
//     toast.error("Sorry, your session has expired, please relogin")
//     window.location.reload();
//     // dispatch(props.logout())
//   } else {
//       return Promise.reject(error);
//   }
// });

const request = {
    get : <T>(url: string) => axios.get<T>(url).then(responseBody),
    post : <T>(url: string, body : {}) => axios.post<T>(url, body).then(responseBody),
    put : <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del : <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

// Users Request Starts
const  Users = {
  list: () => request.get<IUserModel[]>(`${API_URL}/UserManagement/GetUsers`),
  details: (userid: string) => request.get<IUserModel>(`${API_URL}/UserManagement/GetUser/${userid}`), 
  create: (users:IUserModel) => request.post<IUserModel>(`${API_URL}/UserManagement/Register`, users), 
  update: (users:IUserModel) => request.put<IUserModel>(`${API_URL}/UserManagement/GetUser/${users.userId}`, {}), 
  delete: (id:string) => request.del<void>(`${API_URL}/UserManagement/GetUser${id}`), 
}
const Roles = {
  list: () => request.get<IRoleModel[]>(`${API_URL}/UserManagement/GetRoles`),  
  details: (roleid: string) => request.get<IRoleModel>(`${API_URL}/UserManagement/GetRoleById/${roleid}`),
  create: (roles: IRoleModel) => request.post<IRoleModel>(`${API_URL}/UserManagement/AddRole`, roles),
  update: (roles: IRoleModel) => request.put<IRoleModel>(`${API_URL}/UserManagement/GetUser/${roles.id}`, {}),
  delete: (id: string) => request.del<void>(`${API_URL}/UserManagement/GetUser${id}`),
}
const Permissions = {
  list: () => request.get<IPermissionModel[]>(`${API_URL}/UserManagement/GetPermissions`),
  details: (roleId: string) => request.get<IPermissionModel>(`${API_URL}/UserManagement/Permissions/GetPermissionsByRoleId/${roleId}`),
  create: (permission: IPermissionModel) => request.post<IPermissionModel>(`${API_URL}/UserManagement/AddPermissionToRole`, permission),
  update: (permission: IPermissionModel) => request.put<IPermissionModel>(`${API_URL}/UserManagement/GetUser/${permission.roleId}`, {}),
  delete: (id: string) => request.del<void>(`${API_URL}/UserManagement/GetUser${id}`),
}

// wallet Starts here
const  Wallet = {
  list: () => request.get<IWalletModel[]>(`${API_URL}/Wallet/WalletNumber/all`),
  details: (walletid: string) => request.get<IWalletModel>(`${API_URL}/Wallet/Wallets/GetWalletById/${walletid}`), 
  create: (wallet: IWalletModel) => request.post<IWalletModel>(`${API_URL}/Wallet/WalletNumber`, wallet), 
  update: (wallet: IWalletModel) => request.put<IWalletModel>(`${API_URL}/Wallet/WalletNumber/${wallet.id}`, {}), 
  delete: (id: string) => request.del<void>(`${API_URL}/Wallet/WalletNumber${id}`), 
}

// wallet transaction Starts here
const WalletTransaction = {
  list: () => request.get<IWalletTransactionModel[]>(`${API_URL}/Wallet/WalletTransaction/all`),
  details: (wallettransactionid: string) => request.get<IWalletTransactionModel>(`${API_URL}/Wallet/WalletTransaction/GetWalletTransactionById/${wallettransactionid}`),
  create: (wallettransaction: IWalletTransactionModel) => request.post<IWalletTransactionModel>(`${API_URL}/Wallet/WalletTransaction`, wallettransaction),
  update: (wallettransaction: IWalletTransactionModel) => request.put<IWalletTransactionModel>(`${API_URL}/Wallet/WalletTransaction/${wallettransaction.WalletTransactionId}`, {}),
  delete: (id: string) => request.del<void>(`${API_URL}/Shipment/GetUser${id}`),
}

// Route Request Starts
const  Route = {
  list: () => request.get<IRouteModel[]>(`${API_URL}/ShipmentSettings/Route/all`),
  details: (routeid: string) => request.get<IRouteModel>(`${API_URL}/ShipmentSettings/GetRouteById/${routeid}`), 
  create: (route: IRouteModel) => request.post<IRouteModel>(`${API_URL}/ShipmentSettings/Route`, route), 
  update: (route: IRouteModel) => request.put<IRouteModel>(`${API_URL}/ShipmentSettings/Route/${route.routeId}`, {}), 
  delete: (id: string) => request.del<void>(`${API_URL}/ShipmentSettings/Route/${id}`), 
}

// Shipment Request Starts
const  Shipment = {
  list: () => request.get<IShipmentModel[]>(`${API_URL}/Shipment/Shipment/all`),
  details: (shipmentid: string) => request.get<IShipmentModel>(`${API_URL}/Shipment/Shipment/GetShipmentById/${shipmentid}`), 
  create: (shipment: IShipmentModel) => request.post<IShipmentModel>(`${API_URL}/Shipment/Shipment`, shipment), 
  update: (shipment: IShipmentModel) => request.put<IRouteModel>(`${API_URL}/Shipment/Shipment/edit/${shipment.ShipmentId}`, {}), 
  delete: (id: string) => request.del<void>(`${API_URL}/Shipment/Shipment/delete/${id}`), 
}

const Manifest = {
  list: () => request.get<IManifestModel[]>(`${API_URL}/Manifest/Manifest/all`),
  details: (manifestcode: string) => request.get<IManifestModel>(`${API_URL}/api/Manifest/Manifest/GetManifestByManifestCode/${manifestcode}`),
  create: (manifest: IManifestModel) => request.post<IManifestModel>(`${API_URL}/Manifest/Manifest`, manifest),
  update: (manifest: IManifestModel) => request.put<IManifestModel>(`${API_URL}/Manifest/Manifest/edit/${manifest.Id}`, {}),
  delete: (id: string) => request.del<void>(`${API_URL}/Manifest/Manifest/delete/${id}`),
}

// Fleet Request Starts
const  Fleet = {
  list: () => request.get<IFleetModel[]>(`${API_URL}/ShipmentSettings/Fleet/all`),
  details: (fleetid: string) => request.get<IFleetModel>(`${API_URL}/ShipmentSettings/GetFleetById/${fleetid}`), 
  create: (fleet: IFleetModel) => request.post<IFleetModel>(`${API_URL}/ShipmentSettings/Fleet`, fleet), 
  update: (fleet: IFleetModel) => request.put<IFleetModel>(`${API_URL}/ShipmentSettings/Fleet/${fleet.fleetId}`, {}), 
  delete: (id: string) => request.del<void>(`${API_URL}/ShipmentSettings/Fleet${id}`),  
}

// Fleet Request Starts
const  Price = {
  list: () => request.get<IPriceModel[]>(`${API_URL}/ShipmentSettings/Price/all`),
  details: (priceid: string) => request.get<IPriceModel>(`${API_URL}/ShipmentSettings/GetPriceById/${priceid}`), 
  create: (price: IPriceModel) => request.post<IPriceModel>(`${API_URL}/ShipmentSettings/Price`, price), 
  update: (price: IPriceModel) => request.put<IPriceModel>(`${API_URL}/ShipmentSettings/Price/${price.routeId}`, {}), 
  delete: (id: string) => request.del<void>(`${API_URL}/ShipmentSettings/Price${id}`),  
}

// Payment Request Starts
const  PaymentLog = {
  list: () => request.get<IPaymentLogModel[]>(`${API_URL}/Payment/Payment/all`),
  details: (paymentid: string) => request.get<IPaymentLogModel>(`${API_URL}/Payment/Payment/all/${paymentid}`), 
  create: (payment: IPaymentLogModel) => request.post<IPaymentLogModel>(`${API_URL}/Payment/Payment`, payment), 
  update: (payment: IPaymentLogModel) => request.put<IPaymentLogModel>(`${API_URL}/Payment/Payment/edit/${payment.PaymentId}`, {}), 
  delete: (id: string) => request.del<void>(`${API_URL}/Payment/Payment/delete${id}`), 
}

const Invoice = {
  list: () => request.get<IInvoiceModel[]>(`${API_URL}/Payment/Payment/all`),
  details: (invoiceid: string) => request.get<IInvoiceModel>(`${API_URL}/Payment/Invoice/GetInvoiceByInvoiceId/${invoiceid}`),
  create: (invoice: IInvoiceModel) => request.post<IInvoiceModel>(`${API_URL}/Payment/Payment`, invoice),
  update: (invoice: IInvoiceModel) => request.put<IInvoiceModel>(`${API_URL}/Payment/Payment/edit/${invoice.Id}`, {}),
  delete: (id: string) => request.del<void>(`${API_URL}/Payment/Payment/delete${id}`),
}

// Monitoring Request Starts
const  Trip = {
  list: () => request.get<ITripModel[]>(`${API_URL}/Trip/Trip/all`),
  details: (tripid: string) => request.get<ITripModel>(`${API_URL}/Trip/Trip/GetTripByTripId/${tripid}`), 
  create: (trip: ITripModel) => request.post<ITripModel>(`${API_URL}/Trip/Trip/Add`, trip), 
  update: (trip: ITripModel) => request.put<ITripModel>(`${API_URL}/Trip/Trip/edit/${trip.id}`, {}), 
  delete: (id: string) => request.del<void>(`${API_URL}/Trip/Trip/delete${id}`), 
}

const TrackHistory = {
  list: () => request.get<ITrackHistoryModel[]>(`${API_URL}/TrackHistory/TrackHistory/all`),
  details: (tripreference: string) => request.get<ITrackHistoryModel>(`${API_URL}/api/TrackHistory/GetTrackHistoryByTripReference/${tripreference}`),
  create: (trackhistory: ITrackHistoryModel) => request.post<ITrackHistoryModel>(`${API_URL}/TrackHistory/TrackHistory`, trackhistory),
  update: (trackhistory: ITrackHistoryModel) => request.put<ITrackHistoryModel>(`${API_URL}/TrackHistory/TrackHistory/edit/${trackhistory.tripReference}`, {}),
  delete: (id: string) => request.del<void>(`${API_URL}/UserManagement/GetUser${id}`),
}
// Fulfilment Request Starts
const CollectionCenter = {
  list: () => request.get<IFulfilmentModel[]>(`${API_URL}/Shipment/CollectionCenter/all`),
  details: (CollectionCenterid: string) => request.get<IFulfilmentModel>(`${API_URL}/UserManagement/GetUser/${CollectionCenterid}`),
  create: (CollectionCenter: IFulfilmentModel) => request.post<IFulfilmentModel>(`${API_URL}/Shipment/CollectionCenter`, CollectionCenter),
  update: (CollectionCenter: IFulfilmentModel) => request.put<IFulfilmentModel>(`${API_URL}/Shipment/CollectionCenter/edit/${CollectionCenter.Id}`, {}),
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
  PaymentLog,
  Trip,
  CollectionCenter,
  TrackHistory,
  Manifest,
  Invoice
}

export default agent;

function dispatch(arg0: any) {
  throw new Error('Function not implemented.');
}

