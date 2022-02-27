import { useEffect, useState } from 'react'
import agent from '../../../../../setup/axios/AxiosAgent';
import { IrisTablesWidget } from '../../../layout/tables/IrisTablesWidget';
import { madalprops } from '../../../layout/tables/IrisTableTitle';
import { IPaymentLogModel } from '../../PaymentModels/PaymentmentInterfaces';
import PaymentLog_Data from './PaymentLog_Data.json'
// import {format} from 'date-fns' 

export function PaymentLog() {
  const [loading, setLoading] = useState(true)
  const [modalTarger, setModalTarget] = useState<madalprops[]>([]);
  const [paymentlogmodel, setUsersModel] = useState<IPaymentLogModel[]>([])

  //all the data for the table
  const tableProvider = {
    columns: [
      {
        Header: 'PaymentId',
        accessor: 'PaymentId',
      },
      {
        Header: 'Amount',
        accessor: 'Amount',
      },
      {
        Header: 'Payment Method',
        accessor: 'PaymentMethod',
      },
      {
        Header: 'User',
        accessor: 'User',
      },
      {
        Header: 'TransactionId',
        accessor: 'TransactionId',
      },
    ],
    DetailsPath: '/payment/paymentLogDetails/',
    EditPath: '#kt_modal_addpaymentlog',
    DeletePath: '/adminSettings/userDetails/',
    FakeData: PaymentLog_Data,
  }

  //Buttons on the table page
  const ModalTarget = [
    {
      linkTitle: 'Add Payment',
      linkTarget: '#kt_modal_addpaymentlog'
    },
  ]

  // //USE EFFECT HOOK
  useEffect(() => {
    agent.PaymentLog.list().then((response) => {
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
          tableData={paymentlogmodel}
          className='mb-5 mb-xl-8'
          columnsMap={tableProvider.columns}
          DetailsPath={tableProvider.DetailsPath}
          EditPath={tableProvider.EditPath}
          DeletePath={tableProvider.DeletePath}
          UseFakeData={true}
          FakeData={tableProvider.FakeData}
          TableTitle={'Payment Log'}
          Count={'Over 300 Users'}
          ModalTarget={
            modalTarger
          }
        />
      </div>
    </div>
  )
}


