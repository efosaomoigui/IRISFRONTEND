import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { IRoleModel } from '../../auth/models/AuthInterfaces';
import AddRoleForm from '../userformwidget/AddRoleForm';



const AddRoleModal: React.FC = () => {

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = (values: IRoleModel) => {
    setIsSubmitting(true);
    values.id = uuid();
    console.log("TT: ", values);
  };

  return (
    <>
      <div className='modal fade' id='kt_modal_addrole' aria-hidden='true'>
        <AddRoleForm isSubmitting={isSubmitting} onSubmit={onSubmit} />
      </div>
    </>
  )
}

export { AddRoleModal };

