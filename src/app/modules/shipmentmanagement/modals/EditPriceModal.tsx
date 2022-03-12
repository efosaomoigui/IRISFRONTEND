import { useState } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';
import agent from '../../../../setup/axios/AxiosAgent';
import { usePageData } from '../../../../_iris/layout/core';
import AddPriceForm from '../shipmentformwidget/AddPriceForm';
import EditPriceForm from '../shipmentformwidget/EditPriceForm';
import { IPriceModel } from '../ShipmentModels/ShipmentInterfaces';

interface Props {
  handleEdit?: (user: IPriceModel) => void
  SelectedValues?: any[]
}

const EditPriceModal: React.FC<Props> = ({ handleEdit, SelectedValues }: Props) => {

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(true)
  const [selectPrice, setSelectPrice] = useState<IPriceModel>()
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [showError, setShowError] = useState(false)

  const { entityValues, selectUrlParam, setSelectUrlParam, formTitle, setFormTitle, selectValue, handleSelectValue } = usePageData()

  // handle logic
  const prices = entityValues as IPriceModel[];

  //const selected = setSelectedValue(users)

  const handleClick = () => {
    setShowError(false)
    setShowForm(true)
    window.location.reload()
    console.log('On click', showError)
  }

  // const setSelectedValue = (prices: IPriceModel[]) => {
  //   const val = prices.find(x => x.RouteId === selectUrlParam)
  //   return val;
  // }

  

  // const selected = setSelectedValue(prices);
  // console.log("LOG ", (selected) ? "old price" : "new price");

  const onSubmit = (values: IPriceModel) => {
    setIsSubmitting(true)
    values.RouteId = uuid()

    agent.Price.update(values).then((response) => {
      if (response.validationErrors!.length > 0) {
        toast.error(response.validationErrors?.toString())
        setErrorMessage(response.validationErrors!.toString())
        setIsSubmitting(false)
        setShowError(true)
      } else {
        toast.success('Price Update Was Successful!')
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
      <div className='modal fade' id='kt_modal_editprice' aria-hidden='true'>
        <EditPriceForm 
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
          price={selectValue}
          showForm={showForm}
          showError={showError}
          errorMessage={errorMessage}
          handleClick={handleClick}
          formTitle={'Edit Price'}/>
      </div>
    </>
  )
}

export { EditPriceModal };

