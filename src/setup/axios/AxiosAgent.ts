import axios, { AxiosResponse } from 'axios';
import { IUserModel } from '../../app/modules/auth/models/AuthInterfaces';
import { ShipmentModel } from '../../app/modules/shipmentmanagement/ShipmentModels/ShipmentModel';
import { IFleetModel, IRouteModel } from '../../app/modules/shipmentmanagement/ShipmentModels/ShipmentInterfaces';
import { IconUserModel } from '../../app/modules/profile/ProfileModels';
import { resolve } from 'path';
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
  details: (userid:string) => requests.get<ShipmentModel>(`API_URL}/UserManagement/GetUser/${userid}`), 
  create: (users:IUserModel) => requests.post<IUserModel>(`API_URL}/UserManagement/GetUsers`, users), 
  update: (users:IUserModel) => requests.put<IUserModel>(`API_URL}/UserManagement/GetUser${users.userId}`, {}), 
  delete: (id:string) => requests.del<void>(`API_URL}/UserManagement/GetUser${id}`), 
}

// Users Request Starts
const  Shipment = {
  list: () => requests.get<IUserModel[]>(`${API_URL}/UserManagement/GetUsers`),
  details: (userid:string) => requests.get<ShipmentModel>(`API_URL}/UserManagement/GetUser/${userid}`), 
  create: (users:IUserModel) => requests.post<IUserModel>(`API_URL}/UserManagement/GetUsers`, users), 
  update: (users:IUserModel) => requests.put<IUserModel>(`API_URL}/UserManagement/GetUser${users.userId}`, {}), 
  delete: (id:string) => requests.del<void>(`API_URL}/UserManagement/GetUser${id}`), 
}

// Route Request Starts
const  Route = {
  list: () => requests.get<IUserModel[]>(`${API_URL}/UserManagement/GetUsers`),
  details: (userid:string) => requests.get<ShipmentModel>(`API_URL}/UserManagement/GetUser/${userid}`), 
  create: (users:IUserModel) => requests.post<IUserModel>(`API_URL}/UserManagement/GetUsers`, users), 
  update: (users:IUserModel) => requests.put<IUserModel>(`API_URL}/UserManagement/GetUser${users.userId}`, {}), 
  delete: (id:string) => requests.del<void>(`API_URL}/UserManagement/GetUser${id}`), 
}

// Fleet Request Starts
const  Fleet = {
  list: () => requests.get<IUserModel[]>(`${API_URL}/UserManagement/GetUsers`),
  details: (userid:string) => requests.get<ShipmentModel>(`API_URL}/UserManagement/GetUser/${userid}`), 
  create: (users:IUserModel) => requests.post<IUserModel>(`API_URL}/UserManagement/GetUsers`, users), 
  update: (users:IUserModel) => requests.put<IUserModel>(`API_URL}/UserManagement/GetUser${users.userId}`, {}), 
  delete: (id:string) => requests.del<void>(`API_URL}/UserManagement/GetUser${id}`),  
}

// Payment Request Starts
const  PaymentLog = {
  list: () => requests.get<IUserModel[]>(`${API_URL}/UserManagement/GetUsers`),
  details: (userid:string) => requests.get<ShipmentModel>(`API_URL}/UserManagement/GetUser/${userid}`), 
  create: (users:IUserModel) => requests.post<IUserModel>(`API_URL}/UserManagement/GetUsers`, users), 
  update: (users:IUserModel) => requests.put<IUserModel>(`API_URL}/UserManagement/GetUser${users.userId}`, {}), 
  delete: (id:string) => requests.del<void>(`API_URL}/UserManagement/GetUser${id}`), 
}

// Monitoring Request Starts
const  Monitoring = {
  list: () => requests.get<IUserModel[]>(`${API_URL}/UserManagement/GetUsers`),
  details: (userid:string) => requests.get<ShipmentModel>(`API_URL}/UserManagement/GetUser/${userid}`), 
  create: (users:IUserModel) => requests.post<IUserModel>(`API_URL}/UserManagement/GetUsers`, users), 
  update: (users:IUserModel) => requests.put<IUserModel>(`API_URL}/UserManagement/GetUser${users.userId}`, {}), 
  delete: (id:string) => requests.del<void>(`API_URL}/UserManagement/GetUser${id}`), 
}


const agent = {
  Users,
  Route,
  Fleet,
  PaymentLog,
  Monitoring
}

export default agent;
