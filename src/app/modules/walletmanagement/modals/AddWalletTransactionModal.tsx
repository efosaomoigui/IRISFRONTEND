import { useState } from 'react';
import { Container } from 'react-bootstrap-v5';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';
import agent from '../../../../setup/axios/AxiosAgent';
import { usePageData } from '../../../../_iris/layout/core';
import { IWalletTransactionModel } from '../Models/WalletInterfaces';
import AddWalletTransactionForm from '../walletformwidget/AddWalletTransactionForm';

interface Props {
  handleSelect?: () => void
  SelectedValues?: any[]
}

const AddWalletTransactionModal: React.FC = () => {

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(true)
  const [selectWallettransaction, setSelectWallettransaction] = useState<IWalletTransactionModel>()
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [showError, setShowError] = useState(false)
  const { entityValues, selectUrlParam, setSelectUrlParam } = usePageData()

  // handle logic
  const wallettransactions = entityValues as IWalletTransactionModel[];

  const setSelectedValue = (wallettransactions: IWalletTransactionModel[]) => {
    const val = wallettransactions.find(x => x.id === selectUrlParam)
    return val;
  }

  const selected = setSelectedValue(wallettransactions);
 

  const handleClick = () => {
    setShowError(false);
    setShowForm(true);
    window.location.reload();
    console.log('On click', showError)
  }

  const onSubmit = (values: IWalletTransactionModel) => {
    setIsSubmitting(true)
    values.id = uuid()

    if (selected?.id) {
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
      <Container className='modal fade' id='kt_modal_addwallettransaction' aria-hidden='true'>
        <AddWalletTransactionForm 
        isSubmitting={isSubmitting} 
        onSubmit={onSubmit} 
        wallettransaction={selected} 
        showForm={showForm} 
          showError={showError}
          errorMessage={errorMessage}
          handleClick={handleClick}
          formTitle={'Add Wallet Transaction'} />
      </Container>
    </>
  )
}

export { AddWalletTransactionModal };

