import {AuthModel} from './AuthModel'
import {UserAddressModel} from './UserAddressModel'
import {UserCommunicationModel} from './UserCommunicationModel'
import {UserEmailSettingsModel} from './UserEmailSettingsModel'
import {UserSocialNetworksModel} from './UserSocialNetworksModel'

export interface UserModel {
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
