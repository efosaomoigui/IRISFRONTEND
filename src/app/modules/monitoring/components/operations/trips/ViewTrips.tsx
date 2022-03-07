import { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap-v5'
import agent from '../../../../../../setup/axios/AxiosAgent'
import LoadingComponent from '../../../../../LoadingComponent'
import { IrisTablesWidget } from '../../../../layout/tables/IrisTablesWidget'
import { modalprops } from '../../../../layout/tables/IrisTableTitle'
import { ITripModel } from '../../../Monitor models/MonitorInterface'
import ViewTrips_Data from './ViewTrips_Data.json'
// import {format} from 'date-fns' 

export function ViewTrips() {
  const [loading, setLoading] = useState(true)
  const [modalTarger, setModalTarget] = useState<modalprops[]>([]);
  const [tripmodel, setUsersModel] = useState<ITripModel[]>([])
  const [loadingData, setLoadingData] = useState(true)


  //all the data for the table
  const tableProvider = {
    columns: [
      {
        Header: 'Trip Id',
        accessor: 'id',
      },
      {
        Header: 'Trip Reference',
        accessor: 'TripReference',
      },
      {
        Header: 'Route Code',
        accessor: 'RouteCode',
      },
      {
        Header: 'Fleet Id',
        accessor: 'fleetid',
      },
      {
        Header: 'Manifest Id',
        accessor: 'ManifestId',
      },
      {
        Header: 'Driver',
        accessor: 'Driver',
      },
      {
        Header: 'Dispatcher',
        accessor: 'Dispatcher',
      },
      {
        Header: 'Driver Dispatch Fee ',
        accessor: 'DriverDispatchFee',
      },

      {
        Header: 'Start Time',
        accessor: 'StartTime',
      },
      {
        Header: 'End Time',
        accessor: 'EndTime',
      },
     
    
    ],
    DetailsPath: '/monitor/tripDetails/',
    EditPath: '#kt_modal_addtrip',
    DeletePath: '/adminSettings/userDetails/',
    FakeData: ViewTrips_Data,
  }

  //Buttons on the table page
  const ModalTarget = [
    {
      linkTitle: 'Add Trip',
      linkTarget: '#kt_modal_addtrip'
    },
  ]

    //USE EFFECT HOOK
    useEffect(() => {
      const callFunc = async () => {
        await agent.Trip.list().then((response) => {
          setUsersModel(response)
          setModalTarget(ModalTarget);
          setLoadingData(false)
        })
      }
      if (loadingData) {
        callFunc()
      }
    }, [])


  return (
    <div className='row g-5 g-xxl-8'>
      <div className='col-xl-24'>
      {loadingData ? (
          <div>
            <Spinner animation='border' />
          </div>
        ) : (
        <IrisTablesWidget
          tableData={tripmodel}
          className='mb-5 mb-xl-8'
          columnsMap={tableProvider.columns}
          DetailsPath={tableProvider.DetailsPath}
          EditPath={tableProvider.EditPath}
          DeletePath={tableProvider.DeletePath}
          UseFakeData={false}
          FakeData={tableProvider.FakeData}
          TableTitle={'Trips'}
          Count={'Over 300 Users'}
          ModalTarget={
            modalTarger
          }
        />
        )}
      </div>
    </div>
  )
}
