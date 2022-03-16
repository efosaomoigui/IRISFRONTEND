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
    setIsSubmitting(true)
    values.routeId = uuid()

    if (selected?.routeId) {
      agent.Price.update(values).then((response) => {
        toast.success('price Update Was Successful!')
        setInterval(() => {
          setShowForm(false);
        }, 1000)
        setIsSubmitting(false)
      })
    } else {
      agent.Price.create(values).then((response) => {
        toast.success('price Creation Was Successful!')
        setInterval(() => {
          setShowForm(false);
        }, 1000)
        setIsSubmitting(false)
      })
    }
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

