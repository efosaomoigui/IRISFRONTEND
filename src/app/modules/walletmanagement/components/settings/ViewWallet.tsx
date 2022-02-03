import { walletmodel } from '../../Models/WalletModel'
import { TablesWidgetWallet } from './TableWidgetWallet'

export function ViewWallet() {
  return (
    <div className='row g-5 g-xxl-8'>
      <div className='col-xl-12'>
        <TablesWidgetWallet walletmodel={walletmodel} walletBalance={walletmodel} walletNumber={walletmodel}
        className='mb-5 mb-xxl-8' firstName={walletmodel} lastName={walletmodel} />
      </div>
    </div>
  )
}
