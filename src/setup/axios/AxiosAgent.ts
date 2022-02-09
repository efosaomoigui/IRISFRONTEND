import axios, { AxiosResponse } from 'axios';
import { IPermissionModel, IRoleModel, IUserModel } from '../../app/modules/auth/models/AuthInterfaces';
import { IPaymentModel } from '../../app/modules/payment/PaymentModels/PaymentModel';
import { IFleetModel, IRouteModel } from '../../app/modules/shipmentmanagement/ShipmentModels/ShipmentInterfaces';
import { ShipmentModel } from '../../app/modules/shipmentmanagement/ShipmentModels/ShipmentModel';
import { IWalletModel, IWalletTransactionModel } from '../../app/modules/walletmanagement/Models/WalletInterfaces';

// import { ILogPaymentModel } from '../../app/modules/payment/PaymentModels/LogPaymentModel';

const responseBody =<T>(response : AxiosResponse<T>) => response.data;
const API_URL = process.env.REACT_APP_API_URL

const sleep = (delay: number) => 
{
  return new Promise((resolve) =>{
    setTimeout(resolve, delay);
  })
}

//show loader when request is delaying
axios.interceptors.response.use(response => {
  return sleep(1000)
  .then(() =>{
    return response;
  })
  .catch((error)=>{
    console.log(error);
    return Promise.reject(error);
  });
});

const requests = {
    get : <T>(url: string) => axios.get<T>(url).then(responseBody),
    post : <T>(url: string, body : {}) => axios.post<T>(url, body).then(responseBody),
    put : <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del : <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

// Users Request Starts
const  Users = {
  list: () => requests.get<IUserModel[]>(`${API_URL}/UserManagement/GetUsers`),
  details: (userid: string) => requests.get<IUserModel>(`${API_URL}/UserManagement/GetUser/${userid}`), 
  create: (users:IUserModel) => requests.post<IUserModel>(`${API_URL}/UserManagement/Register`, users), 
  update: (users:IUserModel) => requests.put<IUserModel>(`${API_URL}/UserManagement/GetUser/${users.userId}`, {}), 
  delete: (id:string) => requests.del<void>(`${API_URL}/UserManagement/GetUser${id}`), 
}
const Roles = {
  list: () => requests.get<IRoleModel[]>(`${API_URL}/UserManagement/GetRoles`),
  details: (roleid: string) => requests.get<IRoleModel>(`${API_URL}/UserManagement/GetRoles/${roleid}`),
  create: (roles: IRoleModel) => requests.post<IRoleModel>(`${API_URL}/UserManagement/AddRole`, roles),
  update: (roles: IRoleModel) => requests.put<IRoleModel>(`${API_URL}/UserManagement/GetUser/${roles.id}`, {}),
  delete: (id: string) => requests.del<void>(`${API_URL}/UserManagement/GetUser${id}`),
}
const Permissions = {
  list: () => requests.get<IPermissionModel[]>(`${API_URL}/UserManagement/GetPermission`),
  details: (permissionid: string) => requests.get<IPermissionModel>(`${API_URL}/UserManagement/GetPermission/${permissionid}`),
  create: (permission: IPermissionModel) => requests.post<IPermissionModel>(`${API_URL}/UserManagement/AddPermissionToRole`, permission),
  update: (permission: IPermissionModel) => requests.put<IPermissionModel>(`${API_URL}/UserManagement/GetUser/${permission.id}`, {}),
  delete: (id: string) => requests.del<void>(`${API_URL}/UserManagement/GetUser${id}`),
}

// wallet Starts here
const  Wallet = {
  list: () => requests.get<IWalletModel[]>(`${API_URL}/Wallet/WalletNumber/all`),
  details: (walletid: string) => requests.get<IWalletModel>(`${API_URL}/Wallet/WalletNumber/all/${walletid}`), 
  create: (wallet: IWalletModel) => requests.post<IWalletModel>(`${API_URL}/Wallet/WalletNumber/`, wallet), 
  update: (wallet: IWalletModel) => requests.put<IWalletModel>(`${API_URL}/Wallet/WalletNumber/${wallet.walletNumberId}`, {}), 
  delete: (id: string) => requests.del<void>(`${API_URL}/Wallet/WalletNumber${id}`), 
}

// wallet transaction Starts here
const WalletTransaction = {
  list: () => requests.get<IWalletTransactionModel[]>(`${API_URL}/Wallet/WalletTransaction/all`),
  details: (walletid: string) => requests.get<IWalletTransactionModel>(`${API_URL}/Wallet/WalletTransaction/all/${walletid}`),
  create: (wallet: IWalletTransactionModel) => requests.post<IWalletTransactionModel>(`${API_URL}/Wallet/WalletTransaction/`, wallet),
  update: (wallet: IWalletTransactionModel) => requests.put<IWalletTransactionModel>(`${API_URL}/Wallet/WalletTransaction/${wallet.walletNumberId}`, {}),
  delete: (id: string) => requests.del<void>(`${API_URL}/Shipment/GetUser${id}`),
}

// Route Request Starts
const  Route = {
  list: () => requests.get<IRouteModel[]>(`${API_URL}/ShipmentSettings/Route/all`),
  details: (routeid: string) => requests.get<IRouteModel>(`${API_URL}/ShipmentSettings/Route/GetRouteById/${routeid}`), 
  create: (route: IRouteModel) => requests.post<IRouteModel>(`${API_URL}/ShipmentSettings/Route`, route), 
  update: (route: IRouteModel) => requests.put<IRouteModel>(`${API_URL}/ShipmentSettings/Route/${route.RouteId}`, {}), 
  delete: (id: string) => requests.del<void>(`${API_URL}/ShipmentSettings/Route/${id}`), 
}

// Fleet Request Starts
const  Fleet = {
  list: () => requests.get<IFleetModel[]>(`${API_URL}/ShipmentSettings/Fleet/all`),
  details: (fleetid: string) => requests.get<IFleetModel>(`${API_URL}/ShipmentSettings/Route/GetFleetById/${fleetid}`), 
  create: (fleet: IFleetModel) => requests.post<IFleetModel>(`${API_URL}/ShipmentSettings/Fleet`, fleet), 
  update: (fleet: IFleetModel) => requests.put<IFleetModel>(`${API_URL}/ShipmentSettings/Fleet/${fleet.FleetId}`, {}), 
  delete: (id: string) => requests.del<void>(`${API_URL}/ShipmentSettings/Fleet${id}`),  
}

// Payment Request Starts
const  PaymentLog = {
  list: () => requests.get<IPaymentModel[]>(`${API_URL}/UserManagement/GetUsers`),
  details: (paymentid: string) => requests.get<IPaymentModel>(`${API_URL}/UserManagement/GetUser/${paymentid}`), 
  create: (payment: IPaymentModel) => requests.post<IPaymentModel>(`${API_URL}/UserManagement/GetUsers`, payment), 
  update: (payment: IPaymentModel) => requests.put<IPaymentModel>(`${API_URL}/UserManagement/GetUser${payment.PaymentId}`, {}), 
  delete: (id:string) => requests.del<void>(`${API_URL}/UserManagement/GetUser${id}`), 
}

// Monitoring Request Starts
const  Monitoring = {
  list: () => requests.get<IUserModel[]>(`${API_URL}/UserManagement/GetUsers`),
  details: (userid:string) => requests.get<ShipmentModel>(`${API_URL}/UserManagement/GetUser/${userid}`), 
  create: (users:IUserModel) => requests.post<IUserModel>(`${API_URL}/UserManagement/GetUsers`, users), 
  update: (users:IUserModel) => requests.put<IUserModel>(`${API_URL}/UserManagement/GetUser${users.userId}`, {}), 
  delete: (id:string) => requests.del<void>(`${API_URL}/UserManagement/GetUser${id}`), 
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
