import {useEffect, useState} from 'react'
import agent from '../../../../../setup/axios/AxiosAgent'
import {IrisTablesWidget} from '../../../layout/tables/IrisTablesWidget'
import {modalprops} from '../../../layout/tables/IrisTableTitle'
import Shipment_Data from './Shipment_Data.json'
import {IShipmentModel} from '../../ShipmentModels/ShipmentInterfaces'
import { Spinner } from 'react-bootstrap-v5'
// import {format} from 'date-fns'

export function ViewShipment() {
  const [loading, setLoading] = useState(true)
  const [modalTarger, setModalTarget] = useState<modalprops[]>([])
  const [shipmentmodel, setShhipmentModel] = useState<IShipmentModel[]>([])
  const [loadingData, setLoadingData] = useState(true)

  //all the data for the table
  const tableProvider = {
    columns: [
      {
        Header: 'Waybill',
        accessor: 'waybill',
      },
      {
        Header: 'Customer',
        accessor: 'customer',
      },
      {
        Header: 'GrandTotal',
        accessor: 'grandTotal',
      },
      {
        Header: 'Reciever',
        accessor: 'reciever',
      },
      {
        Header: 'Pick Up Options',
        accessor: 'pickUpOptions',
      },
      {
        Header: 'Shipment Items',
        accessor: 'shipmentItems',
      },
    ],
    DetailsPath: '/shipment/shipmentdetail/',
    EditPath: '#kt_modal_viewshipment',
    DeletePath: '/adminSettings/userDetails/',
    FakeData: Shipment_Data,
  }

  //Buttons on the table page
  const ModalTarget = [
    {
      linkTitle: 'View Shipment',
      linkTarget: '#kt_modal_viewshipment',
    },
  ]

  // //USE EFFECT HOOK
  useEffect(() => {
    const callFunc = async () => {
      await agent.Shipment.list().then((response) => {
        setShhipmentModel(response)
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
      <div className='col-xl-12'>
      {loadingData ? (
          <div><Spinner animation="border" /></div>
        ) : (
          <IrisTablesWidget
            tableData={shipmentmodel}
            className='mb-5 mb-xl-8'
            columnsMap={tableProvider.columns}
            DetailsPath={tableProvider.DetailsPath}
            EditPath={tableProvider.EditPath}
            DeletePath={tableProvider.DeletePath}
            UseFakeData={false}
            FakeData={tableProvider.FakeData}
            TableTitle={'View Shipment'}
            Count={'Over 300 Users'}
            ModalTarget={modalTarger}
          />
        )}
      </div>
    </div>
  )
}
