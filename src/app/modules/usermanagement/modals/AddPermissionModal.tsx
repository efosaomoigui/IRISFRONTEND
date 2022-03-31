import {useEffect, useState} from 'react'
import { Container } from 'react-bootstrap-v5'
import {toast} from 'react-toastify'
import {v4 as uuid} from 'uuid'
import agent from '../../../../setup/axios/AxiosAgent'
import {usePageData} from '../../../../_iris/layout/core'
import {IPermissionModel, IRoleModel} from '../../auth/models/AuthInterfaces'
import AddPermissionForm from '../userformwidget/AddPermissionForm'

interface Props {
  handleSelect?: () => void
  SelectedValues?: any[]
}

const AddPermissionModal: React.FC<Props> = ({ handleSelect, SelectedValues }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectPermission, setSelectPermission] = useState<IPermissionModel>()
  const [showForm, setShowForm] = useState(true)
  const [loading, setLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [showError, setShowError] = useState(false)

  const { entityValues, selectUrlParam, setSelectUrlParam, formTitle, setFormTitle } =
    usePageData()


  // handle logic
  const permisions = entityValues as IPermissionModel[]

  const setSelectedValue = (permissions: IPermissionModel[]) => {
    const val = permissions.find((x) => x.roleId === selectUrlParam)
    return val
  }

  const selected = setSelectedValue(permisions)

  const handleClick = () => {
    setShowError(false);
    setShowForm(true);
    window.location.reload();
  }

  const onSubmit = (values: IPermissionModel) => {
    setIsSubmitting(true)
    // values.roleId = uuid()
    values.claimType = values.claimValue

    agent.Permissions.create(values)
      .then((response) => {
        if (response.validationErrors!.length > 0) {
          toast.error(response.validationErrors?.toString())
          setErrorMessage(response.validationErrors!.toString())
          setIsSubmitting(false)
          setShowError(true)
        } else {
          toast.success('Permission Creation Was Successful!')
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
      <Container className='modal fade' id='kt_modal_addpermission' aria-hidden='true'>
        <AddPermissionForm
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
          permission={selected}
          showForm={showForm}
          showError={showError}
          errorMessage={errorMessage}
          handleClick={handleClick}
          formTitle={'Add permission to Role'}
        />
      </Container>
    </>
  )
}

export {AddPermissionModal}
