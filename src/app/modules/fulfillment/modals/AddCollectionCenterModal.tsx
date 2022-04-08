import {useState} from 'react'
import { Container } from 'react-bootstrap-v5'
import {toast} from 'react-toastify'
import {v4 as uuid} from 'uuid'
import agent from '../../../../setup/axios/AxiosAgent'
import {usePageData} from '../../../../_iris/layout/core'
import AddCollectionForm from '../fufilmentformwidget/AddCollectionForm'
import {IFulfilmentModel} from '../models/FulfilmentInterface'

interface Props {
  handleSelect?: () => void
  SelectedValues?: any[]
}

const AddCollectionCenterModal: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(true)
  const [selectTrips, setSelectTrips] = useState<IFulfilmentModel>()
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [showError, setShowError] = useState(false)

  const {entityValues, selectUrlParam, setSelectUrlParam} = usePageData()

  // handle logic
  const collectionCenter = entityValues as IFulfilmentModel[]

  const setSelectedValue = (collectionCenter: IFulfilmentModel[]) => {
    const val = collectionCenter.find((x) => x.shipmentId === selectUrlParam)
    return val
  }

  const selected = setSelectedValue(collectionCenter)
  
  const handleClick = () => {
    setShowError(false);
    setShowForm(true);
    window.location.reload();
    console.log('On click', showError)
  }


  const onSubmit = (values: IFulfilmentModel) => {
    setIsSubmitting(true)
    // values.shipmentId = uuid() 

    agent.CollectionCenter.create(values)
      .then((response) => {
        if (response.validationErrors!.length > 0) {
          toast.error(response.validationErrors?.toString())
          setErrorMessage(response.validationErrors!.toString())
          setIsSubmitting(false)
          setShowError(true)
        } else {
          toast.success('Collection Center Creation Was Successful!')
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
      <Container className='modal fade' id='kt_modal_addcollectioncenter' aria-hidden='true'>
        <AddCollectionForm
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
          collectionCenter={selected}
          showForm={showForm}
          errorMessage={errorMessage}
          handleClick={handleClick}
          formTitle={'Add Collection Center'} 
        />
      </Container>
    </>
  )
}

export {AddCollectionCenterModal}
