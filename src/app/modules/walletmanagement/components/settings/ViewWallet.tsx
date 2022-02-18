import { useEffect, useState } from 'react'
import agent from '../../../../../setup/axios/AxiosAgent';
import { IrisTablesWidget } from '../../../layout/tables/IrisTablesWidget';
import { madalprops } from '../../../layout/tables/IrisTableTitle';
import { IWalletModel } from '../../Models/WalletInterfaces'
import Wallet_Data from './Wallet_Data.json'
// import {format} from 'date-fns' 

export function ViewWallet() {
  const [loading, setLoading] = useState(true)
  const [modalTarger, setModalTarget] = useState<madalprops[]>([]);
  const [walletmodel, setUsersModel] = useState<IWalletModel[]>([])

  //all the data for the table
  const tableProvider = {
    columns: [
      {
        Header: 'WalletId',
        accessor: 'WalletId',
      },
      {
        Header: 'Wallet Number',
        accessor: 'WalletNumber',
      },
      {
        Header: 'User Id',
        accessor: 'UserId',
      },
      {
        Header: 'Active',
        accessor: 'IsActive',
      },
    ],
    DetailsPath: '/adminSettings/userDetails/',
    EditPath: '/adminSettings/userDetails/',
    DeletePath: '/adminSettings/userDetails/',
    FakeData: Wallet_Data,
  }

  //Buttons on the table page
  const ModalTarget = [
    {
      linkTitle: 'Add Wallet',
      linkTarget: '#kt_modal_addwallet'
    }
    
  ]

  // //USE EFFECT HOOK
  useEffect(() => {
    agent.Wallet.list().then((response) => {
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
          tableData={walletmodel}
          className='mb-5 mb-xl-8'
          columnsMap={tableProvider.columns}
          DetailsPath={tableProvider.DetailsPath}
          EditPath={tableProvider.EditPath}
          DeletePath={tableProvider.DeletePath}
          UseFakeData={true}
          FakeData={tableProvider.FakeData}
          TableTitle={'Wallet'}
          Count={'Over 300 Users'}
          ModalTarget={
            modalTarger
          }
        />
      </div>
    </div>
  )
}