import { Addwalletmodel } from '../../Models/AddWalletModel'
import { TablesWidgetAddWallet } from './TableWidgetAddWallet'

export function AddWallet() {
  return (
    <div className='row g-5 g-xxl-8'>
      <div className='col-xl-12'>
        <TablesWidgetAddWallet className='mb-5 mb-xxl-8' addwallet={Addwalletmodel} />
      </div>
    </div>
  )
}
