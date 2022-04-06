import { useState } from 'react';
import { Container } from 'react-bootstrap-v5';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';
import agent from '../../../../setup/axios/AxiosAgent';
import { usePageData } from '../../../../_iris/layout/core';
import AddFleetForm from '../shipmentformwidget/AddFleetForm';
import EditFleetForm from '../shipmentformwidget/EditFleetForm';
import { IFleetModel } from '../ShipmentModels/ShipmentInterfaces';

interface Props {
  handleEdit?: (user: IFleetModel) => void
  SelectedValues?: any[]
}

const EditFleetModal: React.FC<Props> = ({ handleEdit, SelectedValues }: Props) => {

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(true)
  const [selectFleet, setSelectFleet] = useState<IFleetModel>()
  const [errorMessage, setErrorMessage] = useState('')
  const [hasError, setHasError] = useState(false)
  const [showError, setShowError] = useState(false)

  const { entityValues, selectUrlParam, setSelectUrlParam, formTitle, setFormTitle, selectValue, handleSelectValue } = usePageData()

  // handle logic
  const fleets = entityValues as IFleetModel[];

  //const selected = setSelectedValue(users)

  const handleClick = () => {
    setShowError(false)
    setShowForm(true)
    window.location.reload()
    console.log('On click', showError)
  }

  

  const onSubmit = (values: IFleetModel) => {
    setIsSubmitting(true)
    // values.fleetId = uuid()

    agent.Fleet.update(values).then((response) => {
      if (response.validationErrors!.length > 0) {
        toast.error(response.validationErrors?.toString())
        setErrorMessage(response.validationErrors!.toString())
        setIsSubmitting(false)
        setShowError(true)
      } else {
        toast.success('Fleet Update Was Successful!')
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
      <Container className='modal fade' id='kt_modal_editfleet' aria-hidden='true'>
        <EditFleetForm 
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
          fleet={selectValue}
          showForm={showForm}
          showError={showError}
          errorMessage={errorMessage}
          handleClick={handleClick}
          formTitle={'Edit Fleet'}
        />
      </Container>
    </>
  )
}

export { EditFleetModal };

