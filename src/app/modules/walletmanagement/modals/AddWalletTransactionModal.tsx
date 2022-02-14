import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import agent from '../../../../setup/axios/AxiosAgent';
import { IWalletTransactionModel } from '../Models/WalletInterfaces';
import AddWalletTransactionForm from '../walletformwidget/AddWalletTransactionForm';



const AddWalletTransactionModal: React.FC = () => {

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = (values: IWalletTransactionModel) => {
    setIsSubmitting(true);
    values.walletNumberId = uuid();
    agent.WalletTransaction.create(values).then((response) => { console.log(response) });
    console.log("WT: ", values);
  };

  return (
    <>
      <div className='modal fade' id='kt_modal_addwallettransaction' aria-hidden='true'>
        <AddWalletTransactionForm isSubmitting={isSubmitting} onSubmit={onSubmit} />
      </div>
    </>
  )
}

export { AddWalletTransactionModal };

