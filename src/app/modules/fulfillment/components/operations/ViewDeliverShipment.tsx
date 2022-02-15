import {useEffect, useState} from 'react'
import agent from '../../../../../setup/axios/AxiosAgent'
import { IrisTablesWidget } from '../../../layout/tables/IrisTablesWidget'
import { madalprops } from '../../../layout/tables/IrisTableTitle'
import { IFulfilmentModel } from '../../models/FulfilmentInterface'
import Fulfilment_Data from './Fulfilment_Data.json'
// import {format} from 'date-fns' 

export function DeliverShipment() {
  const [loading, setLoading] = useState(true)
  const [modalTarger, setModalTarget] = useState<madalprops[]>([]);
  const [usersmodel, setUsersModel] = useState<IFulfilmentModel[]>([])

  //all the data for the table
  const tableProvider = {
    columns: [
      {
        Header: 'Wallet Number Id',
        accessor: 'walletNumberId',
      },
      {
        Header: 'Number',
        accessor: 'number',
      },
      {
        Header: 'Active',
        accessor: 'isActive',
      },
      {
        Header: 'User Id',
        accessor: 'userId',
      }
    ],
    DetailsPath: '/adminSettings/userDetails/',
    EditPath: '/adminSettings/userDetails/',
    DeletePath: '/adminSettings/userDetails/',
    FakeData: Fulfilment_Data,
  }

  //Buttons on the table page
  const ModalTarget = [
    {
      linkTitle:'Add User',
      linkTarget : '#kt_modal_adduser'
    }
  ]

  // //USE EFFECT HOOK
  useEffect(() => {
    agent.Fulfilment.list().then((response) => {
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
