import { useState } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';
import agent from '../../../../setup/axios/AxiosAgent';
import { usePageData } from '../../../../_iris/layout/core';
import { IWalletTransactionModel } from '../Models/WalletInterfaces';
import AddWalletTransactionForm from '../walletformwidget/AddWalletTransactionForm';



const AddWalletTransactionModal: React.FC = () => {

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectWallettransaction, setSelectWallettransaction] = useState<IWalletTransactionModel>()

  const { entityDetailValues, selectUrlParam, setSelectUrlParam } = usePageData()

  // handle logic
  const wallettransactions = entityDetailValues as IWalletTransactionModel[];

  const setSelectedValue = (wallettransactions: IWalletTransactionModel[]) => {
    const val = wallettransactions.find(x => x.WalletTransactionId === selectUrlParam)
    return val;
  }

  const selected = setSelectedValue(wallettransactions);
  console.log("LOG ", (selected) ? "old Wallet transaction" : "new Wallet transaction");

  const onSubmit = (values: IWalletTransactionModel) => {
    setIsSubmitting(true)
    values.WalletTransactionId = uuid()

    if (selected?.WalletTransactionId) {
      agent.WalletTransaction.update(values).then((response) => {
        toast.success('Wallet transaction Update Was Successful!')
        setIsSubmitting(false)
      })
    } else {
      agent.WalletTransaction.create(values).then((response) => {
        toast.success('Wallet transaction Creation Was Successful!')
        setIsSubmitting(false)
      })
    }
  }
  return (
    <>
      <div className='modal fade' id='kt_modal_addwallettransaction' aria-hidden='true'>
        <AddWalletTransactionForm isSubmitting={isSubmitting} onSubmit={onSubmit} wallettransaction={selected} />
      </div>
    </>
  )
}

export { AddWalletTransactionModal };

