import { useState } from 'react';
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
        setInterval(() => {
          setShowForm(false);
        }, 1000)
        setIsSubmitting(false)
      })
    } else {
      agent.Fleet.create(values).then((response) => {
        toast.success('fleet Creation Was Successful!')
        setInterval(() => {
          setShowForm(false);
        }, 1000)
        setIsSubmitting(false)
      })
    }
  }


  return (
    <>
      <div className='modal fade' id='kt_modal_addfleet' aria-hidden='true'>
        <EditFleetForm 
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
          fleet={selectValue}
          showForm={showForm}
          showError={showError}
          errorMessage={errorMessage}
          handleClick={handleClick}
          formTitle={'Edit User'}/>
      </div>
    </>
  )
}

export { EditFleetModal };

