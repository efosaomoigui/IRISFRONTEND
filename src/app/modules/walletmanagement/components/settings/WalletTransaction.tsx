import { wallettransactionmodels } from '../../Models/WalletTransactionModel'
import { TablesWidgetWalletTransaction } from './TableWidgetWalletTransaction'

export function WalletTransaction() {
  return (
    <div className='row g-5 g-xxl-8'>
      <div className='col-xl-12'>
        <TablesWidgetWalletTransaction className='mb-5 mb-xxl-8' transaction={wallettransactionmodels} />
      </div>
    </div>
  )
}
