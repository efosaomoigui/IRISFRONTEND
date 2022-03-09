import { useState } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';
import agent from '../../../../setup/axios/AxiosAgent';
import { usePageData } from '../../../../_iris/layout/core';
import { IWalletModel } from '../Models/WalletInterfaces';
import AddWalletForm from '../walletformwidget/AddWalletForm';



const AddWalletModal: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(true)
  const [selectWallet, setSelectWallet] = useState<IWalletModel>()

  const { entityDetailValues, selectUrlParam, setSelectUrlParam } = usePageData()

  // handle logic
  const wallets = entityDetailValues as IWalletModel[];

  const setSelectedValue = (wallets: IWalletModel[]) => {
    const val = wallets.find(x => x.id === selectUrlParam)
    return val;
  }

  const selected = setSelectedValue(wallets);
  // console.log("LOG ", (selected) ? "old wallet" : "new wallet");

  const onSubmit = (values: IWalletModel) => {
    setIsSubmitting(true)
    values.id = uuid()

    if (selected?.id) {
      agent.Wallet.update(values).then((response) => {
        toast.success('wallet Update Was Successful!')
        setInterval(() => {
          setShowForm(false);
        }, 1000)
        setIsSubmitting(false)
      })
    } else {
      agent.Wallet.create(values).then((response) => {
        toast.success('wallet Creation Was Successful!')
        setInterval(() => {
          setShowForm(false);
        }, 1000)
        setIsSubmitting(false)
      })
    }
  }


  return (
    <>
      <div className='modal fade' id='kt_modal_addwallet' aria-hidden='true'>
        <AddWalletForm isSubmitting={isSubmitting} onSubmit={onSubmit} wallet={selected} showForm={showForm} />
      </div>
    </>
  )
}

export { AddWalletModal };

