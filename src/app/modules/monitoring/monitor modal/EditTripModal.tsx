import { useState } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';
import agent from '../../../../setup/axios/AxiosAgent';
import { usePageData } from '../../../../_iris/layout/core';
import { ITripModel } from '../Monitor models/MonitorInterface';
import AddTripForm from '../monitorformwidget/AddTripForm';
import EditTripForm from '../monitorformwidget/EditTripForm';

interface Props {
  handleEdit?: (user: ITripModel) => void
  SelectedValues?: any[]
}

const EditTripModal: React.FC<Props> = ({ handleEdit, SelectedValues }: Props) => {

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showForm, setShowForm] = useState(true)
    const [selectTrips, setSelectTrips] = useState<ITripModel>()
    const [errorMessage, setErrorMessage] = useState('')
    const [showError, setShowError] = useState(false)

    const { entityDetailValues, selectUrlParam, setSelectUrlParam, formTitle, setFormTitle, selectValue, handleSelectValue } = usePageData()

  // handle logic
    const trips = entityDetailValues as ITripModel[];

  //const selected = setSelectedValue(users)

  const handleClick = () => {
    setShowError(false)
    setShowForm(true)
    window.location.reload()
    console.log('On click', showError)
  }

    const setSelectedValue = (trip: ITripModel[]) => {
    const val = trips.find(x => x.id === selectUrlParam)
    return val;
    }

  const selected = setSelectedValue(trips);
  console.log("LOG ", (selected) ? "old trips" : "new trips");

  const onSubmit = (values: ITripModel) => {
    setIsSubmitting(true)
    values.id = uuid()

    if (selected?.id) {
      agent.Trip.update(values).then((response) => {
        toast.success('Payment log Update Was Successful!')
        setInterval(() => {
          setShowForm(false);
        }, 1000)
        setIsSubmitting(false)
      })
    } else {
      agent.Trip.create(values).then((response) => {
        toast.success('Payment log Creation Was Successful!')
        setInterval(() => {
          setShowForm(false);
        }, 1000)
        setIsSubmitting(false)
      })
    }
  }

    return (
        <>
            <div className='modal fade' id='kt_modal_addtrip' aria-hidden='true'>
          <EditTripForm 
            isSubmitting={isSubmitting}
            onSubmit={onSubmit}
            trip={selectValue}
            showForm={showForm}
            showError={showError}
            errorMessage={errorMessage}
            handleClick={handleClick}
            formTitle={'Edit Trip'} />
            </div>
        </>
    )
}

export { EditTripModal };

