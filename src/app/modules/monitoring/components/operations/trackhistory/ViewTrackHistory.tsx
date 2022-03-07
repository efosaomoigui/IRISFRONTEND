import {useEffect, useState} from 'react'
import agent from '../../../../../../setup/axios/AxiosAgent'
import {IUserModel} from '../../../../auth/models/AuthInterfaces'
import {IrisTablesWidget} from '../../../../layout/tables/IrisTablesWidget'
import {modalprops} from '../../../../layout/tables/IrisTableTitle'
import {ITrackHistoryModel, ITripModel} from '../../../Monitor models/MonitorInterface'
import TrackHistory_Data from './TrackHistory_Data.json'
// import {format} from 'date-fns'

export function ViewTrackHistory() {
  const [loading, setLoading] = useState(true)
  const [modalTarger, setModalTarget] = useState<modalprops[]>([])
  const [trackhistorymodel, setUsersModel] = useState<ITrackHistoryModel[]>([])
  const [loadingData, setLoadingData] = useState(true)

  //all the data for the table
  const tableProvider = {
    columns: [
      {
        Header: 'Id',
        accessor: 'id',
      },
      {
        Header: 'TripId',
        accessor: 'TripId',
      },
      {
        Header: 'Trip',
        accessor: 'Trip',
      },
      {
        Header: 'Action',
        accessor: 'Action',
      },
      {
        Header: 'Locaton',
        accessor: 'Locaton',
      },
      {
        Header: 'TimeStamp',
        accessor: 'TimeStamp',
      },
      {
        Header: 'Status',
        accessor: 'Status',
      },
    ],
    DetailsPath: '/monitor/trackHistoryDetails/',
    EditPath: '#kt_modal_addtrackhistory',
    DeletePath: '/adminSettings/userDetails/',
    FakeData: TrackHistory_Data,
  }

  //Buttons on the table page
  const ModalTarget = [
    {
      linkTitle: 'Add Track History',
      linkTarget: '#kt_modal_addtrackhistory',
    },
  ]
  // //USE EFFECT HOOK
  useEffect(() => {
    const callFunc = async () => {
      await agent.TrackHistory.list().then((response) => {
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
          <p>Loading Please wait...</p>
        ) : (
          <IrisTablesWidget
            tableData={trackhistorymodel}
            className='mb-5 mb-xl-8'
            columnsMap={tableProvider.columns}
            DetailsPath={tableProvider.DetailsPath}
            EditPath={tableProvider.EditPath}
            DeletePath={tableProvider.DeletePath}
            UseFakeData={false}
            FakeData={tableProvider.FakeData}
            TableTitle={'Track History'}
            Count={'Over 300 Users'}
            ModalTarget={modalTarger}
          />
        )}
      </div>
    </div>
  )
}
