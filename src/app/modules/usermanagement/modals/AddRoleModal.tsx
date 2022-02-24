import { useState } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';
import agent from '../../../../setup/axios/AxiosAgent';
import { usePageData } from '../../../../_iris/layout/core';
import { IRoleModel } from '../../auth/models/AuthInterfaces';
import AddRoleForm from '../userformwidget/AddRoleForm';



const AddRoleModal: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectRoles, setSelectRoles] = useState<IRoleModel>()

  const { entityDetailValues, selectUrlParam, setSelectUrlParam } = usePageData()

  // handle logic
  const roles = entityDetailValues as IRoleModel[];

  const setSelectedValue = (roles: IRoleModel[]) => {
    const val = roles.find(x => x.id === selectUrlParam)
    return val;
  }

  const selected = setSelectedValue(roles);
  console.log("LOG ", (selected) ? "old role" : "new role");

  const onSubmit = (values: IRoleModel) => {
    setIsSubmitting(true)
    values.id = uuid()

    if (selected?.id) {
      agent.Roles.update(values).then((response) => {
        toast.success('role Update Was Successful!')
        setIsSubmitting(false)
      })
    } else {
      agent.Roles.create(values).then((response) => {
        toast.success('role Creation Was Successful!')
        setIsSubmitting(false)
      })
    }
  }


  return (
    <>
      <div className='modal fade' id='kt_modal_addrole' aria-hidden='true'>
        <AddRoleForm isSubmitting={isSubmitting} onSubmit={onSubmit} role={selected}/>
      </div>
    </>
  )
}

export { AddRoleModal };

