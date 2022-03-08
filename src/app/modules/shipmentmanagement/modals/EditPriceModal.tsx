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
  const [errorMessage, setErrorMessage] = useState('')
  const [showError, setShowError] = useState(false)

  const { entityDetailValues, selectUrlParam, setSelectUrlParam, formTitle, setFormTitle, selectValue, handleSelectValue } = usePageData()

  // handle logic
  const prices = entityDetailValues as IPriceModel[];

  //const selected = setSelectedValue(users)

  const handleClick = () => {
    setShowError(false)
    setShowForm(true)
    window.location.reload()
    console.log('On click', showError)
  }

  const setSelectedValue = (prices: IPriceModel[]) => {
    const val = prices.find(x => x.id === selectUrlParam)
    return val;
  }

  const selected = setSelectedValue(prices);
  console.log("LOG ", (selected) ? "old price" : "new price");

  const onSubmit = (values: IPriceModel) => {
    setIsSubmitting(true)
    values.RouteId = uuid()

    if (selected?.RouteId) {
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
      <div className='modal fade' id='kt_modal_addprice' aria-hidden='true'>
        <EditPriceForm 
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
          price={selectValue}
          showForm={showForm}
          showError={showError}
          errorMessage={errorMessage}
          handleClick={handleClick}
          formTitle={'Edit User'}/>
      </div>
    </>
  )
}

export { EditPriceModal };

