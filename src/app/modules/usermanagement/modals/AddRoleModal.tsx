import { useState } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';
import agent from '../../../../setup/axios/AxiosAgent';
import { IRoleModel } from '../../auth/models/AuthInterfaces';
import AddRoleForm from '../userformwidget/AddRoleForm';



const AddRoleModal: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = (values: IRoleModel) => {
    setIsSubmitting(true)
    values.id = uuid()
    agent.Roles.create(values).then((response) => {
      toast.success("Role Creation Was Successful!");
      // console.log(response)
      setIsSubmitting(false)
    })
  }

  return (
    <>
      <div className='modal fade' id='kt_modal_addrole' aria-hidden='true'>
        <AddRoleForm isSubmitting={isSubmitting} onSubmit={onSubmit} />
      </div>
    </>
  )
}

export { AddRoleModal };

