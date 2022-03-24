import { useState } from 'react';
import { Container } from 'react-bootstrap-v5';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';
import agent from '../../../../setup/axios/AxiosAgent';
import { usePageData } from '../../../../_iris/layout/core';
import { IRoleModel } from '../../auth/models/AuthInterfaces';
import AddRoleForm from '../userformwidget/AddRoleForm';

interface Props {
  handleSelect?: () => void
  SelectedValues?: any[]
}

const AddRoleModal: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectrole, setSelectRole] = useState<IRoleModel>()
  const [showForm, setShowForm] = useState(true)
  const [loading, setLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [showError, setShowError] = useState(false)

  const { entityValues, selectUrlParam, setSelectUrlParam, formTitle, setFormTitle } =
    usePageData()

  // handle logic
  const roles = entityValues as IRoleModel[]

  const setSelectedValue = (role: IRoleModel[]) => {
    const val = role.find((x) => x.id === selectUrlParam)
    return val
  }

  const selected = setSelectedValue(roles)

  const handleClick = () => {
    setShowError(false);
    setShowForm(true);
    window.location.reload();
  }

  const onSubmit = (values: IRoleModel) => {
    setIsSubmitting(true)
    // values.roleId = uuid()

    agent.Roles.create(values)
      .then((response) => {
        if (response.validationErrors!.length > 0) {
          toast.error(response.validationErrors?.toString())
          setErrorMessage(response.validationErrors!.toString())
          setIsSubmitting(false)
          setShowError(true)
        } else {
          toast.success('Role Creation Was Successful!')
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
      <Container className='modal fade' id='kt_modal_addrole' aria-hidden='true'>
        <AddRoleForm 
        isSubmitting={isSubmitting} 
        onSubmit={onSubmit} 
        showForm={showForm}
        showError={showError}
        errorMessage={errorMessage}
        handleClick={handleClick}
        formTitle={'Add Role'} 
        />
      </Container>
    </>
  )
}

export { AddRoleModal };

