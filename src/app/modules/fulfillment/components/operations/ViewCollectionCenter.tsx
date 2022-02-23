import {useEffect, useState} from 'react'
import agent from '../../../../../setup/axios/AxiosAgent'
import { IrisTablesWidget } from '../../../layout/tables/IrisTablesWidget'
import { madalprops } from '../../../layout/tables/IrisTableTitle'
import { IFulfilmentModel } from '../../models/FulfilmentInterface'
import CollectionCenter_Data from './CollectionCenter_Data.json'
// import {format} from 'date-fns' 

export function CollectionCenter() {
  const [loading, setLoading] = useState(true)
  const [modalTarger, setModalTarget] = useState<madalprops[]>([]);
  const [collectionmodel, setUsersModel] = useState<IFulfilmentModel[]>([])

  //all the data for the table
  const tableProvider = {
    columns: [
      {
        Header: 'Id',
        accessor: 'Id',
      },
      {
        Header: 'ShipmentId',
        accessor: 'ShipmentId',
      },
      {
        Header: 'Shipment',
        accessor: 'Shipment',
      },
      {
        Header: 'Collection Status',
        accessor: 'CollectionStatus',
      },
      {
        Header: 'UserId',
        accessor: 'UserId',
      }
    ],
    DetailsPath: '/fulfillment/collectioncenterdetail/',
    EditPath: '/adminSettings/userDetails/',
    DeletePath: '/adminSettings/userDetails/',
    FakeData: CollectionCenter_Data,
  }

  //Buttons on the table page
  const ModalTarget = [
    {
      linkTitle:'Collection status',
      linkTarget : '#kt_modal_addcollectioncenter'
    }
  ]

  // //USE EFFECT HOOK
  useEffect(() => {
    agent.CollectionCenter.list().then((response) => {
      setUsersModel(response)
      setModalTarget(ModalTarget);
      setLoading(false) 
    })
  }, [])

  const ModalTargetDetails: madalprops = {
    linkTarget : tableProvider.EditPath,
    linkTitle : ""
  }

  // console.log(usersmodel);

  // if (loading) return <LoadingComponent content='Loading...' />

  return (
    <div className='row g-5 g-xxl-8'>
      <div className='col-xl-12'>
        <IrisTablesWidget
          tableData={collectionmodel}
          className='mb-5 mb-xl-8'
          columnsMap={tableProvider.columns}
          DetailsPath={tableProvider.DetailsPath}
          EditPath={tableProvider.EditPath}
          DeletePath={tableProvider.DeletePath}
          UseFakeData={true}
          FakeData={tableProvider.FakeData}
          TableTitle={'Collection Center'}
          Count={'Over 300 Users'}
          ModalTarget={
            modalTarger
          }
        />
      </div>
    </div>
  )
}
