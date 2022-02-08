import axios from 'axios'
import {IUserModel} from '../models/AuthInterfaces'

const API_URL = process.env.REACT_APP_API_URL

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/UserManagement/GetUser`
export const LOGIN_URL = `${API_URL}/UserManagement/login`
export const REGISTER_URL = `${API_URL}/UserManagement/register`
export const REQUEST_PASSWORD_URL = `${API_URL}/UserManagement/forgot_password`

// Server should return AuthModel
export function login(userName: string, password: string) {
  return axios.post(LOGIN_URL, {
    userName,
    password,
  })
}

// Server should return AuthModel
export function register(email: string, firstname: string, lastname: string, password: string, password_confirmation: string) {
  return axios.post(REGISTER_URL, {
    email,
    first_name: firstname,
    last_name: lastname,
    password, 
    password_confirmation
  })
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return axios.post<{result: boolean}>(REQUEST_PASSWORD_URL, {
    email
  })
}

export function getUserByToken(token:string) {
  return axios.get<IUserModel>(GET_USER_BY_ACCESSTOKEN_URL)
  // return axios.post<IUserModel>(GET_USER_BY_ACCESSTOKEN_URL, {
  //   accessToken:token
  // })
}

