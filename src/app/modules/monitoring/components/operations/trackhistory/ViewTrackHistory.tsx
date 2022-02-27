import { useEffect, useState } from 'react'
import agent from '../../../../../../setup/axios/AxiosAgent'
import { IUserModel } from '../../../../auth/models/AuthInterfaces'
import { IrisTablesWidget } from '../../../../layout/tables/IrisTablesWidget'
import { madalprops } from '../../../../layout/tables/IrisTableTitle'
import { ITrackHistoryModel, ITripModel } from '../../../Monitor models/MonitorInterface'
import TrackHistory_Data from './TrackHistory_Data.json'
// import {format} from 'date-fns' 

export function ViewTrackHistory() {
  const [loading, setLoading] = useState(true)
  const [modalTarger, setModalTarget] = useState<madalprops[]>([]);
  const [trackhistorymodel, setUsersModel] = useState<ITrackHistoryModel[]>([])

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
      linkTarget: '#kt_modal_addtrackhistory'
    }
  ]

  const ModalTargetDetails: madalprops = {
    linkTarget: tableProvider.EditPath,
    linkTitle: ""
  }

  // //USE EFFECT HOOK
  useEffect(() => {
    agent.TrackHistory.list().then((response) => {
      setUsersModel(response)
      setModalTarget(ModalTarget);
      setLoading(true)
    })
  }, [])

  // console.log(usersmodel);

  // if (loading) return <LoadingComponent content='Loading...' />

  return (
    <div className='row g-5 g-xxl-8'>
      <div className='col-xl-12'>
        <IrisTablesWidget
          tableData={trackhistorymodel}
          className='mb-5 mb-xl-8'
          columnsMap={tableProvider.columns}
          DetailsPath={tableProvider.DetailsPath}
          EditPath={tableProvider.EditPath}
          DeletePath={tableProvider.DeletePath}
          UseFakeData={true}
          FakeData={tableProvider.FakeData}
          TableTitle={'Track History'}
          Count={'Over 300 Users'}
          ModalTarget={
            modalTarger
          }
        />
      </div>
    </div>
  )
}
