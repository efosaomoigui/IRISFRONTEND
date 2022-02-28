import { useState } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';
import agent from '../../../../setup/axios/AxiosAgent';
import { usePageData } from '../../../../_iris/layout/core';
import { ITripModel } from '../Monitor models/MonitorInterface';
import AddTripForm from '../monitorformwidget/AddTripForm';



const AddTripModal: React.FC = () => {

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showForm, setShowForm] = useState(true)
    const [selectTrips, setSelectTrips] = useState<ITripModel>()

    const { entityDetailValues, selectUrlParam, setSelectUrlParam } = usePageData()

  // handle logic
    const trips = entityDetailValues as ITripModel[];

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
          <AddTripForm isSubmitting={isSubmitting} onSubmit={onSubmit} trip={selected} showForm={showForm} />
            </div>
        </>
    )
}

export { AddTripModal };

