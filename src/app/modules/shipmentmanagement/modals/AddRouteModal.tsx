import { useState } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';
import { boolean } from 'yup/lib/locale';
import agent from '../../../../setup/axios/AxiosAgent';
import { usePageData } from '../../../../_iris/layout/core';
import AddRouteForm from '../shipmentformwidget/AddRouteForm';
import { IRouteModel } from '../ShipmentModels/ShipmentInterfaces';

interface Props {
  handleSelect?: () => void
  SelectedValues?: any[]
}

const AddRouteModal: React.FC<Props> = ({ handleSelect, SelectedValues }: Props) => {

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(true)
  const [selectRoute, setSelectRoute] = useState<IRouteModel>()
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [showError, setShowError] = useState(false)

  const { entityValues, selectUrlParam, setSelectUrlParam, formTitle, setFormTitle } =
    usePageData()

  // handle logic
  const route = entityValues as IRouteModel[]

  const setSelectedValue = (route: IRouteModel[]) => {
    const val = route.find((x) => x.routeId === selectUrlParam)
    return val
  }

  const selected = setSelectedValue(route)

  const handleClick = () => {
    setShowError(false);
    setShowForm(true);
    window.location.reload();
    console.log('On click', showError)
  }

  const onSubmit = (values: IRouteModel) => {
    setIsSubmitting(true)
    // values.routeId = uuid()

    agent.Route.create(values)
      .then((response) => {
        if (response.validationErrors!.length > 0) {
          toast.error(response.validationErrors?.toString())
          setErrorMessage(response.validationErrors!.toString())
          setIsSubmitting(false)
          setShowError(true)
        } else {
          toast.success('Route Creation Was Successful!')
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
        <AddRouteForm isSubmitting={isSubmitting}
          onSubmit={onSubmit} 
          route={selected} 
          showForm={showForm} 
          showError={showError}
          errorMessage={errorMessage}
          handleClick={handleClick}
          formTitle={'Add Route'}/>
      </div>
    </>
  )
}

export { AddRouteModal };

