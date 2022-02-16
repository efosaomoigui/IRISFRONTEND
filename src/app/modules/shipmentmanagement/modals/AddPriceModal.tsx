import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import agent from '../../../../setup/axios/AxiosAgent';
import AddPriceForm from '../shipmentformwidget/AddPriceForm';
import { IPriceModel } from '../ShipmentModels/ShipmentInterfaces';



const AddPriceModal: React.FC = () => {

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = (values: IPriceModel) => {
    setIsSubmitting(true);
    values.id = uuid();
    agent.Price.create(values).then((response) => console.log(response));
    console.log("TT: ", values);
  };

  return (
    <>
      <div className='modal fade' id='kt_modal_addprice' aria-hidden='true'>
        <AddPriceForm isSubmitting={isSubmitting} onSubmit={onSubmit}  />
      </div>
    </>
  )
}

export { AddPriceModal };

