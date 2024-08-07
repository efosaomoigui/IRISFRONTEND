import { useState } from 'react';
import { Container } from 'react-bootstrap-v5';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';
import agent from '../../../../setup/axios/AxiosAgent';
import { usePageData } from '../../../../_iris/layout/core';
import { FleetType } from '../../auth/models/AuthInterfaces';
import AddFleetForm from '../shipmentformwidget/AddFleetForm';
import AddFleetForm1 from '../shipmentformwidget/AddFleetForm1';
import { IFleetModel } from '../ShipmentModels/ShipmentInterfaces';

interface Props {
  handleSelect?: () => void
  SelectedValues?: any[]
}

const AddFleetModal1: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(true)
  const [selectFleet, setSelectFleet] = useState<IFleetModel>()
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [showError, setShowError] = useState(false)

  const { entityValues, selectUrlParam, setSelectUrlParam } = usePageData()

  // handle logic
  const fleets = entityValues as IFleetModel[];

  const setSelectedValue = (fleets: IFleetModel[]) => {
    const val = fleets.find(x => x.fleetId === selectUrlParam)
    return val;
  }

  const selected = setSelectedValue(fleets);
  
  const handleClick = () => {
    setShowError(false);
    setShowForm(true);
    window.location.reload();
    console.log('On click', showError)
  }

  const onSubmit = (values: IFleetModel) => {
    setIsSubmitting(true)
    values.fleetId = uuid() 
    values.status = true 
    values.fleetType = Number(values.fleetType)
    // values.ownerId = Number(values.fleetType)
    console.log("values.owner ", values.ownerId)

    agent.Fleet.create(values)
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
      <Container className='modal fade' id='kt_modal_addfleet1' aria-hidden='true'>
        <AddFleetForm1 
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
          fleet={selected}
          showForm={showForm}
          showError={showError}
          errorMessage={errorMessage}
          handleClick={handleClick}
          formTitle={'Add User'}
           />
      </Container>
    </>
  )
}

export { AddFleetModal1 };

