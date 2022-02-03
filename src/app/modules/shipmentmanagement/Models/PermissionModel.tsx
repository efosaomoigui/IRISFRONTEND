import { AuthModel } from "../../auth/models/AuthModel";
import { UserAddressModel } from "../../auth/models/UserAddressModel";
import { UserCommunicationModel } from "../../auth/models/UserCommunicationModel";
import { UserEmailSettingsModel } from "../../auth/models/UserEmailSettingsModel";
import { UserSocialNetworksModel } from "../../auth/models/UserSocialNetworksModel";

export interface PermissionModel {
  id: number
  username: string
  password: string | undefined
  email: string
  first_name: string
  last_name: string
  fullname?: string
  occupation?: string
  companyName?: string
  phone?: string
  roles?: Array<number>
  pic?: string
  language?: 'en' | 'de' | 'es' | 'fr' | 'ja' | 'zh' | 'ru'
  timeZone?: string
  website?: 'https://keenthemes.com'
  emailSettings?: UserEmailSettingsModel
  auth?: AuthModel
  communication?: UserCommunicationModel
  address?: UserAddressModel
  socialNetworks?: UserSocialNetworksModel
}
