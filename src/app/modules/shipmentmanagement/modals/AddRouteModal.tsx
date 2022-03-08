import { useState } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';
import { boolean } from 'yup/lib/locale';
import agent from '../../../../setup/axios/AxiosAgent';
import { usePageData } from '../../../../_iris/layout/core';
import AddRouteForm from '../shipmentformwidget/AddRouteForm';
import { IRouteModel } from '../ShipmentModels/ShipmentInterfaces';



const AddRouteModal: React.FC = () => {

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(true)
  const [selectRoute, setSelectRoute] = useState<IRouteModel>()
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [showError, setShowError] = useState(false)

  const { entityDetailValues, selectUrlParam, setSelectUrlParam } = usePageData()

  // handle logic
  const routes = entityDetailValues as IRouteModel[];

  const setSelectedValue = (routes: IRouteModel[]) => {
    const val = routes.find(x => x.RouteId === selectUrlParam)
    return val;
  }

  const selected = setSelectedValue(routes);
  console.log("LOG ", (selected) ? "old Route" : "new Route");

  const onSubmit = (values: IRouteModel) => {
    setIsSubmitting(true)
    values.RouteId = uuid()

    agent.Route.create(values)
      .then((response) => {
        if (response.validationErrors!.length > 0) {
          toast.error(response.validationErrors?.toString())
          setErrorMessage(response.validationErrors!.toString())
          setIsSubmitting(false)
          setShowError(true)
        } else {
          toast.success('User Creation Was Successful!')
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
      <div className='modal fade' id='kt_modal_addroute' aria-hidden='true'>
        <AddRouteForm isSubmitting={isSubmitting} onSubmit={onSubmit} route={selected} showForm={showForm} />
      </div>
    </>
  )
}

export { AddRouteModal };

