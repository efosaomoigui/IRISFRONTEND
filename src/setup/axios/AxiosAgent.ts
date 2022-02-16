import axios, { AxiosResponse } from 'axios';
import { IPermissionModel, IRoleModel, IUserModel } from '../../app/modules/auth/models/AuthInterfaces';
import { IFulfilmentModel } from '../../app/modules/fulfillment/models/FulfilmentInterface';
import { ITrackHistoryModel, ITripModel } from '../../app/modules/monitoring/Monitor models/MonitorInterface';


import { IPaymentModel } from '../../app/modules/payment/PaymentModels/PaymentModel';
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
//   return sleep(1000)
//   .then(() =>{
//     return response;
//   })
//   .catch((error)=>{
//     console.log(error);
//     return Promise.reject(error);
//   });
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
  details: (roleid: string) => request.get<IRoleModel>(`${API_URL}/UserManagement/GetRoles/${roleid}`),
  create: (roles: IRoleModel) => request.post<IRoleModel>(`${API_URL}/UserManagement/AddRole`, roles),
  update: (roles: IRoleModel) => request.put<IRoleModel>(`${API_URL}/UserManagement/GetUser/${roles.id}`, {}),
  delete: (id: string) => request.del<void>(`${API_URL}/UserManagement/GetUser${id}`),
}
const Permissions = {
  list: () => request.get<IPermissionModel[]>(`${API_URL}/UserManagement/GetPermission`),
  details: (permissionid: string) => request.get<IPermissionModel>(`${API_URL}/UserManagement/GetPermission/${permissionid}`),
  create: (permission: IPermissionModel) => request.post<IPermissionModel>(`${API_URL}/UserManagement/AddPermissionToRole`, permission),
  update: (permission: IPermissionModel) => request.put<IPermissionModel>(`${API_URL}/UserManagement/GetUser/${permission.id}`, {}),
  delete: (id: string) => request.del<void>(`${API_URL}/UserManagement/GetUser${id}`),
}

// wallet Starts here
const  Wallet = {
  list: () => request.get<IWalletModel[]>(`${API_URL}/Wallet/WalletNumber/all`),
  details: (walletid: string) => request.get<IWalletModel>(`${API_URL}/Wallet/WalletNumber/all/${walletid}`), 
  create: (wallet: IWalletModel) => request.post<IWalletModel>(`${API_URL}/Wallet/WalletNumber/`, wallet), 
  update: (wallet: IWalletModel) => request.put<IWalletModel>(`${API_URL}/Wallet/WalletNumber/${wallet.walletNumberId}`, {}), 
  delete: (id: string) => request.del<void>(`${API_URL}/Wallet/WalletNumber${id}`), 
}

// wallet transaction Starts here
const WalletTransaction = {
  list: () => request.get<IWalletTransactionModel[]>(`${API_URL}/Wallet/WalletTransaction/all`),
  details: (walletid: string) => request.get<IWalletTransactionModel>(`${API_URL}/Wallet/WalletTransaction/all/${walletid}`),
  create: (wallet: IWalletTransactionModel) => request.post<IWalletTransactionModel>(`${API_URL}/Wallet/WalletTransaction/`, wallet),
  update: (wallet: IWalletTransactionModel) => request.put<IWalletTransactionModel>(`${API_URL}/Wallet/WalletTransaction/${wallet.walletNumberId}`, {}),
  delete: (id: string) => request.del<void>(`${API_URL}/Shipment/GetUser${id}`),
}

// Route Request Starts
const  Route = {
  list: () => request.get<IRouteModel[]>(`${API_URL}/ShipmentSettings/Route/all`),
  details: (routeid: string) => request.get<IRouteModel>(`${API_URL}/ShipmentSettings/Route/GetRouteById/${routeid}`), 
  create: (route: IRouteModel) => request.post<IRouteModel>(`${API_URL}/ShipmentSettings/Route`, route), 
  update: (route: IRouteModel) => request.put<IRouteModel>(`${API_URL}/ShipmentSettings/Route/${route.RouteId}`, {}), 
  delete: (id: string) => request.del<void>(`${API_URL}/ShipmentSettings/Route/${id}`), 
}

// Shipment Request Starts
const  Shipment = {
  list: () => request.get<IShipmentModel[]>(`${API_URL}/ShipmentSettings/Route/all`),
  details: (shipmentid: string) => request.get<IShipmentModel>(`${API_URL}/ShipmentSettings/Route/GetRouteById/${shipmentid}`), 
  create: (shipment: IShipmentModel) => request.post<IShipmentModel>(`${API_URL}/ShipmentSettings/Route`, shipment), 
  update: (shipment: IShipmentModel) => request.put<IRouteModel>(`${API_URL}/ShipmentSettings/Route/${shipment.ShipmentId}`, {}), 
  delete: (id: string) => request.del<void>(`${API_URL}/ShipmentSettings/Route/${id}`), 
}
const Manifest = {
  list: () => request.get<IManifestModel[]>(`${API_URL}/Shipment/Shipment/all`),
  details: (manifestid: string) => request.get<IManifestModel>(`${API_URL}/Shipment/Shipment/GetShipmentById/${manifestid}`),
  create: (manifest: IManifestModel) => request.post<IManifestModel>(`${API_URL}/Shipment/Shipment`, manifest),
  update: (manifest: IManifestModel) => request.put<IManifestModel>(`${API_URL}/Shipment/Shipment/${manifest.Id}`, {}),
  delete: (id: string) => request.del<void>(`${API_URL}/Shipment/Shipment/${id}`),
}

// Fleet Request Starts
const  Fleet = {
  list: () => request.get<IFleetModel[]>(`${API_URL}/ShipmentSettings/Fleet/all`),
  details: (fleetid: string) => request.get<IFleetModel>(`${API_URL}/ShipmentSettings/Route/GetFleetById/${fleetid}`), 
  create: (fleet: IFleetModel) => request.post<IFleetModel>(`${API_URL}/ShipmentSettings/Fleet`, fleet), 
  update: (fleet: IFleetModel) => request.put<IFleetModel>(`${API_URL}/ShipmentSettings/Fleet/${fleet.FleetId}`, {}), 
  delete: (id: string) => request.del<void>(`${API_URL}/ShipmentSettings/Fleet${id}`),  
}

// Fleet Request Starts
const  Price = {
  list: () => request.get<IPriceModel[]>(`${API_URL}/ShipmentSettings/Fleet/all`),
  details: (id: string) => request.get<IPriceModel>(`${API_URL}/ShipmentSettings/Route/GetFleetById/${id}`), 
  create: (price: IPriceModel) => request.post<IPriceModel>(`${API_URL}/ShipmentSettings/Fleet`, price), 
  update: (price: IPriceModel) => request.put<IPriceModel>(`${API_URL}/ShipmentSettings/Fleet/${price.id}`, {}), 
  delete: (id: string) => request.del<void>(`${API_URL}/ShipmentSettings/Fleet${id}`),  
}

// Payment Request Starts
const  PaymentLog = {
  list: () => request.get<IPaymentModel[]>(`${API_URL}/UserManagement/GetUsers`),
  details: (paymentid: string) => request.get<IPaymentModel>(`${API_URL}/UserManagement/GetUser/${paymentid}`), 
  create: (payment: IPaymentModel) => request.post<IPaymentModel>(`${API_URL}/UserManagement/GetUsers`, payment), 
  update: (payment: IPaymentModel) => request.put<IPaymentModel>(`${API_URL}/UserManagement/GetUser${payment.PaymentId}`, {}), 
  delete: (id:string) => request.del<void>(`${API_URL}/UserManagement/GetUser${id}`), 
}

// Monitoring Request Starts
const  Trip = {
  list: () => request.get<ITripModel[]>(`${API_URL}/UserManagement/GetUsers`),
  details: (tripid: string) => request.get<ITripModel>(`${API_URL}/UserManagement/GetUser/${tripid}`), 
  create: (trip: ITripModel) => request.post<ITripModel>(`${API_URL}/UserManagement/GetUsers`, trip), 
  update: (trip: ITripModel) => request.put<ITripModel>(`${API_URL}/UserManagement/GetUser${trip.id}`, {}), 
  delete: (id: string) => request.del<void>(`${API_URL}/UserManagement/GetUser${id}`), 
}

const TrackHistory = {
  list: () => request.get<ITrackHistoryModel[]>(`${API_URL}/Monitoring/GetUsers`),
  details: (trackhistoryid: string) => request.get<ITrackHistoryModel>(`${API_URL}/Monitoring/GetUser/${trackhistoryid}`),
  create: (trackhistory: ITrackHistoryModel) => request.post<ITrackHistoryModel>(`${API_URL}/Monitoring/GetUsers`, trackhistory),
  update: (trackhistory: ITrackHistoryModel) => request.put<ITrackHistoryModel>(`${API_URL}/Monitoring/GetUser${trackhistory.id}`, {}),
  delete: (id: string) => request.del<void>(`${API_URL}/Monitoring/GetUser${id}`),
}
// Fulfilment Request Starts
const CollectionCenter = {
  list: () => request.get<IFulfilmentModel[]>(`${API_URL}/UserManagement/GetUsers`),
  details: (CollectionCenterid: string) => request.get<ShipmentModel>(`${API_URL}/UserManagement/GetUser/${CollectionCenterid}`),
  create: (CollectionCenter: IFulfilmentModel) => request.post<IFulfilmentModel>(`${API_URL}/UserManagement/GetUsers`, CollectionCenter),
  update: (CollectionCenter: IFulfilmentModel) => request.put<IFulfilmentModel>(`${API_URL}/UserManagement/GetUser${CollectionCenter.Id}`, {}),
  delete: (id: string) => request.del<void>(`${API_URL}/UserManagement/GetUser${id}`),
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
  Manifest
}

export default agent;
