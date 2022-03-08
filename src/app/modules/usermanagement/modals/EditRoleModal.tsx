import { useState } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';
import agent from '../../../../setup/axios/AxiosAgent';
import { usePageData } from '../../../../_iris/layout/core';
import { IRoleModel } from '../../auth/models/AuthInterfaces';
import AddRoleForm from '../userformwidget/AddRoleForm';
import EditRoleForm from '../userformwidget/EditRoleForm';

interface Props {
  handleEdit?: (user: IRoleModel) => void
  SelectedValues?: any[]
}

const EditRoleModal: React.FC<Props> = ({ handleEdit, SelectedValues }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectPermission, setSelectPermission] = useState<IRoleModel>()
  const [showForm, setShowForm] = useState(true)
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const { entityDetailValues, selectUrlParam, setSelectUrlParam, formTitle, setFormTitle, selectValue, handleSelectValue } = usePageData()

  //const selected = setSelectedValue(users)

  const handleClick = () => {
    setShowError(false)
    setShowForm(true)
    window.location.reload()
    console.log('On click', showError)
  }


  const onSubmit = (values: IRoleModel) => {
    setIsSubmitting(true)
    values.id = uuid()
    agent.Roles.create(values).then((response) => {
      toast.success("Role Creation Was Successful!"); 
      setInterval(()=>{
        setShowForm(false);
      }, 1000)
      // console.log(response)
      setIsSubmitting(false)
    })
  }

  return (
    <>
      <div className='modal fade' id='kt_modal_addrole' aria-hidden='true'>
        <EditRoleForm 
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
          role={selectValue}
          showForm={showForm}
          showError={showError}
          errorMessage={errorMessage}
          handleClick={handleClick}
          formTitle={'Edit Role'} />
      </div>
    </>
  )
}

export { EditRoleModal };

