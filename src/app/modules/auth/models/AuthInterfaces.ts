export interface IUserModel {
  userId?: string
  username?: string
  password?: string
  firstName: string
  lastName: string
  email?: string 
  phoneNumber: string
  gender: string
  age?: string
  userType: number
  pictureUrl?: string 
  organisation?: string 
  status?: number
  dateCreated?: string
  dateModified?: string
  passwordExpireDate?: string
  identificationImage?: string
  walletNumber?: string
  roles?: string[]
  message?:string
  validationErrors?: string[] 
  userdto?: {}
  //Error:  {"userdto":null,"success":true,"message":null,"validationErrors":["Unable to create user, User already exist!"],"accessToken":null,"expireAt":"0001-01-01T00:00:00"}
}

export interface IUserRole{
  userId?:string
  roleId:string[]
  message?:string
  validationErrors?: string[] 
  userdto?: {}
  check?: boolean 
}

export enum UserType{
  Corporate,
  Individual, 
  Partner
}

export enum GenderType{
  Male,
  Female
}

export interface IRoleModel {
  id?: string
  name: string
  message?: string
  validationErrors?: string[]
  roledto?: {}
}

export interface IPermissionModel {
  roleId: string
  claimType: string 
  claimValue: string
  message?: string
  validationErrors?: string[]
  permissiondto?: {}
}
