import {useEffect, useState} from 'react'
import {Spinner} from 'react-bootstrap-v5'
import agent from '../../../../../setup/axios/AxiosAgent'
import {IrisTablesWidget} from '../../../layout/tables/IrisTablesWidget'
import {modalprops} from '../../../layout/tables/IrisTableTitle'
import {IFulfilmentModel} from '../../models/FulfilmentInterface'
import CollectionCenter_Data from './CollectionCenter_Data.json'
// import {format} from 'date-fns'

export function CollectionCenter() {
  const [loading, setLoading] = useState(true)
  const [modalTarger, setModalTarget] = useState<modalprops[]>([])
  const [collectionmodel, setUsersModel] = useState<IFulfilmentModel[]>([])
  const [loadingData, setLoadingData] = useState(true)

  //all the data for the table
  const tableProvider = {
    columns: [
      {
        Header: 'Id',
        accessor: 'id',
      },
      {
        Header: 'ShipmentId',
        accessor: 'shipmentId',
      },
      {
        Header: 'Shipment',
        accessor: 'shipment',
      },
      {
        Header: 'Collection Status',
        accessor: 'collectionStatus',
      },
      {
        Header: 'UserId',
        accessor: 'userId',
      },
    ],
    DetailsPath: '/fulfillment/collectioncenterdetail/',
    EditPath: '#kt_modal_addcollectioncenter',
    DeletePath: '/adminSettings/userDetails/',
    FakeData: CollectionCenter_Data,
  }

  //Buttons on the table page
  const ModalTarget = [
    {
      linkTitle: 'Collection status',
      linkTarget: '#kt_modal_addcollectioncenter',
    },
  ]

  // //USE EFFECT HOOK
  useEffect(() => {
    const callFunc = async () => {
      await agent.CollectionCenter.list().then((response) => {
        setUsersModel(response)
        setModalTarget(ModalTarget)
        setLoadingData(false)
      })
    }
    if (loadingData) {
      callFunc()
    }
  }, [])

  return (
    <div className='row g-5 g-xxl-8'>
      <div className='col-xl-12'>
        {loadingData ? (
          <div>
            <Spinner animation='border' />
          </div>
        ) : (
          <IrisTablesWidget
            tableData={collectionmodel}
            className='mb-5 mb-xl-8'
            columnsMap={tableProvider.columns}
            DetailsPath={tableProvider.DetailsPath}
            EditPath={tableProvider.EditPath}
            DeletePath={tableProvider.DeletePath}
            UseFakeData={false}
            FakeData={tableProvider.FakeData}
            TableTitle={'Collection Center'}
            Count={'Over 300 Users'}
            ModalTarget={modalTarger}
          />
        )}
      </div>
    </div>
  )
}
