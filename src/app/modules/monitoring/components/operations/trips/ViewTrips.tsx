import { useEffect, useState } from 'react'
import agent from '../../../../../../setup/axios/AxiosAgent'
import { IrisTablesWidget } from '../../../../layout/tables/IrisTablesWidget'
import { madalprops } from '../../../../layout/tables/IrisTableTitle'
import { ITripModel } from '../../../Monitor models/MonitorInterface'
import ViewTrips_Data from './ViewTrips_Data.json'
// import {format} from 'date-fns' 

export function ViewTrips() {
  const [loading, setLoading] = useState(true)
  const [modalTarger, setModalTarget] = useState<madalprops[]>([]);
  const [tripmodel, setUsersModel] = useState<ITripModel[]>([])

  //all the data for the table
  const tableProvider = {
    columns: [
      {
        Header: 'Trip Reference',
        accessor: 'TripReference',
      },
      {
        Header: 'Route Code',
        accessor: 'RouteCode ',
      },
      {
        Header: 'Fleet Id',
        accessor: 'fleetid ',
      },
      {
        Header: 'Fleet',
        accessor: 'fleet ',
      },
      {
        Header: 'Manifest Id',
        accessor: 'ManifestId ',
      },
      {
        Header: 'Manifest',
        accessor: 'manifest  ',
      },
      {
        Header: 'Driver',
        accessor: 'Driver  ',
      },
      {
        Header: 'Dispatcher',
        accessor: 'Dispatcher  ',
      },
     
    
    ],
    DetailsPath: '/adminSettings/userDetails/',
    EditPath: '/adminSettings/userDetails/',
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

  // //USE EFFECT HOOK
  useEffect(() => {
    agent.Trip.list().then((response) => {
      setUsersModel(response)
      setModalTarget(ModalTarget);
      setLoading(false)
    })
  }, [])

  // console.log(usersmodel);

  // if (loading) return <LoadingComponent content='Loading...' />

  return (
    <div className='row g-5 g-xxl-8'>
      <div className='col-xl-24'>
        <IrisTablesWidget
          tableData={tripmodel}
          className='mb-5 mb-xl-8'
          columnsMap={tableProvider.columns}
          DetailsPath={tableProvider.DetailsPath}
          EditPath={tableProvider.EditPath}
          DeletePath={tableProvider.DeletePath}
          UseFakeData={true}
          FakeData={tableProvider.FakeData}
          TableTitle={'Trips'}
          Count={'Over 300 Users'}
          ModalTarget={
            modalTarger
          }
        />
      </div>
    </div>
  )
}
