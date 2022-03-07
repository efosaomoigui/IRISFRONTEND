import { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap-v5';
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
  const [loadingData, setLoadingData] = useState(true)

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
      const callFunc = async () => {
        await agent.Manifest.list().then((response) => {
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
      <div className='col-xl-12'>
      {loadingData ? (
          <div><Spinner animation="border" /></div>
        ) : (
        <IrisTablesWidget
          tableData={manifestmodel}
          className='mb-5 mb-xl-8'
          columnsMap={tableProvider.columns}
          DetailsPath={tableProvider.DetailsPath}
          EditPath={tableProvider.EditPath}
          DeletePath={tableProvider.DeletePath}
          UseFakeData={false}
          FakeData={tableProvider.FakeData}
          TableTitle={'Manifest'}
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