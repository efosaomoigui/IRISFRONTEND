import {useEffect, useState} from 'react'
import { Spinner } from 'react-bootstrap-v5'
import agent from '../../../../../setup/axios/AxiosAgent'
import { usePageData } from '../../../../../_iris/layout/core'
import {IrisTablesWidget} from '../../../layout/tables/IrisTablesWidget'
import {modalprops} from '../../../layout/tables/IrisTableTitle'
import {IWalletModel} from '../../Models/WalletInterfaces'
import Wallet_Data from './Wallet_Data.json'
// import {format} from 'date-fns'

export function ViewWallet() {
  const [loading, setLoading] = useState(true)
  const [modalTarger, setModalTarget] = useState<modalprops[]>([])
  const [walletmodel, setWalletModel] = useState<IWalletModel[]>([])
  const [loadingData, setLoadingData] = useState(true)
  const {selectValue, handleSelectValue, selectUrlParam, setSelectUrlParam} =usePageData() //global data


  //all the data for the table
  const tableProvider = {
    columns: [
      {
        Header: 'WalletId',
        accessor: 'id',
      },
      {
        Header: 'Wallet Number',
        accessor: 'number',
      },
      {
        Header: 'User Id',
        accessor: 'userId',
      },
      {
        Header: 'Active',
        accessor: 'isActive',
      },
    ],
    DetailsPath: '/wallet/walletdetails/',
    EditPath: '#kt_modal_editwallet',
    DeletePath: '/adminSettings/userDetails/',
    FakeData: Wallet_Data,
  }

  //Buttons on the table page
  const ModalTarget = [
    {
      linkTitle: 'Add Wallet',
      linkTarget: '#kt_modal_addwallet',
    },
  ]

  // //USE EFFECT HOOK
  useEffect(() => {
    const callFunc = async () => {
      await agent.Wallet.list().then((response) => {
        setWalletModel(response)
        setModalTarget(ModalTarget)
        setLoadingData(false)
      })
    }
    if (loadingData) {
      callFunc()
    }
  }, [])

  const handleEdit = (event: React.MouseEvent) => {
    const urlParm = event.currentTarget.getAttribute('id')
    const val = walletmodel.find((x) => x.id === urlParm) 
    handleSelectValue(val!)
    return val
  }


  return (
    <div className='row g-5 g-xxl-8'>
      <div className='col-xl-12'>
        {loadingData ? (
          <div><Spinner animation="border" /></div>
        ) : (
          <IrisTablesWidget
            tableData={walletmodel}
            className='mb-5 mb-xl-8'
            columnsMap={tableProvider.columns}
            DetailsPath={tableProvider.DetailsPath}
            EditPath={tableProvider.EditPath}
            DeletePath={tableProvider.DeletePath}
            UseFakeData={false}
            FakeData={tableProvider.FakeData}
            TableTitle={'Wallet'}
            Count={'Over 300 Users'}
            ModalTarget={modalTarger}
            handleEdit = {handleEdit}
          />
        )}
      </div>
    </div>
  )
}
