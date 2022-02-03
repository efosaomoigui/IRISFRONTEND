import { IUserModel } from '../../../../auth/models/AuthInterfaces'
import { usersmodel } from '../../../Models/UserModel'
import { TablesWidgetUser } from './TablesWidgetUser'

export function ViewUsers() {
  return (
    <div className='row g-5 g-xxl-8'>
      <div className='col-xl-12'>
        <TablesWidgetUser users={usersmodel} className='mb-5 mb-xl-8' />
      </div>
    </div>
  )
}
