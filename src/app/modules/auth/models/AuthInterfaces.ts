export interface IUserModel {
  userId?: string
  userName?: string
  password?: string
  firstName: string
  lastName: string
  email?: string 
  phoneNumber: string
  gender?: string
  age?: string
  userType?: string
  designation?: string
  department?: string
  pictureUrl?: string
  isActive?: boolean
  organisation?: string
  status?: number
  dateCreated?: string
  dateModified?: string
  isDeleted?: string
  systemUserId?: string
  systemUserRole?: string
  passwordExpireDate?: string
  identificationImage?: string
  walletNumber?: string
  message?:string
  validationErrors?: string[]
  userdto?: {}
  //Error:  {"userdto":null,"success":true,"message":null,"validationErrors":["Unable to create user, User already exist!"],"accessToken":null,"expireAt":"0001-01-01T00:00:00"}
}

export interface IRoleModel {
  id: string
  name: string
}

export interface IPermissionModel {
  roleId: string
  claimType: string 
  claimValue: string
}
