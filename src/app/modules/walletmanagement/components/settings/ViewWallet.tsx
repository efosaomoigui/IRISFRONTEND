import { walletmodels } from '../../Models/WalletModel'
import { TablesWidgetWallet } from './TableWidgetWallet'

export function ViewWallet() {
  return (
    <div className='row g-5 g-xxl-8'>
      <div className='col-xl-12'>
        <TablesWidgetWallet wallets={walletmodels}  className='mb-5 mb-xxl-8' />
      </div>
    </div>
  )
}
