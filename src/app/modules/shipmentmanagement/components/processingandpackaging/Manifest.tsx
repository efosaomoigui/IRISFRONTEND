import { useEffect, useState } from 'react'
import agent from '../../../../../setup/axios/AxiosAgent';
import LoadingComponent from '../../../../LoadingComponent';
import { IrisTablesWidget } from '../../../layout/tables/IrisTablesWidget';
import { modalprops } from '../../../layout/tables/IrisTableTitle';
import { IManifestModel } from '../../ShipmentModels/ShipmentInterfaces';
import Manifest_Data from './Manifest_Data.json'
// import {format} from 'date-fns' 

export function Manifest() {
  const [loading, setLoading] = useState(true)
  const [modalTarger, setModalTarget] = useState<modalprops[]>([]);
  const [manifestmodel, setUsersModel] = useState<IManifestModel[]>([])

  //all the data for the table
  const tableProvider = { 
    columns: [
      {
        Header: 'Id',
        accessor: 'Id',
        // cell:({ value }) => {return format(new Date(value), 'dd/MM/YYYY')}
      },
      {
        Header: 'Manifest Code',
        accessor: 'ManifestCode',
      },
      {
        Header: 'Group WayBillId',
        accessor: 'GroupWayBillId',
      },
      {
        Header: 'Group WayBill',
        accessor: 'GroupWayBill',
      },
      {
        Header: 'UserId',
        accessor: 'UserId',
      },
    ],
    DetailsPath: '/shipment/manifestdetail/',
    EditPath: '#kt_modal_addmanifest',
    DeletePath: '/adminSettings/userDetails/',
    FakeData: Manifest_Data,
  }

  //Buttons on the table page
  const ModalTarget = [
    {
      linkTitle: 'Add Manifest',
      linkTarget: '#kt_modal_addmanifest',
    }

  ]

  // //USE EFFECT HOOK
  useEffect(() => {
    agent.Manifest.list().then((response) => {
      setUsersModel(response)
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
          tableData={manifestmodel}
          className='mb-5 mb-xl-8'
          columnsMap={tableProvider.columns}
          DetailsPath={tableProvider.DetailsPath}
          EditPath={tableProvider.EditPath}
          DeletePath={tableProvider.DeletePath}
          UseFakeData={true}
          FakeData={tableProvider.FakeData}
          TableTitle={'Manifest'}
          Count={'Over 300 Users'}
          ModalTarget={
            modalTarger
          }
        />
      </div>
    </div>
  )
}