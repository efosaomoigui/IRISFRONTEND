import {useEffect, useState} from 'react'
import agent from '../../../../../setup/axios/AxiosAgent'
import { IrisTablesWidget } from '../../../layout/tables/IrisTablesWidget'
import { madalprops } from '../../../layout/tables/IrisTableTitle'
import FleetData from '../../FleetData.json'
import { IFleetModel } from '../../ShipmentModels/ShipmentInterfaces'
// import {format} from 'date-fns' 

export function ViewFleets() {
  const [loading, setLoading] = useState(true)
  const [modalTarger, setModalTarget] = useState<madalprops[]>([]);
  const [fleetmodel, setFleetModel] = useState<IFleetModel[]>([])

  //all the data for the table
  const tableProvider = {
    columns: [
      {
        Header: 'Id',
        accessor: 'id',
      },
      {
        Header: 'registration Number',
        accessor: 'registration_Number',
      },
      {
        Header: 'chasis Number',
        accessor: 'chasis_Number',
      },
      {
        Header: 'engine Number',
        accessor: 'engine_Number',
      },
      {
        Header: 'fleet Type',
        accessor: 'fleet_Type',
      },
      {
        Header: 'capacity',
        accessor: 'capacity',
      },
      {
          Header: 'description',
          accessor: 'description',
      },
      {
          Header: 'fleet Model',
          accessor: 'fleet_Model',
      },
      {
          Header: 'fleet Make',
          accessor: 'fleet_Make',
      },
      {
          Header: 'Owner Id',
          accessor: 'owner_Id',
      },
        ],
    DetailsPath: '/shipment/fleetdetail/:id',
    EditPath: '/adminSettings/userDetails/',
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
          UseFakeData={true}
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
