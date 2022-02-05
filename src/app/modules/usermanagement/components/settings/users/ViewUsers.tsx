import { useEffect, useState } from 'react';
import { IUserModel } from '../../../../auth/models/AuthInterfaces';
// import { usersmodel } from '../../../Models/UserModel'
import { getUsers } from '../../../UserManagementCRUD';
import { TablesWidgetUser } from './TablesWidgetUser'

export function ViewUsers() {

  const [usersmodel1, setUsersModel] = useState<IUserModel[]>([]);

  // //USE EFFECT HOOK
  useEffect(() => {
    const requestUser = async () => {
      await getUsers()
      .then(({data})=>{
        setUsersModel(data);
        
      }).
      then(()=>{
        console.log("ERROR: ", "The was unableto return any data");
      });
    }

    requestUser();

  }, []);

  return (
    <div className='row g-5 g-xxl-8'>
      <div className='col-xl-12'>
        <TablesWidgetUser users={usersmodel1} className='mb-5 mb-xl-8' />
      </div>
    </div>
  )
}
