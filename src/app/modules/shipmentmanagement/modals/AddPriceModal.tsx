import { useState } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';
import agent from '../../../../setup/axios/AxiosAgent';
import { usePageData } from '../../../../_iris/layout/core';
import AddPriceForm from '../shipmentformwidget/AddPriceForm';
import { IPriceModel } from '../ShipmentModels/ShipmentInterfaces';



const AddPriceModal: React.FC = () => {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectPrice, setSelectPrice] = useState<IPriceModel>()

  const { entityDetailValues, selectUrlParam, setSelectUrlParam } = usePageData()

  // handle logic
  const prices = entityDetailValues as IPriceModel[];

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
        setIsSubmitting(false)
      })
    } else {
      agent.Price.create(values).then((response) => {
        toast.success('price Creation Was Successful!')
        setIsSubmitting(false)
      })
    }
  }

  return (
    <>
      <div className='modal fade' id='kt_modal_addprice' aria-hidden='true'>
        <AddPriceForm isSubmitting={isSubmitting} onSubmit={onSubmit} price={selected}/>
      </div>
    </>
  )
}

export { AddPriceModal };

