import { useState } from 'react';
import { Container } from 'react-bootstrap-v5';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';
import { boolean } from 'yup/lib/locale';
import agent from '../../../../setup/axios/AxiosAgent';
import { usePageData } from '../../../../_iris/layout/core';
import AddRouteForm from '../shipmentformwidget/AddRouteForm';
import EditRouteForm from '../shipmentformwidget/EditRouteForm';
import { IRouteModel } from '../ShipmentModels/ShipmentInterfaces';

interface Props {
  handleEdit?: (user: IRouteModel) => void
  SelectedValues?: any[]
}


const EditRouteModal: React.FC<Props> = ({ handleEdit, SelectedValues }: Props) => {

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(true)
  const [selectRoute, setSelectRoute] = useState<IRouteModel>()
  const [errorMessage, setErrorMessage] = useState('')
  const [showError, setShowError] = useState(false)

  const { entityDetailValues, selectUrlParam, setSelectUrlParam, formTitle, setFormTitle, selectValue, handleSelectValue } = usePageData()

  // handle logic
  const routes = entityDetailValues as IRouteModel[];

  //const selected = setSelectedValue(users)

  const handleClick = () => {
    setShowError(false)
    setShowForm(true)
    window.location.reload()
    console.log('On click', showError)
  }

  const onSubmit = (values: IRouteModel) => {
    setIsSubmitting(true)
    values.RouteId = uuid()

    agent.Route.update(values).then((response) => {
      if (response.validationErrors!.length > 0) {
        toast.error(response.validationErrors?.toString())
        setErrorMessage(response.validationErrors!.toString())
        setIsSubmitting(false)
        setShowError(true)
      } else {
        toast.success('Route Update Was Successful!')
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
      <Container className='modal fade' id='kt_modal_addroute' aria-hidden='true'>
        <EditRouteForm 
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
          route={selectValue}
          showForm={showForm}
          showError={showError}
          errorMessage={errorMessage}
          handleClick={handleClick}
          formTitle={'Edit Route'}/>
      </Container>
    </>
  )
}

export { EditRouteModal };

