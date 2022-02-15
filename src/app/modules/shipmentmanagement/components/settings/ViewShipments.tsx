import {useEffect, useState} from 'react'
import agent from '../../../../../setup/axios/AxiosAgent'
import { IrisTablesWidget } from '../../../layout/tables/IrisTablesWidget'
import { madalprops } from '../../../layout/tables/IrisTableTitle'
import ShipmentData from '../../ShipmentData.json'
import { IShipmentModel } from '../../ShipmentModels/ShipmentInterfaces'
// import {format} from 'date-fns' 

export function ViewShipments() {
  const [loading, setLoading] = useState(true)
  const [modalTarger, setModalTarget] = useState<madalprops[]>([]);
  const [shipmentmodel, setShipmentModel] = useState<IShipmentModel[]>([])

  //all the data for the table
  const tableProvider = {
    columns: [
        {
            Header: 'Id',
            accessor: 'Id',
          },
          {
            Header: 'First Name',
            accessor: 'First Name',
          },
          {
            Header: 'Last Name',
            accessor: 'LastName',
          },
          {
            Header: 'WayBill Number',
            accessor: 'WayBillNumber',
          },
          
          
        ],
    DetailsPath: '/adminSettings/userDetails/',
    EditPath: '/adminSettings/userDetails/',
    DeletePath: '/adminSettings/userDetails/',
    FakeData: ShipmentData,
  }

  //Buttons on the table page
  const ModalTarget = [
    {
      linkTitle:'Add Shipment',
      linkTarget : '#kt_modal_addroute'
    }
  ]

  // //USE EFFECT HOOK
  useEffect(() => {
    agent.Shipment.list().then((response) => {
      setShipmentModel(response)
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
          tableData={shipmentmodel}
          className='mb-5 mb-xl-8'
          columnsMap={tableProvider.columns}
          DetailsPath={tableProvider.DetailsPath}
          EditPath={tableProvider.EditPath}
          DeletePath={tableProvider.DeletePath}
          UseFakeData={true}
          FakeData={tableProvider.FakeData}
          TableTitle={'Shipment Profile'}
          Count={'Over 300 Users'}
          ModalTarget={
            modalTarger
          }
        />
      </div>
    </div>
  )
}
