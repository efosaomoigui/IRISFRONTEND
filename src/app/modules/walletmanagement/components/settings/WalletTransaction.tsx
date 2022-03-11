import { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap-v5';
import agent from '../../../../../setup/axios/AxiosAgent';
import { usePageData } from '../../../../../_iris/layout/core';
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
  const { selectValue, handleSelectValue, selectUrlParam, setSelectUrlParam } = usePageData() //global data
  
  
  //all the data for the table
  const tableProvider = {
    columns: [
      {
        Header: 'Amount',
        accessor: 'amount',
      },
      {
        Header: 'Transaction Type',
        accessor: 'transactionType',
      },
      {
        Header: 'Description',
        accessor: 'description',
      },
      {
        Header: 'Wallet Number',
        accessor: 'walletNumber',
      },
      {
        Header: 'user Id',
        accessor: 'userId',
      },
    ],
    DetailsPath: '/wallet/wallettransactiondetails/',
    EditPath: '#kt_modal_editwallettransaction',
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

  const handleEdit = (event: React.MouseEvent) => {
    const urlParm = event.currentTarget.getAttribute('id')
    const val = wallettransactionmodel.find((x) => x.userId === urlParm)
    handleSelectValue(val!)
    return val
  }
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
          handleEdit={handleEdit}
        />
        )}
      </div>
    </div>
  )
}