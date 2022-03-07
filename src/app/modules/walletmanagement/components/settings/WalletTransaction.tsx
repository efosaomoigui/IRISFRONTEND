import { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap-v5';
import agent from '../../../../../setup/axios/AxiosAgent';
import { IrisTablesWidget } from '../../../layout/tables/IrisTablesWidget';
import { modalprops } from '../../../layout/tables/IrisTableTitle';
import { IWalletModel, IWalletTransactionModel } from '../../Models/WalletInterfaces'
import WalletTransaction_Data from './WalletTransaction_Data.json'
// import {format} from 'date-fns' 

export function WalletTransaction() {
  const [loading, setLoading] = useState(true)
  const [modalTarger, setModalTarget] = useState<modalprops[]>([]);
  const [wallettransactionmodel, setWalletRansactionModel] = useState<IWalletTransactionModel[]>([])
  const [loadingData, setLoadingData] = useState(true)

  //all the data for the table
  const tableProvider = {
    columns: [
      {
        Header: 'WalletTransaction Id',
        accessor: 'WalletTransactionId',
      },
      {
        Header: 'Amount',
        accessor: 'Amount',
      },
      {
        Header: 'Transaction Type',
        accessor: 'TransactionType',
      },
      {
        Header: 'Description',
        accessor: 'Description',
      },
      {
        Header: 'Wallet Number',
        accessor: 'WalletNumber',
      },
      {
        Header: 'Date Created',
        accessor: 'DateCreated',
      },
    ],
    DetailsPath: '/wallet/wallettransactiondetails/',
    EditPath: '#kt_modal_addwallettransaction',
    DeletePath: '/adminSettings/userDetails/',
    FakeData: WalletTransaction_Data,
  }

  //Buttons on the table page
  const ModalTarget = [
    {
      linkTitle: 'Add Wallet Transaction',
      linkTarget: '#kt_modal_addwallettransaction'
    }

  ]

    // //USE EFFECT HOOK
    useEffect(() => {
      const callFunc = async () => {
        await agent.WalletTransaction.list().then((response) => {
          setWalletRansactionModel(response)
          setModalTarget(ModalTarget);
          setLoadingData(false)
        })
      }
      if (loadingData) {
        callFunc()
      }
    }, [])


  // console.log(usersmodel);

  // if (loading) return <LoadingComponent content='Loading...' />

  return (
    <div className='row g-5 g-xxl-8'>
      <div className='col-xl-12'>
      {loadingData ? (
          <div><Spinner animation="border" /></div>
        ) : (
        <IrisTablesWidget
          tableData={wallettransactionmodel}
          className='mb-5 mb-xl-8'
          columnsMap={tableProvider.columns}
          DetailsPath={tableProvider.DetailsPath}
          EditPath={tableProvider.EditPath}
          DeletePath={tableProvider.DeletePath}
          UseFakeData={false}
          FakeData={tableProvider.FakeData}
          TableTitle={'Wallet Transaction'}
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