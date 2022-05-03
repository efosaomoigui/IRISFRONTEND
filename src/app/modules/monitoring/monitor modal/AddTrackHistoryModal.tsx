import { useState } from 'react';
import { Container } from 'react-bootstrap-v5';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';
import agent from '../../../../setup/axios/AxiosAgent';
import { usePageData } from '../../../../_iris/layout/core';
import { ITrackHistoryModel, ITripModel } from '../Monitor models/MonitorInterface';
import AddTrackHistoryForm from '../monitorformwidget/AddTrackHistoryForm';
import AddTripForm from '../monitorformwidget/AddTripForm';

interface Props {
  handleSelect?: () => void
  SelectedValues?: any[]
}

const AddTrackHistoryModal: React.FC = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showForm, setShowForm] = useState(true)
    const [selectTrackHistory, setSelectTrackHistory] = useState<ITrackHistoryModel>()
    const [hasError, setHasError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [showError, setShowError] = useState(false)


  const { entityValues, selectUrlParam, setSelectUrlParam, formTitle, setFormTitle } =
    usePageData()

  // handle logic
    const trackHistory = entityValues as ITrackHistoryModel[];

    const setSelectedValue = (trackHistory: ITrackHistoryModel[]) => {
    const val = trackHistory.find(x => x.id === selectUrlParam)
    return val;
    }

  const selected = setSelectedValue(trackHistory);

  const handleClick = () => {
    setShowError(false);
    setShowForm(true);
    window.location.reload();
    console.log('On click', showError)
  }

  const onSubmit = (values: ITrackHistoryModel) => {

    console.log("Val: ", values);
    setIsSubmitting(true)
    // values.id = uuid()

    agent.TrackHistory.create(values)
      .then((response) => {
        if (response.validationErrors!.length > 0) {
          toast.error(response.validationErrors?.toString())
          setErrorMessage(response.validationErrors!.toString())
          setIsSubmitting(false)
          setShowError(true)
        } else {
          toast.success('Track History Creation Was Successful!')
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
        <Container className='modal fade' id='kt_modal_addtrackhistory' aria-hidden='true'>
          <AddTrackHistoryForm 
            isSubmitting={isSubmitting}
            onSubmit={onSubmit}
            trackHistory={selected}
            showForm={showForm}
            errorMessage={errorMessage}
            handleClick={handleClick}
            formTitle={'Add Track'}
             />
        </Container>
        </>
    )
}

export { AddTrackHistoryModal };

