import { useState } from 'react';
import { Container } from 'react-bootstrap-v5';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';
import agent from '../../../../setup/axios/AxiosAgent';
import { usePageData } from '../../../../_iris/layout/core';
import { ITrackHistoryModel, ITripModel } from '../Monitor models/MonitorInterface';
import AddTrackHistoryForm from '../monitorformwidget/AddTrackHistoryForm';
import AddTripForm from '../monitorformwidget/AddTripForm';
import EditTrackHistoryForm from '../monitorformwidget/EditTrackHistoryForm';

interface Props {
  handleEdit?: (user: ITrackHistoryModel) => void
  SelectedValues?: any[]
}

const EditTrackHistoryModal: React.FC<Props> = ({ handleEdit, SelectedValues }: Props) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showForm, setShowForm] = useState(true)
    const [selectTrackHistory, setSelectTrackHistory] = useState<ITrackHistoryModel>()
    const [errorMessage, setErrorMessage] = useState('')
    const [hasError, setHasError] = useState(false)
    const [showError, setShowError] = useState(false)

    const { entityDetailValues, selectUrlParam, setSelectUrlParam, formTitle, setFormTitle, selectValue, handleSelectValue } = usePageData()

  // handle logic
    const trackHistory = entityDetailValues as ITrackHistoryModel[];

  //const selected = setSelectedValue(users)

  const handleClick = () => {
    setShowError(false)
    setShowForm(true)
    window.location.reload()
    console.log('On click', showError)
  }

    

 

  const onSubmit = (values: ITrackHistoryModel) => {
    setIsSubmitting(true)
    values.id = uuid()

    agent.TrackHistory.update(values).then((response) => {
      if (response.validationErrors!.length > 0) {
        toast.error(response.validationErrors?.toString())
        setErrorMessage(response.validationErrors!.toString())
        setIsSubmitting(false)
        setShowError(true)
      } else {
        toast.success('Track Update Was Successful!')
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
        <Container className='modal fade' id='kt_modal_edittrackhistory' aria-hidden='true'>
          <EditTrackHistoryForm 
            isSubmitting={isSubmitting}
            onSubmit={onSubmit}
            trackHistory={selectValue}
            showForm={showForm}
            showError={showError}
            errorMessage={errorMessage}
            handleClick={handleClick}
            formTitle={'Edit Track History'} 
            />
        </Container>
        </>
    )
}

export { EditTrackHistoryModal };

