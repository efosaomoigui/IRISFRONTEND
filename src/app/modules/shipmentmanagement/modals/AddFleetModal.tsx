import { useState } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';
import agent from '../../../../setup/axios/AxiosAgent';
import { usePageData } from '../../../../_iris/layout/core';
import AddFleetForm from '../shipmentformwidget/AddFleetForm';
import { IFleetModel } from '../ShipmentModels/ShipmentInterfaces';



const AddFleetModal: React.FC = () => {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectFleet, setSelectFleet] = useState<IFleetModel>()

  const { entityDetailValues, selectUrlParam, setSelectUrlParam } = usePageData()

  // handle logic
  const fleets = entityDetailValues as IFleetModel[];

  const setSelectedValue = (fleets: IFleetModel[]) => {
    const val = fleets.find(x => x.FleetId === selectUrlParam)
    return val;
  }

  const selected = setSelectedValue(fleets);
  console.log("LOG ", (selected) ? "old fleet" : "new fleet");

  const onSubmit = (values: IFleetModel) => {
    setIsSubmitting(true)
    values.FleetId = uuid()

    if (selected?.FleetId) {
      agent.Fleet.update(values).then((response) => {
        toast.success('fleet Update Was Successful!')
        setIsSubmitting(false)
      })
    } else {
      agent.Fleet.create(values).then((response) => {
        toast.success('fleet Creation Was Successful!')
        setIsSubmitting(false)
      })
    }
  }


  return (
    <>
      <div className='modal fade' id='kt_modal_addfleet' aria-hidden='true'>
        <AddFleetForm isSubmitting={isSubmitting} onSubmit={onSubmit} fleet={selected}/>
      </div>
    </>
  )
}

export { AddFleetModal };

