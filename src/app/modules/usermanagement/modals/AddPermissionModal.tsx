import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { IPermissionModel } from '../../auth/models/AuthInterfaces';
import AddPermissionForm from '../userformwidget/AddPermissionForm';


const AddPermissionModal: React.FC = () => {

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = (values: IPermissionModel) => {
    setIsSubmitting(true);
    values.id = uuid();
    console.log("TT: ", values);
  };

  return (
    <>
      <div className='modal fade' id='kt_modal_addpermission' aria-hidden='true'>
        <AddPermissionForm isSubmitting={isSubmitting} onSubmit={onSubmit} />
      </div>
    </>
  )
}

export { AddPermissionModal };

