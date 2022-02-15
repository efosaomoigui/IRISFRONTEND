import { useEffect, useState } from 'react'
import agent from '../../../../../../setup/axios/AxiosAgent'
import { IUserModel } from '../../../../auth/models/AuthInterfaces'
import { IrisTablesWidget } from '../../../../layout/tables/IrisTablesWidget'
import { madalprops } from '../../../../layout/tables/IrisTableTitle'
import { IAddTrackModel } from '../../../Monitor models/MonitorInterface'
import TrackHistory_Data from './TrackHistory_Data.json'
// import {format} from 'date-fns' 

export function ViewTrackHistory() {
  const [loading, setLoading] = useState(true)
  const [modalTarger, setModalTarget] = useState<madalprops[]>([]);
  const [usersmodel, setUsersModel] = useState<IUserModel[]>([])

  //all the data for the table
  const tableProvider = {
    columns: [
      {
        Header: 'User Id',
        accessor: 'userId',
        // cell:({ value }) => {return format(new Date(value), 'dd/MM/YYYY')}
      },
      {
        Header: 'User Name',
        accessor: 'userName',
      },
      {
        Header: 'First Name',
        accessor: 'firstName',
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Phone Number',
        accessor: 'phoneNumber',
      },
    ],
    DetailsPath: '/adminSettings/userDetails/',
    EditPath: '/adminSettings/userDetails/',
    DeletePath: '/adminSettings/userDetails/',
    FakeData: TrackHistory_Data,
  }

  //Buttons on the table page
  const ModalTarget = [
    {
      linkTitle: 'Add User',
      linkTarget: '#kt_modal_adduser'
    }
  ]

  // //USE EFFECT HOOK
  useEffect(() => {
    agent.Users.list().then((response) => {
      setUsersModel(response)
      setModalTarget(ModalTarget);
      setLoading(false)
    })
  }, [])

  // console.log(usersmodel);

  // if (loading) return <LoadingComponent content='Loading...' />

  return (
    <div className='row g-5 g-xxl-8'>
      <div className='col-xl-12'>
        <IrisTablesWidget
          tableData={usersmodel}
          className='mb-5 mb-xl-8'
          columnsMap={tableProvider.columns}
          DetailsPath={tableProvider.DetailsPath}
          EditPath={tableProvider.EditPath}
          DeletePath={tableProvider.DeletePath}
          UseFakeData={true}
          FakeData={tableProvider.FakeData}
          TableTitle={'User Profile'}
          Count={'Over 300 Users'}
          ModalTarget={
            modalTarger
          }
        />
      </div>
    </div>
  )
}
