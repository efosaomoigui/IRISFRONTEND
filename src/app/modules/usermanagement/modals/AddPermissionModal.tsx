import { useState } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';
import agent from '../../../../setup/axios/AxiosAgent';
import { usePageData } from '../../../../_iris/layout/core';
import { IPermissionModel } from '../../auth/models/AuthInterfaces';
import AddPermissionForm from '../userformwidget/AddPermissionForm';


const AddPermissionModal: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectPermission, setSelectPermission] = useState<IPermissionModel>()

  const { entityDetailValues, selectUrlParam, setSelectUrlParam } = usePageData()

  // handle logic
  const permisions = entityDetailValues as IPermissionModel[];

  const setSelectedValue = (permisions: IPermissionModel[]) => {
    const val = permisions.find(x => x.roleId === selectUrlParam)
    return val;
  }

  const selected = setSelectedValue(permisions);
  console.log("LOG ", (selected) ? "old permission" : "new permission");

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
        setIsSubmitting(false)
      })
    }
  }
  return (
    <>
      <div className='modal fade' id='kt_modal_addpermission' aria-hidden='true'>
        <AddPermissionForm isSubmitting={isSubmitting} onSubmit={onSubmit} permission={selected}/>
      </div>
    </>
  )
}

export { AddPermissionModal };

