import {useState, createContext, useContext, useEffect} from 'react'
import {Container} from 'react-bootstrap-v5'
import { useHistory } from 'react-router-dom'
import {toast} from 'react-toastify'
import {v4 as uuid} from 'uuid'
import agent from '../../../../setup/axios/AxiosAgent'
import {usePageData} from '../../../../_iris/layout/core'
import {Category, Gender, GenderType, IUserModel, UserType} from '../../auth/models/AuthInterfaces'
import ErrorAlert from '../../common/ErrorAlert'
import AddUserForm from '../userformwidget/AddUserForm'
import AddUserForm2 from '../userformwidget/AddUserForm2'

interface Props {
  handleSelect?: () => void
  SelectedValues?: any[]
}

const AddUserModal2: React.FC<Props> = ({handleSelect, SelectedValues}: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectUsers, setSelectUsers] = useState<IUserModel>()
  const [showForm, setShowForm] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [showError, setShowError] = useState(false)
  const history = useHistory();

  const {entityValues, selectUrlParam, setSelectUrlParam, formTitle, setFormTitle} =
    usePageData()

  // handle logic
  const users = entityValues as IUserModel[]

  const setSelectedValue = (users: IUserModel[]) => {
    const val = users.find((x) => x.userId === selectUrlParam)
    return val
  }

  const selected = setSelectedValue(users)

  const handleClick = () => {
    setShowError(false);
    setShowForm(true);
    history.push('/');
    history.push("/admin/users");
  }

  useEffect(() =>{
  }, [showForm])


  const onSubmit = (values: IUserModel) => {
    setIsSubmitting(true)
    values.userId = uuid()

    const Gend = (values.gender == Gender['Female']) ? Gender.Female : Gender.Male  
    const Cate = (values.userType == Category['Corporate']) ?  Category.Corporate :  Category.Inidvidual

    values.gender = Gend
    values.userType = Cate
 
    agent.Users.create(values)
      .then((response) => {
        if (response.validationErrors!.length > 0) {
          toast.error(response.validationErrors?.toString())
          setErrorMessage(response.validationErrors!.toString())
          setIsSubmitting(false)
          setShowError(true)
        } else {
          toast.success('User Creation Was Successful!')
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
      <Container className='modal fade' id='kt_modal_adduser2' aria-hidden='true'>
        <AddUserForm2
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
          user={selected}
          showForm={showForm}
          showError={showError}
          errorMessage={errorMessage} 
          handleClick={handleClick}
          formTitle={'Add User'}
        />
      </Container>
    </>
  )
}

export {AddUserModal2}
