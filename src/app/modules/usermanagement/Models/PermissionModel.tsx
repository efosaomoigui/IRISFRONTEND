import { IPermissionModel } from "../../auth/models/AuthInterfaces";
import { AuthModel } from "../../auth/models/AuthModel";
import { UserAddressModel } from "../../auth/models/UserAddressModel";
import { UserCommunicationModel } from "../../auth/models/UserCommunicationModel";
import { UserEmailSettingsModel } from "../../auth/models/UserEmailSettingsModel";
import { UserSocialNetworksModel } from "../../auth/models/UserSocialNetworksModel";

export const permissionmodel: IPermissionModel[] = 
[
{
  id: "one",
  roleId: "chairman",
  claimType: "claiming",
  claimValue: "string"
},
    {
      id: "one",
      roleId: "chairman",
      claimType: "claiming",
      claimValue: "string"
    }
]