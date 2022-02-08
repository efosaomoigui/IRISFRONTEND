import axios, { AxiosResponse } from 'axios';
import { IUserModel } from '../../app/modules/auth/models/AuthInterfaces';
import { ShipmentModel } from '../../app/modules/shipmentmanagement/ShipmentModels/ShipmentModel';
import { IFleetModel, IRouteModel } from '../../app/modules/shipmentmanagement/ShipmentModels/ShipmentInterfaces';
import { IconUserModel } from '../../app/modules/profile/ProfileModels';
import { resolve } from 'path';
import { IPaymentModel } from '../../app/modules/payment/PaymentModels/PaymentModel';
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

// Users Request Starts
const  Shipment = {
  list: () => requests.get<IUserModel[]>(`${API_URL}/api/Shipment/all`),
  details: (shipmentid: string) => requests.get<ShipmentModel>(`${API_URL}/Shipment/GetUser/${shipmentid}`), 
  create: (shipment: ShipmentModel) => requests.post<ShipmentModel>(`${API_URL}/Shipment`, shipment), 
  update: (shipment: ShipmentModel) => requests.put<ShipmentModel>(`${API_URL}/Shipment/GetUser/${shipment.id}`, {}), 
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
  Route,
  Fleet,
  Shipment,
  PaymentLog,
  Monitoring
}

export default agent;
