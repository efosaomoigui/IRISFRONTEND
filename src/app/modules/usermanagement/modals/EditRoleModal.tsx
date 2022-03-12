import { useState } from 'react';
import { Container } from 'react-bootstrap-v5';
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
  const [selectrole, setSelectrole] = useState<IRoleModel>()
  const [showForm, setShowForm] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const { entityValues, selectUrlParam, setSelectUrlParam, formTitle, setFormTitle, selectValue, handleSelectValue } = usePageData()

  // handle logic
  const users = entityValues as IRoleModel[]
  
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

    agent.Roles.update(values).then((response) => {
      if (response.validationErrors!.length > 0) {
        toast.error(response.validationErrors?.toString())
        setErrorMessage(response.validationErrors!.toString())
        setIsSubmitting(false)
        setShowError(true)
      } else {
        toast.success('Role Update Was Successful!')
        setInterval(() => {
          setShowForm(false)
        }, 1000)
        setIsSubmitting(false)
        setShowError(false)
      }
    })
  }

  return (
    <>
      <Container className='modal fade' id='kt_modal_editrole' aria-hidden='true'>
        <EditRoleForm 
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
          role={selectValue}
          showForm={showForm}
          showError={showError}
          errorMessage={errorMessage}
          handleClick={handleClick}
          formTitle={'Edit Role'} />
      </Container>
    </>
  )
}

export { EditRoleModal };

