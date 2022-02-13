import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import agent from '../../../../setup/axios/AxiosAgent';
import { IPermissionModel } from '../../auth/models/AuthInterfaces';
import AddPermissionForm from '../userformwidget/AddPermissionForm';


const AddPermissionModal: React.FC = () => {

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = (values: IPermissionModel) => {
    setIsSubmitting(true);
    values.id = uuid();
    agent.Permissions.create(values).then((response) => console.log(response));
    console.log("PP: ", values);
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

