import { format } from 'date-fns'
import {useEffect, useState} from 'react'
import {Button, Form, Spinner} from 'react-bootstrap-v5'
import {object} from 'yup'
import agent from '../../../../../setup/axios/AxiosAgent'
import {usePageData} from '../../../../../_iris/layout/core'
import {IrisTablesWidget} from '../../../layout/tables/IrisTablesWidget'
import {modalprops} from '../../../layout/tables/IrisTableTitle'
import {IWalletModel, numberFormat} from '../../Models/WalletInterfaces'
import Wallet_Data from './Wallet_Data.json'
// import {format} from 'date-fns'

export interface IWalletSearch {
  walletNumber?: string
  totalBalance?: string
  walletTransactions: IWalletModel[]
}

export function ViewWallet() {
  const [loading, setLoading] = useState(true)
  const [modalTarger, setModalTarget] = useState<modalprops[]>([])
  const [walletmodel, setWalletModel] = useState<IWalletModel[]>([])
  const [walletSearchModel, setWalletSearchModel] = useState<IWalletModel[]>([])
  const [loadingData, setLoadingData] = useState(true)
  const [loadingData2, setLoadingData2] = useState(false)
  const {
    selectValue,
    handleSelectValue,
    selectUrlParam,
    setSelectUrlParam,
    walletNumber,
    setWalletNumber,
  } = usePageData() //global data
  // const [walletNumber, setWalletNumber] = useState("")
  const [walletBalance, setWalletBalance] = useState('')
  const [walletName, setWalletName] = useState('')

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
        Header: 'Name',
        accessor: 'user',
      },
      {
        Header: 'Active',
        accessor: 'isActive',
      },
      {
        Header: 'Balance',
        accessor: 'walletBalance',
        // Cell: (props:IWalletModel) => new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'USD' }).format(props.value)
      },
    ],
    DetailsPath: '/wallet/walletdetails/',
    EditPath: '#kt_modal_editwallet',
    DeletePath: '/adminSettings/userDetails/',
    FakeData: Wallet_Data,
  }

  //all the data for the table
  const tableProvider2 = {
    columns: [
      {
        Header: 'Wallet Number',
        accessor: 'walletNumber',
      },
      {
        Header: 'Date',
        accessor: 'createdDate',
        // cell: ({value}:any)=>format(new Date(value), "dd/MM/yyyy") 
        Cell: ({value}:any) => format(new Date(value), 'dd/MM/yyyy h:i:s A') 
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Amount',
        accessor: 'amount',
        Cell: ({value}:any) => numberFormat(Number(value)) 
      },
      {
        Header: 'Transaction Type',
        accessor: 'transactionType',
      },
      {
        Header: 'Balance',
        accessor: 'lineBalance',
        // Cell: ({value}:any) => new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'NGN' }).format(value)
        Cell: ({value}:any) => numberFormat(Number(value)) 
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
      linkTitle: 'Update Wallet',
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
  }, [walletSearchModel, walletmodel])

  const handleEdit = (event: React.MouseEvent) => {
    const urlParm = event.currentTarget.getAttribute('id')
    const val = walletmodel.find((x) => x.id === urlParm)
    handleSelectValue(val!)
    return val
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWalletNumber(event.target.value)
  }

  const handleWalletSearch = () => {
    setLoadingData2(true)
    agent.Wallet.searrchWallet(walletNumber!).then((response) => {
      if (response.walletTransactions) {
        setWalletSearchModel(response.walletTransactions)
        setWalletBalance(response.totalBalance!)
        setWalletName(response.walletTransactions![0]?.name!)
        setWalletNumber(response.walletNumber!)
      } else {
        setWalletNumber(response.walletNumber!)
      }
      // alert("Search Value"+ walletSearchModel )
      setLoadingData2(false)
    })
  }

  return (
    <div className='row g-5 g-xxl-8'>
      <div className='container'>
        <Form>
          <div className='row m-3'>
            <div className='col'>
              <Form.Control
                size='lg'
                placeholder='Wallet Number'
                onChange={handleChange}
                style={{width: '100%'}}
              />
            </div>
            <div className='col'>
              <Button
                variant='primary'
                onClick={handleWalletSearch}
                type='button'
                style={{width: '88%'}}
              >
                Search
              </Button>
            </div>
            <div className='col'></div>
          </div>
        </Form>
      </div>
      {/* <div className='col-xl-12'>
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
      </div> */}

      <div className='col-xl-12'>
        {loadingData2 ? (
          <div>
            <Spinner animation='border' />
          </div>
        ) : (
          <IrisTablesWidget
            tableData={walletSearchModel}
            className='mb-5 mb-xl-8'
            columnsMap={tableProvider2.columns}
            DetailsPath={tableProvider2.DetailsPath}
            EditPath={tableProvider2.EditPath}
            DeletePath={tableProvider2.DeletePath}
            UseFakeData={false}
            FakeData={tableProvider2.FakeData}
            TableTitle={
              // 'Wallet Name: ' +
              // walletName +
              // ' | Wallet Number: ' +
              // walletNumber +
              'Balance: ' +
              numberFormat(Number(walletBalance))
            }
            Count={'Wallet Transactions History Search'}
            ModalTarget={modalTarger}
            handleEdit={handleEdit}
          />
        )}
      </div>
    </div>
  )
}
