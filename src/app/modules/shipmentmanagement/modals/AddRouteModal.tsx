import { useState } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';
import agent from '../../../../setup/axios/AxiosAgent';
import AddRouteForm from '../shipmentformwidget/AddRouteForm';
import { IRouteModel } from '../ShipmentModels/ShipmentInterfaces';



const AddRouteModal: React.FC = () => {

  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = (values: IRouteModel) => {
    setIsSubmitting(true)
    values.routId = uuid()
    agent.Route.create(values).then((response) => {
      toast.success("User Creation Was Successful!");
      // console.log(response)
      setIsSubmitting(false)
    })
  }

  return (
    <>
      <div className='modal fade' id='kt_modal_addroute' aria-hidden='true'>
        <AddRouteForm isSubmitting={isSubmitting} onSubmit={onSubmit}  />
      </div>
    </>
  )
}

export { AddRouteModal };

