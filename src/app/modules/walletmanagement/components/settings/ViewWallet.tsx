import { useEffect, useState } from 'react'
import agent from '../../../../../setup/axios/AxiosAgent'
import LoadingComponent from '../../../../LoadingComponent'
import { IWalletModel } from '../../Models/WalletInterfaces'
import { TablesWidgetWallet } from './TableWidgetWallet'

export function ViewWallet() {

  const [loading, setLoading] = useState(true)
  const [walletmodel1, setWalletModel] = useState<IWalletModel[]>([])

  // //USE EFFECT HOOK
  useEffect(() => {
    agent.Wallet.list().then((response) => {
      setWalletModel(response)
      setLoading(false)
    })
  }, [])

  if (loading) return <LoadingComponent content='Loading...' />

  return (
    <div className='row g-5 g-xxl-8'>
      <div className='col-xl-12'>
        <TablesWidgetWallet wallets={walletmodel1}  className='mb-5 mb-xxl-8' />
      </div>
    </div>
  )
}
