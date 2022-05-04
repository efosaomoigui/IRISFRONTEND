import { format } from 'date-fns'
import {useEffect, useState} from 'react'
import {Spinner} from 'react-bootstrap-v5'
import agent from '../../../../../setup/axios/AxiosAgent'
import {usePageData} from '../../../../../_iris/layout/core'
import {IrisTablesWidget} from '../../../layout/tables/IrisTablesWidget'
import {modalprops} from '../../../layout/tables/IrisTableTitle'
import {IGroupWayBillModel} from '../../ShipmentModels/ShipmentInterfaces'
import Manifest_Data from './Manifest_Data.json'

// import {format} from 'date-fns'
export function ViewGroupWaybills() {
  const [loading, setLoading] = useState(true)
  const [modalTarger, setModalTarget] = useState<modalprops[]>([])
  const [groupwaybillmodel, setGroupWaybillModel] = useState<IGroupWayBillModel[]>([])
  const [loadingData, setLoadingData] = useState(true)
  const {selectValue, handleSelectValue, selectUrlParam, setSelectUrlParam} = usePageData() //global data

  //all the data for the table
  const tableProvider = {
    columns: [
      {
        Header: 'Group Waybill Id',
        accessor: 'id',
      },
      {
        Header: 'Date',
        accessor: 'createdDate',
        Cell: ({value}:any) => format(new Date(value), 'dd/mm/yyyy HH:mm:ss') 
      },
      {
        Header: 'Group Waybill Code',
        accessor: 'groupCode',
      },
      {
        Header: 'Departure',
        accessor: 'departure',
      },
      {
        Header: 'Destination',
        accessor: 'destination', 
      },
      // {
      //   Header: 'Route Code',
      //   accessor: 'routeCode',
      // },
      {
        Header: 'Waybill',
        accessor: 'waybill',
      },
      // {
      //   Header: 'Dispatcher',
      //   accessor: 'dispatcher',
      // },
    ],
    DetailsPath: '/monitor/tripDetails/',
    EditPath: '#kt_modal_edittrip',
    DeletePath: '/adminSettings/userDetails/',
    FakeData: Manifest_Data,
  } 

  //Buttons on the table page
  const ModalTarget = [
    {
      linkTitle: 'Add Trip',
      linkTarget: '#kt_modal_addtrip',
    },
  ]

  const handleEdit = (event: React.MouseEvent) => {
    const urlParm = event.currentTarget.getAttribute('id')
    const val = groupwaybillmodel.find((x) => x.Id === urlParm)
    handleSelectValue(val!)
    return val
  }

  //USE EFFECT HOOK backend call
  useEffect(() => {
    const callFunc = async () => {
      await agent.GroupWayBill.list().then((response) => {
        setGroupWaybillModel(response)
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
      <div className='col-xl-24'>
        {loadingData ? (
          <div>
            <Spinner animation='border' />
          </div>
        ) : (
          <IrisTablesWidget
            tableData={groupwaybillmodel}
            className='mb-5 mb-xl-8'
            columnsMap={tableProvider.columns}
            DetailsPath={tableProvider.DetailsPath}
            EditPath={tableProvider.EditPath}
            DeletePath={tableProvider.DeletePath}
            UseFakeData={false}
            FakeData={tableProvider.FakeData}
            TableTitle={'Group Waybills'}
            Count={''}
            showButton={true}
            ModalTarget={modalTarger}
            handleEdit={handleEdit}
          />
        )}
      </div>
    </div>
  )
}
