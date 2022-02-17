import { useState } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';
import agent from '../../../../setup/axios/AxiosAgent';
import { IWalletTransactionModel } from '../Models/WalletInterfaces';
import AddWalletTransactionForm from '../walletformwidget/AddWalletTransactionForm';



const AddWalletTransactionModal: React.FC = () => {

  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = (values: IWalletTransactionModel) => {
    setIsSubmitting(true)
    values.WalletTransactionId = uuid()
    agent.WalletTransaction.create(values).then((response) => {
      toast.success("Wallet Transaction Creation Was Successful!");
      // console.log(response)
      setIsSubmitting(false)
    })
  }

  return (
    <>
      <div className='modal fade' id='kt_modal_addwallettransaction' aria-hidden='true'>
        <AddWalletTransactionForm isSubmitting={isSubmitting} onSubmit={onSubmit} />
      </div>
    </>
  )
}

export { AddWalletTransactionModal };

