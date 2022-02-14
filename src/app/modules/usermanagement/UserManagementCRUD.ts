import axios from 'axios'
import { IPermissionModel, IRoleModel, IUserModel } from '../auth/models/AuthInterfaces'
import { IWalletModel, IWalletTransactionModel } from '../walletmanagement/Models/WalletInterfaces'


const API_URL = process.env.REACT_APP_API_URL

//Define Api Urls
export const GET_USERS_URL = `${API_URL}/UserManagement/GetUsers`
export const GET_ROLES_URL = `${API_URL}/UserManagement/GetRoles`
export const GET_PERMISSION_URL = `${API_URL}/UserManagement/AddPermissionToRole`


export function getUserByToken(token:string) {
  return axios.post<IUserModel>(GET_USERS_URL, {
    api_token:token
  })
}

export function getUsers() {
  return axios.get<IUserModel[]>(GET_USERS_URL)
}

export function getUserById(userid : string) {
  return axios.get<IUserModel[]>(GET_USERS_URL)
}


export function getRolesByToken(token: string) {
  return axios.post<IRoleModel>(GET_ROLES_URL, {
    api_token: token
  })
}

export function getRoles() {
  return axios.get<IRoleModel[]>(GET_ROLES_URL)
}

export function getRolesById(roleid: string) {
  return axios.get<IRoleModel[]>(GET_ROLES_URL)
}

export function getPermissionByToken(token: string) {
  return axios.post<IPermissionModel>(GET_PERMISSION_URL, {
    api_token: token
  })
}

export function getPermission() {
  return axios.get<IPermissionModel[]>(GET_PERMISSION_URL)
}

export function getPermissionById(id: string) {
  return axios.get<IPermissionModel[]>(GET_PERMISSION_URL)
}