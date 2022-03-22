import { useState } from 'react';
import { Container } from 'react-bootstrap-v5';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';
import agent from '../../../../setup/axios/AxiosAgent';
import { usePageData } from '../../../../_iris/layout/core';
import AddPriceForm from '../shipmentformwidget/AddPriceForm';
import { IPriceModel } from '../ShipmentModels/ShipmentInterfaces';

interface Props {
  handleSelect?: () => void
  SelectedValues?: any[]
}

const AddPriceModal: React.FC<Props> = ({ handleSelect, SelectedValues }: Props) => {

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(true)
  const [selectPrice, setSelectPrice] = useState<IPriceModel>()
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [showError, setShowError] = useState(false)

  const { entityValues, selectUrlParam, setSelectUrlParam, formTitle, setFormTitle } =
    usePageData()

  // handle logic
  const prices = entityValues as IPriceModel[];

  const setSelectedValue = (prices: IPriceModel[]) => {
    const val = prices.find(x => x.id === selectUrlParam)
    return val;
  }

  const selected = setSelectedValue(prices);
  

  const handleClick = () => {
    setShowError(false);
    setShowForm(true);
    window.location.reload();
    console.log('On click', showError)
  }


  const onSubmit = (values: IPriceModel) => {
    values.category = Number(values.category)
    values.product = Number(values.product)
    // values.category = Number(values.category)
    setIsSubmitting(true)
    agent.Price.create(values)
    .then((response) => {
      if (response.validationErrors!.length > 0) {
        toast.error(response.validationErrors?.toString())
        setErrorMessage(response.validationErrors!.toString())
        setIsSubmitting(false)
        setShowError(true)
      } else {
        toast.success('Price Creation Was Successful!')
        setInterval(() => {
          setShowForm(false)
        }, 1000)
        setIsSubmitting(false)
        setShowError(false)
      }
    })
  }

  return (
    <>
      <Container className='modal fade' id='kt_modal_addprice' aria-hidden='true'>
        <AddPriceForm 
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
          price={selected}
          showForm={showForm}
          showError={showError}
          errorMessage={errorMessage}
          handleClick={handleClick}
          formTitle={'Add Price'} 
        />
      </Container>
    </>
  )
}

export { AddPriceModal };

