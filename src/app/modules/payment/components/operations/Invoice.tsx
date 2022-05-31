import {format} from 'date-fns'
import {useEffect, useState} from 'react'
import {Spinner} from 'react-bootstrap-v5'
import agent from '../../../../../setup/axios/AxiosAgent'
import {IrisTablesWidget} from '../../../layout/tables/IrisTablesWidget'
import {modalprops} from '../../../layout/tables/IrisTableTitle'
import {numberFormat} from '../../../walletmanagement/Models/WalletInterfaces'
import {IInvoiceModel} from '../../PaymentModels/PaymentmentInterfaces'

import Invoice_Data from './Invoice_Data.json'
// import {format} from 'date-fns'

export function Invoice() {
  const [loading, setLoading] = useState(true)
  const [modalTarger, setModalTarget] = useState<modalprops[]>([])
  const [invoicemodel, setUsersModel] = useState<IInvoiceModel[]>([])
  const [loadingData, setLoadingData] = useState(true)

  //all the data for the table
  const tableProvider = {
    columns: [
      {
        Header: 'Invoice Code',
        accessor: 'invoiceCode',
        // cell:({ value }) => {return format(new Date(value), 'dd/MM/YYYY')}
      },
      {
        Header: 'Date',
        accessor: 'createdDate',
        Cell: ({value}: any) => format(new Date(value), 'dd/mm/yyyy HH:mm:ss'),
      },
      {
        Header: 'Customer',
        accessor: 'customerName',
      },
      {
        Header: 'Amount',
        accessor: 'amount',
        Cell: ({value}: any) => numberFormat(Number(value)),
      },
      {
        Header: 'Waybill Number',
        accessor: 'waybilNumber',
      },
      {
        Header: 'PaymentMethod',
        accessor: 'paymentMethod',
      },
      {
        Header: 'Payment Status',
        accessor: 'status',
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
      linkTarget: '#kt_modal_addinvoice',
    },
  ]

  //USE EFFECT HOOK
  useEffect(() => {
    const callFunc = async () => {
      await agent.Invoice.list().then((response) => {
        setUsersModel(response)
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
          <div>
            <Spinner animation='border' />
          </div>
        ) : (
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
            ModalTarget={modalTarger}
            showButton={true}
          />
        )}
      </div>
    </div>
  )
}
