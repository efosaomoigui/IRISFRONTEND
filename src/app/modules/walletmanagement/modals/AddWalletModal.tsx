import { useState } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';
import agent from '../../../../setup/axios/AxiosAgent';
import { IAddWalletModel, IWalletModel } from '../Models/WalletInterfaces';
import AddWalletForm from '../walletformwidget/AddWalletForm';



const AddWalletModal: React.FC = () => {

  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = (values: IWalletModel) => {
    setIsSubmitting(true)
    values.WalletId = uuid()
    agent.Wallet.create(values).then((response) => {
      toast.success("Wallet Creation Was Successful!");
      // console.log(response)
      setIsSubmitting(false)
    })
  }

  return (
    <>
      <div className='modal fade' id='kt_modal_addwallet' aria-hidden='true'>
        <AddWalletForm isSubmitting={isSubmitting} onSubmit={onSubmit} />
      </div>
    </>
  )
}

export { AddWalletModal };

