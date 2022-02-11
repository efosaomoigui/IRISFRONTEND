import axios from 'axios'
import { IUserModel } from '../auth/models/AuthInterfaces'


const API_URL = process.env.REACT_APP_API_URL

//Define Api Urls
export const GET_USERS_URL = `${API_URL}/UserManagement/GetUsers`
export const GET_WALLET_URL = `${API_URL}/UserManagement/GetUsers`
export const GET_WALLETTRANSACTION_URL = `${API_URL}/UserManagement/GetUsers`


export function getUserByToken(token: string) {
  return axios.post<IUserModel>(GET_USERS_URL, {
    api_token: token
  })
}

export function getUsers() {
  return axios.get<IUserModel[]>(GET_USERS_URL)
}

export function getUserById(userid: string) {
  return axios.get<IUserModel[]>(GET_USERS_URL)
}
