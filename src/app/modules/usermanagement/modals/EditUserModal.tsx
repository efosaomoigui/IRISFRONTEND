import {useState, createContext, useContext, useEffect} from 'react'
import {Container} from 'react-bootstrap-v5'
import { useHistory } from 'react-router-dom'
import {toast} from 'react-toastify'
import {v4 as uuid} from 'uuid'
import agent from '../../../../setup/axios/AxiosAgent'
import {usePageData} from '../../../../_iris/layout/core'
import {Category, Gender, IUserModel, IUserRole, requirePasswordChanged} from '../../auth/models/AuthInterfaces'
import ErrorAlert from '../../common/ErrorAlert'
import { AddUserRole } from '../components/settings/roles/AddUserRole'
import AddUserForm from '../userformwidget/AddUserForm'
import { AddUserToRole } from '../userformwidget/AddUserToRole'
import EditUserForm from '../userformwidget/EditUserForm'

interface Props {
  handleEdit?: (user: IUserModel) => void
  SelectedValues?: any[]
}

const EditUserModal: React.FC<Props> = ({handleEdit, SelectedValues}: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectUsers, setSelectUsers] = useState<IUserModel>()
  const [showForm, setShowForm] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [showError, setShowError] = useState(false) 

  const {entityValues, selectUrlParam, setSelectUrlParam, formTitle, setFormTitle, selectValue, handleSelectValue} = usePageData()
  const history = useHistory();

  // handle logic
  const users = entityValues as IUserModel[] 


  const handleClick = () => {
    setShowError(false)
    setShowForm(true)
    window.location.reload()
  }


  const onSubmit = (values: IUserModel) => {
    console.log("VALs ", values)
    setIsSubmitting(true)
    values.id = values.userId
    
    // const Gend = (values.gender == Gender['Female']) ? Gender.Female : Gender.Male  
    // const Cate = (values.userType == Category['Corporate']) ?  Category.Corporate :  Category.Inidvidual
    
    // const PasswordChanged = (values.requirePasswordChanged == requirePasswordChanged['Yes']) ? requirePasswordChanged.Yes : requirePasswordChanged.No  
    // values.requirePasswordChanged = PasswordChanged

    agent.Users.update(values).then((response) => {

      if (response.validationErrors!.length > 0) {
        toast.error(response.validationErrors?.toString())
        setErrorMessage(response.validationErrors!.toString())
        setIsSubmitting(false)
        setShowError(true)
      } else {
        toast.success('User Update Was Successful!')
        setInterval(() => {
          setShowForm(false)
        }, 1000)
        setIsSubmitting(false)
        setShowError(false)
        history.push('/');
        history.push("/admin/users");
      }
    })
  }  

  return (
    <>
      <Container className='modal fade' id='kt_modal_edituser' aria-hidden='true'>
        <EditUserForm
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
          user={selectValue}
          showForm={showForm}
          showError={showError}
          errorMessage={errorMessage}
          handleClick={handleClick}
          formTitle={'Edit User'}
        />
      </Container>
    </>
  )
}

export {EditUserModal}
