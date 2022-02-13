import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import agent from '../../../../setup/axios/AxiosAgent';
import { IWalletModel } from '../Models/WalletInterfaces';
import AddWalletForm from '../walletformwidget/AddWalletForm';



const AddWalletModal: React.FC = () => {

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = (values: IWalletModel) => {
    setIsSubmitting(true);
    values.walletNumberId = uuid();
    agent.Wallet.create(values).then((response) => { console.log(response) });
    console.log("WW: ", values);
  };

  return (
    <>
      <div className='modal fade' id='kt_modal_addwallet' aria-hidden='true'>
        <AddWalletForm isSubmitting={isSubmitting} onSubmit={onSubmit} />
      </div>
    </>
  )
}

export { AddWalletModal };

