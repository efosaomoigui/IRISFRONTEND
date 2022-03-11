import {useEffect, useState} from 'react'
import { Spinner } from 'react-bootstrap-v5'
import agent from '../../../../../setup/axios/AxiosAgent'
import { usePageData } from '../../../../../_iris/layout/core'
import { IrisTablesWidget } from '../../../layout/tables/IrisTablesWidget'
import { modalprops } from '../../../layout/tables/IrisTableTitle'
import FleetData from '../../FleetData.json'
import { IFleetModel } from '../../ShipmentModels/ShipmentInterfaces'
// import {format} from 'date-fns' 

export function ViewFleets() {
  const [loading, setLoading] = useState(true)
  const [modalTarger, setModalTarget] = useState<modalprops[]>([]);
  const [fleetmodel, setFleetModel] = useState<IFleetModel[]>([])
  const [loadingData, setLoadingData] = useState(true)
  const { selectValue, handleSelectValue, selectUrlParam, setSelectUrlParam } = usePageData() //global data


  //all the data for the table
  const tableProvider = {
    columns: [
      {
        Header: 'FleetId',
        accessor: 'fleetId',
      },
      {
        Header: 'Registration Number',
        accessor: 'registrationNumber',
      },
      {
        Header: 'Chasis Number',
        accessor: 'chasisNumber',
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
      {
        Header: 'FleetType',
        accessor: 'fleetType',
      },
      {
          Header: 'Capacity',
          accessor: 'capacity',
      },
      {
          Header: 'Description',
          accessor: 'description',
      },
      {
          Header: 'FleetModel',
          accessor: 'fleetModel',
      },
      {
          Header: 'FleetMake',
          accessor: 'fleetMake',
      },
      {
          Header: 'Owner Id',
          accessor: 'ownerId',
      },
        ],
    DetailsPath: '/shipment/fleetdetail/',
    EditPath: '#kt_modal_editfleet',
    DeletePath: '/adminSettings/userDetails/',
    FakeData: FleetData,
  }

  //Buttons on the table page
  const ModalTarget = [
    {
      linkTitle:'Add Fleet',
      linkTarget : '#kt_modal_addfleet'
    },
  ]

  const handleEdit = (event: React.MouseEvent) => {
    const urlParm = event.currentTarget.getAttribute('id')
    const val = fleetmodel.find((x) => x.fleetId === urlParm)
    handleSelectValue(val!)
    return val
  }

   // //USE EFFECT HOOK
   useEffect(() => {
    const callFunc = async () => {
      await agent.Fleet.list().then((response) => {
        setFleetModel(response)
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
      <div className='col-xl-12'>
      {loadingData ? (
          <div>
            <Spinner animation='border' />
          </div>
        ) : (
        <IrisTablesWidget
          tableData={fleetmodel}
          className='mb-5 mb-xl-8'
          columnsMap={tableProvider.columns}
          DetailsPath={tableProvider.DetailsPath}
          EditPath={tableProvider.EditPath}
          DeletePath={tableProvider.DeletePath}
          UseFakeData={false}
          FakeData={tableProvider.FakeData}
          TableTitle={'Fleet Profile'}
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
