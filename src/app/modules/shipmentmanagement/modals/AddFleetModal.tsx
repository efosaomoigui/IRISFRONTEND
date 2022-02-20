import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import AddFleetForm from '../shipmentformwidget/AddFleetForm';
import { IFleetModel } from '../ShipmentModels/ShipmentInterfaces';



const AddFleetModal: React.FC = () => {

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = (values: IFleetModel) => {
    setIsSubmitting(true);
    values.id = uuid();
    console.log("TT: ", values);
  };

  return (
    <>
      <div className='modal fade' id='kt_modal_addfleet' aria-hidden='true'>
        <AddFleetForm isSubmitting={isSubmitting} onSubmit={onSubmit}  />
      </div>
    </>
  )
}

export { AddFleetModal };

