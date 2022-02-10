import { useState } from 'react';
import {IUserModel} from '../../auth/models/AuthInterfaces'
import GenericForm from '../../layout/forms/GenericForm'
import {v4 as uuid} from 'uuid'

const AddUserModal: React.FC = () => {

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = (values: IUserModel) => {
    setIsSubmitting(true);
    values.userId = uuid();
    console.log("TT: ", values);
  };

  return (
    <>
      <div className='modal fade' id='kt_modal_adduser' aria-hidden='true'>
        <GenericForm isSubmitting={isSubmitting} onSubmit={onSubmit}  />
      </div>
    </>
  )
}

export { AddUserModal }

