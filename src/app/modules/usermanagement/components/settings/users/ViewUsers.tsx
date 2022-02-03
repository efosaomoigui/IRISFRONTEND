import { UserModel } from '../../../../auth/models/UserModel'
import { TablesWidgetUser } from './TablesWidgetUser'

const users:UserModel[] = [
  {
    userId: "Efosa",
    firstName: "Efosa",
    lastName: "Efosa",
    email: "Efosa",
    age: "Efosa",
    designation: "Efosa",
    department: "Efosa",
    pictureUrl: "Efosa",
    isActive: "Efosa",
    organisation: "Efosa",
    status: "Efosa",
    dateCreated: "Efosa",
    dateModified: "Efosa",
    isDeleted: "Efosa",
    systemUserId: "Efosa",
    systemUserRole: "Efosa",
    passwordExpireDate: "Efosa",
    identificationImage: "Efosa",
    walletNumber: "Efosa", 
  }
]

export function ViewUsers() {
  return (
    <div className='row g-5 g-xxl-8'>
      <div className='col-xl-12'>
        <TablesWidgetUser users={users} className='mb-5 mb-xl-8' />
      </div>
    </div>
  )
}
