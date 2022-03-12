import {useState} from 'react'
import { Container } from 'react-bootstrap-v5'
import {toast} from 'react-toastify'
import {v4 as uuid} from 'uuid'
import agent from '../../../../setup/axios/AxiosAgent'
import {usePageData} from '../../../../_iris/layout/core'
import AddCollectionForm from '../fufilmentformwidget/AddCollectionForm'
import EditCollectionForm from '../fufilmentformwidget/EditCollectionForm'
import {IFulfilmentModel} from '../models/FulfilmentInterface'

interface Props {
  handleEdit?: (user: IFulfilmentModel) => void
  SelectedValues?: any[]
}

const EditCollectionCenterModal: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(true)
  const [selectTrips, setSelectTrips] = useState<IFulfilmentModel>()
  const [errorMessage, setErrorMessage] = useState('')
  const [showError, setShowError] = useState(false)

  const { entityValues, selectUrlParam, setSelectUrlParam, formTitle, setFormTitle, selectValue, handleSelectValue } = usePageData()

  // handle logic
  const collectionCenter = entityValues as IFulfilmentModel[]

  //const selected = setSelectedValue(users)

  const handleClick = () => {
    setShowError(false)
    setShowForm(true)
    window.location.reload()
    console.log('On click', showError)
  }


  const onSubmit = (values: IFulfilmentModel) => {
    setIsSubmitting(true)
    values.shipmentId = uuid()

    agent.CollectionCenter.update(values).then((response) => {
      if (response.validationErrors!.length > 0) {
        toast.error(response.validationErrors?.toString())
        setErrorMessage(response.validationErrors!.toString())
        setIsSubmitting(false)
        setShowError(true)
      } else {
        toast.success('Collection Center Update Was Successful!')
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
      <Container className='modal fade' id='kt_modal_editcollectioncenter' aria-hidden='true'>
        <EditCollectionForm
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
          collectionCenter={selectValue}
          showForm={showForm}
          showError={showError}
          errorMessage={errorMessage}
          handleClick={handleClick}
          formTitle={'Edit Collection Center'}
        />
      </Container>
    </>
  )
}

export { EditCollectionCenterModal}
