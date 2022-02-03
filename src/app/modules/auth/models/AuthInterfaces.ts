
export interface IUserModel {
  userId: string
  firstName: string
  lastName: string
  email: string
  age: string
  designation: string
  department: string
  pictureUrl?: string
  isActive: string
  organisation: string
  status: string
  dateCreated: string
  dateModified: string
  isDeleted: string
  systemUserId: string
  systemUserRole: string
  passwordExpireDate: string
  identificationImage: string
  walletNumber: string 
}

export interface IRoleModel {
  id: string
  name: string
}

export interface IPermissionModel {
  id: string
  roleId: string
  claimType: string
  claimValue: string
}

export interface IWalletModel {
  firstName: string
  lastName: string
  walletNumber: string
  walletBalance:string
}


