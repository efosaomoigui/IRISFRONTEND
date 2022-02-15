import { useEffect, useState } from 'react'
import agent from '../../../../../setup/axios/AxiosAgent';
import { IrisTablesWidget } from '../../../layout/tables/IrisTablesWidget';
import { madalprops } from '../../../layout/tables/IrisTableTitle';
import { IWalletTransactionModel } from '../../Models/WalletInterfaces'
import WalletTransaction_Data from './Wallet_Data.json'
// import {format} from 'date-fns' 

export function WalletTransaction() {
  const [loading, setLoading] = useState(true)
  const [modalTarger, setModalTarget] = useState<madalprops[]>([]);
  const [wallettransactionmodel, setUsersModel] = useState<IWalletTransactionModel[]>([])

  //all the data for the table
  const tableProvider = {
    columns: [
      {
        Header: 'Wallet Number',
        accessor: 'walletNumberId',
      },
      {
        Header: 'Active',
        accessor: 'isActive',
      },
      // {
      //   Header: 'First Name',
      //   accessor: 'firstName',
      // },
      {
        Header: 'User Id',
        accessor: 'userId',
      },
    ],
    DetailsPath: '/adminSettings/userDetails/',
    EditPath: '/adminSettings/userDetails/',
    DeletePath: '/adminSettings/userDetails/',
    FakeData: WalletTransaction_Data,
  }

  //Buttons on the table page
  const ModalTarget = [
    {
      linkTitle: 'Add Wallet transaction',
      linkTarget: '#kt_modal_addwallettransaction'
    }

  ]

  // //USE EFFECT HOOK
  useEffect(() => {
    agent.WalletTransaction.list().then((response) => {
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
          tableData={wallettransactionmodel}
          className='mb-5 mb-xl-8'
          columnsMap={tableProvider.columns}
          DetailsPath={tableProvider.DetailsPath}
          EditPath={tableProvider.EditPath}
          DeletePath={tableProvider.DeletePath}
          UseFakeData={true}
          FakeData={tableProvider.FakeData}
          TableTitle={'Wallet Transaction'}
          Count={'Over 300 Users'}
          ModalTarget={
            modalTarger
          }
        />
      </div>
    </div>
  )
}