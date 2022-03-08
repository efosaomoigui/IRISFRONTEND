import {useState} from 'react'
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

  const { entityDetailValues, selectUrlParam, setSelectUrlParam, formTitle, setFormTitle, selectValue, handleSelectValue } = usePageData()

  // handle logic
  const collectionCenter = entityDetailValues as IFulfilmentModel[]

  //const selected = setSelectedValue(users)

  const handleClick = () => {
    setShowError(false)
    setShowForm(true)
    window.location.reload()
    console.log('On click', showError)
  }

  const setSelectedValue = (collectionCenter: IFulfilmentModel[]) => {
    const val = collectionCenter.find((x) => x.Id === selectUrlParam)
    return val
  }

  const selected = setSelectedValue(collectionCenter)
  console.log('LOG ', selected ? 'old collectioncenter' : 'new collectioncenter')

  const onSubmit = (values: IFulfilmentModel) => {
    setIsSubmitting(true)
    values.Id = uuid()

    if (selected?.Id) {
      agent.CollectionCenter.update(values).then((response) => {
        toast.success('Collection Center Update Was Successful!')
        setInterval(() => {
          setShowForm(false)
        }, 1000)
        setIsSubmitting(false)
      })
    } else {
      agent.CollectionCenter.create(values).then((response) => {
        toast.success('Collection Center Creation Was Successful!')
        setIsSubmitting(false)
        setInterval(() => {
          setShowForm(false)
        }, 1000)
        setIsSubmitting(false)
      })
    }
  }

  return (
    <>
      <div className='modal fade' id='kt_modal_addcollectioncenter' aria-hidden='true'>
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
      </div>
    </>
  )
}

export { EditCollectionCenterModal}
