export interface IUserModel {
  userId: string
  userName?: string
  password?: string
  firstName: string
  lastName: string
  email: string
  phonenumber?: string
  age?: string
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
}

export interface IRoleModel {
  id: string
  name: string
}

export interface IPermissionModel {
  id: string
  roleId: string
  PermissionId: string
  PermissionType: string
  Permission: string
}
