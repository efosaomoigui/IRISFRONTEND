import { useEffect, useState } from 'react'
import agent from '../../../../../setup/axios/AxiosAgent';
import { IrisTablesWidget } from '../../../layout/tables/IrisTablesWidget';
import { modalprops } from '../../../layout/tables/IrisTableTitle';
import { IInvoiceModel } from '../../PaymentModels/PaymentmentInterfaces';

import Invoice_Data from './Invoice_Data.json'
// import {format} from 'date-fns' 

export function Invoice() {
  const [loading, setLoading] = useState(true)
  const [modalTarger, setModalTarget] = useState<modalprops[]>([]);
  const [invoicemodel, setUsersModel] = useState<IInvoiceModel[]>([])

  //all the data for the table
  const tableProvider = {
    columns: [
      {
        Header: 'Id',
        accessor: 'Id',
        // cell:({ value }) => {return format(new Date(value), 'dd/MM/YYYY')}
      },
      {
        Header: 'Invoice Code',
        accessor: 'InvoiceCode',
        // cell:({ value }) => {return format(new Date(value), 'dd/MM/YYYY')}
      },
      {
        Header: 'Shipment Id ',
        accessor: 'ShipmentId',
      },
      {
        Header: 'Shipment',
        accessor: 'Shipment',
      },
      {
        Header: 'PaymentMethod',
        accessor: 'PaymentMethod',
      },
    ],
    DetailsPath: '/payment/invoiceDetail/',
    EditPath: '#kt_modal_addinvoice',
    DeletePath: '/adminSettings/userDetails/',
    FakeData: Invoice_Data,
  }

  //Buttons on the table page
  const ModalTarget = [
    {
      linkTitle: 'Add Invoice',
      linkTarget: '#kt_modal_addinvoice'
    },
  ]

  // //USE EFFECT HOOK
  useEffect(() => {
    agent.Invoice.list().then((response) => {
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
          tableData={invoicemodel}
          className='mb-5 mb-xl-8'
          columnsMap={tableProvider.columns}
          DetailsPath={tableProvider.DetailsPath}
          EditPath={tableProvider.EditPath}
          DeletePath={tableProvider.DeletePath}
          UseFakeData={false}
          FakeData={tableProvider.FakeData}
          TableTitle={'Invoice'}
          Count={'Over 300 Users'}
          ModalTarget={
            modalTarger
          }
        />
      </div>
    </div>
  )
}