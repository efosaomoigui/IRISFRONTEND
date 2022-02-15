import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import AddPriceForm from '../shipmentformwidget/AddPriceForm';
import { IPriceModel } from '../ShipmentModels/ShipmentInterfaces';



const AddPriceModal: React.FC = () => {

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = (values: IPriceModel) => {
    setIsSubmitting(true);
    values.Id = uuid();
    console.log("TT: ", values);
  };

  return (
    <>
      <div className='modal fade' id='kt_modal_addfleet' aria-hidden='true'>
        <AddPriceForm isSubmitting={isSubmitting} onSubmit={onSubmit}  />
      </div>
    </>
  )
}

export { AddPriceModal };

