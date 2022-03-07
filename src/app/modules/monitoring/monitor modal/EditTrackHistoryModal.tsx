import { useState } from 'react';
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

    const setSelectedValue = (trackHistory: ITrackHistoryModel[]) => {
    const val = trackHistory.find(x => x.id === selectUrlParam)
    return val;
    }

  const selected = setSelectedValue(trackHistory);
  console.log("LOG ", (selected) ? "old Track History" : "new Track History");

  const onSubmit = (values: ITrackHistoryModel) => {
    setIsSubmitting(true)
    values.id = uuid()

    if (selected?.id) {
      agent.TrackHistory.update(values).then((response) => {
        toast.success('Track History Update Was Successful!')
        setInterval(() => {
          setShowForm(false);
        }, 1000)
        setIsSubmitting(false)
      })
    } else {
      agent.TrackHistory.create(values).then((response) => {
        toast.success('Track History Creation Was Successful!')
        setInterval(() => {
          setShowForm(false);
        }, 1000)
      })
    }
  }

    return (
        <>
            <div className='modal fade' id='kt_modal_addtrackhistory' aria-hidden='true'>
          <EditTrackHistoryForm 
            isSubmitting={isSubmitting}
            onSubmit={onSubmit}
            trackHistory={selectValue}
            showForm={showForm}
            showError={showError}
            errorMessage={errorMessage}
            handleClick={handleClick}
            formTitle={'Edit Track History'} />
            </div>
        </>
    )
}

export { EditTrackHistoryModal };

