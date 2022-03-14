import { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap-v5'
import agent from '../../../../../../setup/axios/AxiosAgent'
import { usePageData } from '../../../../../../_iris/layout/core'
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
  const { selectValue, handleSelectValue, selectUrlParam, setSelectUrlParam } = usePageData() //global data


  //all the data for the table
  const tableProvider = {
    columns: [
      {
        Header: 'Trip Id',
        accessor: 'id',
      },
      {
        Header: 'Trip Reference',
        accessor: 'tripReference',
      },
      {
        Header: 'Route Code',
        accessor: 'routeCode',
      },
      {
        Header: 'Fleet Id',
        accessor: 'fleetid',
      },
      {
        Header: 'Fleet',
        accessor: 'fleet',
      },
      {
        Header: 'Manifest Id',
        accessor: 'manifestId',
      },
      {
        Header: 'Manifest',
        accessor: 'manifest',
      },
      {
        Header: 'Driver',
        accessor: 'driver',
      },

      {
        Header: 'Start Time',
        accessor: 'startTime',
      },
      {
        Header: 'End Time',
        accessor: 'endTime',
      },
     
    
    ],
    DetailsPath: '/monitor/tripDetails/',
    EditPath: '#kt_modal_edittrip',
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


  const handleEdit = (event: React.MouseEvent) => {
    const urlParm = event.currentTarget.getAttribute('id')
    const val = tripmodel.find((x) => x.id === urlParm)
    handleSelectValue(val!)
    return val
  }


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
          handleEdit={handleEdit}
        />
        )}
      </div>
    </div>
  )
}
