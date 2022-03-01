import {useEffect, useState} from 'react'
import agent from '../../../../../setup/axios/AxiosAgent'
import { IrisTablesWidget } from '../../../layout/tables/IrisTablesWidget'
import { modalprops } from '../../../layout/tables/IrisTableTitle'
import FleetData from '../../FleetData.json'
import { IFleetModel } from '../../ShipmentModels/ShipmentInterfaces'
// import {format} from 'date-fns' 

export function ViewFleets() {
  const [loading, setLoading] = useState(true)
  const [modalTarger, setModalTarget] = useState<modalprops[]>([]);
  const [fleetmodel, setFleetModel] = useState<IFleetModel[]>([])

  //all the data for the table
  const tableProvider = {
    columns: [
      {
        Header: 'FleetId',
        accessor: 'FleetId',
      },
      {
        Header: 'registration Number',
        accessor: 'RegistrationNumber',
      },
      {
        Header: 'chasis Number',
        accessor: 'ChasisNumber',
      },
      {
        Header: 'engine Number',
        accessor: 'EngineNumber',
      },
      {
        Header: 'Status',
        accessor: 'Status',
      },
      {
        Header: 'FleetType',
        accessor: 'FleetType',
      },
      {
          Header: 'Capacity',
          accessor: 'Capacity',
      },
      {
          Header: 'Description',
          accessor: 'Description',
      },
      {
          Header: 'FleetModel',
          accessor: 'FleetModel',
      },
      {
          Header: 'FleetMake',
          accessor: 'FleetMake',
      },
      {
          Header: 'Owner Id',
          accessor: 'OwnerId',
      },
        ],
    DetailsPath: '/shipment/fleetdetail/',
    EditPath: '#kt_modal_addfleet',
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

  // //USE EFFECT HOOK
  useEffect(() => {
    agent.Fleet.list().then((response) => {
      setFleetModel(response)
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
        />
      </div>
    </div>
  )
}
