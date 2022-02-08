import { useEffect, useState } from 'react'
import agent from '../../../../../setup/axios/AxiosAgent'
import LoadingComponent from '../../../../LoadingComponent'
import { IWalletTransactionModel } from '../../Models/WalletInterfaces'
import { TablesWidgetWalletTransaction } from './TableWidgetWalletTransaction'

export function WalletTransaction() {

  const [loading, setLoading] = useState(true)
  const [walletTransactionmodel1, setWalletTransactionModel] = useState<IWalletTransactionModel[]>([])

  // //USE EFFECT HOOK
  useEffect(() => {
    agent.WalletTransaction.list().then((response) => {
      setWalletTransactionModel(response)
      setLoading(false)
    })
  }, [])

  if (loading) return <LoadingComponent content='Loading...' />
  return (
    <div className='row g-5 g-xxl-8'>
      <div className='col-xl-12'>
        <TablesWidgetWalletTransaction className='mb-5 mb-xxl-8' transaction={walletTransactionmodel1} />
      </div>
    </div>
  )
}
