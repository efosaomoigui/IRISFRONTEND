import {useEffect, useState} from 'react'
import agent from '../../../../../../setup/axios/AxiosAgent'
import LoadingComponent from '../../../../../LoadingComponent'
import {IUserModel} from '../../../../auth/models/AuthInterfaces'
// import { usersmodel } from '../../../Models/UserModel'
import {getUsers} from '../../../UserManagementCRUD'
import {TablesWidgetUser} from './TablesWidgetUser'

export function ViewUsers() {
  const [loading, setLoading] = useState(true)
  const [usersmodel1, setUsersModel] = useState<IUserModel[]>([])

  // //USE EFFECT HOOK
  useEffect(() => {
    agent.Users.list().then((response) => {
      setUsersModel(response)
      setLoading(false)
    })
  }, [])

  if(loading) return <LoadingComponent content='Loading...' />

  return (
    <div className='row g-5 g-xxl-8'>
      <div className='col-xl-12'>
        <TablesWidgetUser users={usersmodel1} className='mb-5 mb-xl-8' />
      </div>
    </div>
  )
}
