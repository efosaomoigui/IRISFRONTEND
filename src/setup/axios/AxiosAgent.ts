import axios, { AxiosResponse } from 'axios';
import { IPermissionModel, IRoleModel, IUserModel } from '../../app/modules/auth/models/AuthInterfaces';
import { ShipmentModel } from '../../app/modules/shipmentmanagement/ShipmentModels/ShipmentModel';
import { IFleetModel, IRouteModel } from '../../app/modules/shipmentmanagement/ShipmentModels/ShipmentInterfaces';
import { IconUserModel } from '../../app/modules/profile/ProfileModels';
import { resolve } from 'path';
import { IPaymentModel } from '../../app/modules/payment/PaymentModels/PaymentModel';
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

// Fleet Request Starts
const  Fleet = {
  list: () => request.get<IFleetModel[]>(`${API_URL}/ShipmentSettings/Fleet/all`),
  details: (fleetid: string) => request.get<IFleetModel>(`${API_URL}/ShipmentSettings/Route/GetFleetById/${fleetid}`), 
  create: (fleet: IFleetModel) => request.post<IFleetModel>(`${API_URL}/ShipmentSettings/Fleet`, fleet), 
  update: (fleet: IFleetModel) => request.put<IFleetModel>(`${API_URL}/ShipmentSettings/Fleet/${fleet.FleetId}`, {}), 
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
const  Monitoring = {
  list: () => request.get<IUserModel[]>(`${API_URL}/UserManagement/GetUsers`),
  details: (userid:string) => request.get<ShipmentModel>(`${API_URL}/UserManagement/GetUser/${userid}`), 
  create: (users:IUserModel) => request.post<IUserModel>(`${API_URL}/UserManagement/GetUsers`, users), 
  update: (users:IUserModel) => request.put<IUserModel>(`${API_URL}/UserManagement/GetUser${users.userId}`, {}), 
  delete: (id:string) => request.del<void>(`${API_URL}/UserManagement/GetUser${id}`), 
}


const agent = {
  Users,
  Roles,
  Route,
  Permissions,
  Fleet,
  Wallet,
  WalletTransaction,
  PaymentLog,
  Monitoring
}

export default agent;
