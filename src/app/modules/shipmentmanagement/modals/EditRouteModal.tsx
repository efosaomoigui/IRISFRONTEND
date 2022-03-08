import { useState } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';
import { boolean } from 'yup/lib/locale';
import agent from '../../../../setup/axios/AxiosAgent';
import { usePageData } from '../../../../_iris/layout/core';
import AddRouteForm from '../shipmentformwidget/AddRouteForm';
import EditRouteForm from '../shipmentformwidget/EditRouteForm';
import { IRouteModel } from '../ShipmentModels/ShipmentInterfaces';

interface Props {
  handleEdit?: (user: IRouteModel) => void
  SelectedValues?: any[]
}


const EditRouteModal: React.FC<Props> = ({ handleEdit, SelectedValues }: Props) => {

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(true)
  const [selectRoute, setSelectRoute] = useState<IRouteModel>()
  const [errorMessage, setErrorMessage] = useState('')
  const [showError, setShowError] = useState(false)

  const { entityDetailValues, selectUrlParam, setSelectUrlParam, formTitle, setFormTitle, selectValue, handleSelectValue } = usePageData()

  // handle logic
  const routes = entityDetailValues as IRouteModel[];

  //const selected = setSelectedValue(users)

  const handleClick = () => {
    setShowError(false)
    setShowForm(true)
    window.location.reload()
    console.log('On click', showError)
  }

  const setSelectedValue = (routes: IRouteModel[]) => {
    const val = routes.find(x => x.RouteId === selectUrlParam)
    return val;
  }

  const selected = setSelectedValue(routes);
  console.log("LOG ", (selected) ? "old Route" : "new Route");

  const onSubmit = (values: IRouteModel) => {
    setIsSubmitting(true)
    values.RouteId = uuid()
    values.IsSubRoute = Boolean(values.IsSubRoute);

    if (selected?.RouteId) {
      agent.Route.update(values).then((response) => {
        toast.success('Route Update Was Successful!')
        setInterval(() => {
          setShowForm(false);
        }, 1000)
        setIsSubmitting(false)
      })
    } else {
      agent.Route.create(values).then((response) => {
        toast.success('Route Creation Was Successful!')
        setInterval(() => {
          setShowForm(false);
        }, 1000)
        setIsSubmitting(false)
      })
    }
  }

  return (
    <>
      <div className='modal fade' id='kt_modal_addroute' aria-hidden='true'>
        <EditRouteForm 
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
          route={selectValue}
          showForm={showForm}
          showError={showError}
          errorMessage={errorMessage}
          handleClick={handleClick}
          formTitle={'Edit User'}/>
      </div>
    </>
  )
}

export { EditRouteModal };

