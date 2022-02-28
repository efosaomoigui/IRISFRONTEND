import { useState } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';
import agent from '../../../../setup/axios/AxiosAgent';
import { usePageData } from '../../../../_iris/layout/core';
import { ITrackHistoryModel, ITripModel } from '../Monitor models/MonitorInterface';
import AddTrackHistoryForm from '../monitorformwidget/AddTrackHistoryForm';
import AddTripForm from '../monitorformwidget/AddTripForm';



const AddTrackHistoryModal: React.FC = () => {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showForm, setShowForm] = useState(true)
    const [selectTrackHistory, setSelectTrackHistory] = useState<ITrackHistoryModel>()
    const { entityDetailValues, selectUrlParam, setSelectUrlParam } = usePageData()

  // handle logic
    const trackHistory = entityDetailValues as ITrackHistoryModel[];

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
          <AddTrackHistoryForm isSubmitting={isSubmitting} onSubmit={onSubmit} trackHistory={selected} showForm={showForm} />
            </div>
        </>
    )
}

export { AddTrackHistoryModal };

