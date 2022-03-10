import { useState } from 'react';
import { Container } from 'react-bootstrap-v5';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';
import agent from '../../../../setup/axios/AxiosAgent';
import { usePageData } from '../../../../_iris/layout/core';
import { ITripModel } from '../Monitor models/MonitorInterface';
import AddTripForm from '../monitorformwidget/AddTripForm';

interface Props {
  handleSelect?: () => void
  SelectedValues?: any[]
}

const AddTripModal: React.FC<Props> = ({ handleSelect, SelectedValues }: Props) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showForm, setShowForm] = useState(true)
    const [selectTrips, setSelectTrips] = useState<ITripModel>()
    const [hasError, setHasError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [showError, setShowError] = useState(false)

  const { entityDetailValues, selectUrlParam, setSelectUrlParam, formTitle, setFormTitle } =
    usePageData()
  
    // handle logic
    const trips = entityDetailValues as ITripModel[];

    const setSelectedValue = (trip: ITripModel[]) => {
    const val = trips.find(x => x.id === selectUrlParam)
    return val;
    }

  const selected = setSelectedValue(trips);

  const handleClick = () => {
    setShowError(false);
    setShowForm(true);
    window.location.reload();
    console.log('On click', showError)
  }
  

  const onSubmit = (values: ITripModel) => {
    setIsSubmitting(true)
    values.id = uuid()

    agent.Trip.create(values)
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
        <Container className='modal fade' id='kt_modal_addtrip' aria-hidden='true'>
          <AddTripForm 
          isSubmitting={isSubmitting} 
          onSubmit={onSubmit} 
          trip={selected} 
          showForm={showForm}
          showError={showError}
          errorMessage={errorMessage}
          handleClick={handleClick}
          formTitle={'Add Trip'} 
          />
        </Container>
        </>
    )
}

export { AddTripModal };

