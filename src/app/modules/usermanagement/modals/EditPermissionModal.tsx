import {useEffect, useState} from 'react'
import { Container } from 'react-bootstrap-v5'
import {toast} from 'react-toastify'
import {v4 as uuid} from 'uuid'
import agent from '../../../../setup/axios/AxiosAgent'
import {usePageData} from '../../../../_iris/layout/core'
import {IPermissionModel, IRoleModel} from '../../auth/models/AuthInterfaces'
import AddPermissionForm from '../userformwidget/AddPermissionForm'
import EditPermissionForm from '../userformwidget/EditPermissionForm'

interface Props {
  handleEdit?: (user: IPermissionModel) => void
  SelectedValues?: any[]
}

const EditPermissionModal: React.FC<Props> = ({ handleEdit, SelectedValues }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectPermission, setSelectPermission] = useState<IPermissionModel>()
  const [showForm, setShowForm] = useState(true)
  const [loading, setLoading] = useState(true)
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const { entityValues, selectUrlParam, setSelectUrlParam, formTitle, setFormTitle, selectValue, handleSelectValue } = usePageData()


  // handle logic
  const permisions = entityValues as IPermissionModel[]

  //const selected = setSelectedValue(users)

  const handleClick = () => {
    setShowError(false)
    setShowForm(true)
    window.location.reload()
    console.log('On click', showError)
  }



  const onSubmit = (values: IPermissionModel) => {
    setIsSubmitting(true)
    values.roleId = uuid()

    agent.Permissions.update(values).then((response) => {
      if (response.validationErrors!.length > 0) {
        toast.error(response.validationErrors?.toString())
        setErrorMessage(response.validationErrors!.toString())
        setIsSubmitting(false)
        setShowError(true)
      } else {
        toast.success('User Update Was Successful!')
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
      <Container className='modal fade' id='kt_modal_editpermission' aria-hidden='true'>
        <EditPermissionForm
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
          permission={selectValue}
          showForm={showForm}
          showError={showError}
          errorMessage={errorMessage}
          handleClick={handleClick}
          formTitle={'Edit Permission'}
        />
      </Container>
    </>
  )
}

export {EditPermissionModal}
