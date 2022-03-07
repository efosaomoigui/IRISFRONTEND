import {useEffect, useState} from 'react'
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

  const { entityDetailValues, selectUrlParam, setSelectUrlParam, formTitle, setFormTitle, selectValue, handleSelectValue } = usePageData()

  const setroleDAtaValues = () =>
    agent.Roles.list().then((response) => {
      // setRoleData(response)
      setLoading(false)
    }
  )

  interface dataType {
    value: string
    index: string
  }

  // handle logic
  const permisions = entityDetailValues as IPermissionModel[]

  //const selected = setSelectedValue(users)

  const handleClick = () => {
    setShowError(false)
    setShowForm(true)
    window.location.reload()
    console.log('On click', showError)
  }

  const setSelectedValue = (permisions: IPermissionModel[]) => {
    const val = permisions.find((x) => x.roleId === selectUrlParam)
    return val
  }

  const selected = setSelectedValue(permisions)
  useEffect(() => {
    setroleDAtaValues()
  }, [])

  // setroleDAtaValues()

  const onSubmit = (values: IPermissionModel) => {
    setIsSubmitting(true)
    values.roleId = uuid()

    if (selected?.roleId) {
      agent.Permissions.update(values).then((response) => {
        toast.success('Permission Update Was Successful!')
        setIsSubmitting(false)
      })
    } else {
      agent.Permissions.create(values).then((response) => {
        toast.success('Permission Creation Was Successful!')
        setInterval(() => {
          setShowForm(false)
        }, 1000)
        setIsSubmitting(false)
      })
    }
  }
  return (
    <>
      <div className='modal fade' id='kt_modal_addpermission' aria-hidden='true'>
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
      </div>
    </>
  )
}

export {EditPermissionModal}
