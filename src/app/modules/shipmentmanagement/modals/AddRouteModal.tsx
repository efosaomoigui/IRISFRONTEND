import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import AddRouteForm from '../shipmentformwidget/AddRouteForm';
import { IRouteModel } from '../ShipmentModels/ShipmentInterfaces';



const AddRouteModal: React.FC = () => {

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = (values: IRouteModel) => {
    setIsSubmitting(true);
    values.RouteId = uuid();
    console.log("TT: ", values);
  };

  return (
    <>
      <div className='modal fade' id='kt_modal_addroute' aria-hidden='true'>
        <AddRouteForm isSubmitting={isSubmitting} onSubmit={onSubmit}  />
      </div>
    </>
  )
}

export { AddRouteModal };

