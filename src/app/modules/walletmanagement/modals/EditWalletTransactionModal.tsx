import { useState } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';
import agent from '../../../../setup/axios/AxiosAgent';
import { usePageData } from '../../../../_iris/layout/core';
import { IWalletTransactionModel } from '../Models/WalletInterfaces';
import AddWalletTransactionForm from '../walletformwidget/AddWalletTransactionForm';
import EditWalletTransactionForm from '../walletformwidget/EditWalletTransactionForm';

interface Props {
  handleEdit?: (user: IWalletTransactionModel) => void
  SelectedValues?: any[]
}

const EditWalletTransactionModal: React.FC<Props> = ({ handleEdit, SelectedValues }: Props) => {

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(true)
  const [selectWallettransaction, setSelectWallettransaction] = useState<IWalletTransactionModel>()
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const { entityDetailValues, selectUrlParam, setSelectUrlParam, formTitle, setFormTitle, selectValue, handleSelectValue } = usePageData()

  // handle logic
  const wallettransactions = entityDetailValues as IWalletTransactionModel[];

  //const selected = setSelectedValue(users)

  const handleClick = () => {
    setShowError(false)
    setShowForm(true)
    window.location.reload()
    console.log('On click', showError)
  }

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
        setInterval(() => {
          setShowForm(false);
        }, 1000)
        setIsSubmitting(false)
      })
    } else {
      agent.WalletTransaction.create(values).then((response) => {
        toast.success('Wallet transaction Creation Was Successful!')
        setInterval(() => {
          setShowForm(false);
        }, 1000)
        setIsSubmitting(false)
      })
    }
  }
  return (
    <>
      <div className='modal fade' id='kt_modal_addwallettransaction' aria-hidden='true'>
        <EditWalletTransactionForm 
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
          wallettransaction={selectValue}
          showForm={showForm}
          showError={showError}
          errorMessage={errorMessage}
          handleClick={handleClick}
          formTitle={'Edit Permission'} />
      </div>
    </>
  )
}

export { EditWalletTransactionModal };

