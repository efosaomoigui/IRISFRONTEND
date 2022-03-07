import {useEffect, useState} from 'react'
import {Spinner} from 'react-bootstrap-v5'
import agent from '../../../../../setup/axios/AxiosAgent'
import {IrisTablesWidget} from '../../../layout/tables/IrisTablesWidget'
import {modalprops} from '../../../layout/tables/IrisTableTitle'
import {IPaymentLogModel} from '../../PaymentModels/PaymentmentInterfaces'
import PaymentLog_Data from './PaymentLog_Data.json'
// import {format} from 'date-fns'

export function PaymentLog() {
  const [loading, setLoading] = useState(true)
  const [modalTarger, setModalTarget] = useState<modalprops[]>([])
  const [paymentlogmodel, setPaymentlogmodel] = useState<IPaymentLogModel[]>([])
  const [loadingData, setLoadingData] = useState(true)

  //all the data for the table
  const tableProvider = {
    columns: [
      {
        Header: 'PaymentId',
        accessor: 'paymentId',
      },
      {
        Header: 'Amount',
        accessor: 'amount',
      },
      {
        Header: 'Payment Method',
        accessor: 'paymentMethod',
      },
      {
        Header: 'User',
        accessor: 'user',
      },
      {
        Header: 'TransactionId',
        accessor: 'transactionId',
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
      linkTarget: '#kt_modal_addpaymentlog',
    },
  ]

  //USE EFFECT HOOK
  useEffect(() => {
    const callFunc = async () => {
      await agent.PaymentLog.list().then((response) => {
        setPaymentlogmodel(response)
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
            tableData={paymentlogmodel}
            className='mb-5 mb-xl-8'
            columnsMap={tableProvider.columns}
            DetailsPath={tableProvider.DetailsPath}
            EditPath={tableProvider.EditPath}
            DeletePath={tableProvider.DeletePath}
            UseFakeData={false}
            FakeData={tableProvider.FakeData}
            TableTitle={'Payment Log'}
            Count={'Over 300 Users'}
            ModalTarget={modalTarger}
          />
        )}
      </div>
    </div>
  )
}
