import axios from 'axios'
import { IUserModel } from '../auth/models/AuthInterfaces'
import { IFleetModel, IRouteModel } from './ShipmentModels/ShipmentInterfaces'


const API_URL = process.env.REACT_APP_API_URL

//Define Api Urls
export const GET_ROUTE_URL = `${API_URL}/ShipmentSettings/Route/all`
// export const GET_FLEET_URL = `${API_URL}/ShipmentSettings/Fleet/all`

export function getRouteByToken(token: string) {
  return axios.post<IRouteModel>(GET_ROUTE_URL, {
    api_token: token
  })
}

export function getRoute() {
  return axios.get<IRouteModel[]>(GET_ROUTE_URL)
}

export function getRouteById(routeid: string) {
  return axios.get<IRouteModel[]>(GET_ROUTE_URL)
}


// export function getFleetByToken(token: string) {
//   return axios.post<IFleetModel>(GET_FLEET_URL, {
//     api_token: token
//   })
// }

// export function getFleet() {
//   return axios.get<IFleetModel[]>(GET_FLEET_URL)
// }

// export function getFleetById(fleetid: string) {
//   return axios.get<IFleetModel[]>(GET_FLEET_URL)
// }