import { AuthModel } from "../../auth/models/AuthModel";
import { UserAddressModel } from "../../auth/models/UserAddressModel";
import { UserCommunicationModel } from "../../auth/models/UserCommunicationModel";
import { UserEmailSettingsModel } from "../../auth/models/UserEmailSettingsModel";
import { UserSocialNetworksModel } from "../../auth/models/UserSocialNetworksModel";

export interface ShipmentModel 
{
  ShipmentId:string
  Waybill:string
  Customer:string
  GrandTotal:string
  CustomerAddress:string
  Reciever:string
  RecieverAddress:string
  PickupOptions:string
  ShipmentItems:string
  ServiceCenterId:string
}

