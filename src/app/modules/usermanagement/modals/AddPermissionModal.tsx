import {useEffect, useState} from 'react'
import {toast} from 'react-toastify'
import {v4 as uuid} from 'uuid'
import agent from '../../../../setup/axios/AxiosAgent'
import {usePageData} from '../../../../_iris/layout/core'
import {IPermissionModel, IRoleModel} from '../../auth/models/AuthInterfaces'
import AddPermissionForm from '../userformwidget/AddPermissionForm'

const AddPermissionModal: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectPermission, setSelectPermission] = useState<IPermissionModel>()
  const [showForm, setShowForm] = useState(true)
  const [loading, setLoading] = useState(true)

  const {entityDetailValues, selectUrlParam, setSelectUrlParam} =
    usePageData()

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
        <AddPermissionForm
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
          permission={selected}
          showForm={showForm}
          // systemRoles={}
        />
      </div>
    </>
  )
}

export {AddPermissionModal}
