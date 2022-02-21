import {useState} from 'react'
import { toast } from 'react-toastify'
import {v4 as uuid} from 'uuid'
import agent from '../../../../setup/axios/AxiosAgent'
import {IUserModel} from '../../auth/models/AuthInterfaces'
import AddUserForm from '../userformwidget/AddUserForm'

const AddUserModal: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = (values: IUserModel) => {
    setIsSubmitting(true)
    values.userId = uuid()
    agent.Users.create(values).then((response) => {
      toast.success("User Creation Was Successful!");
      // console.log(response)
      setIsSubmitting(false)
    })
  }

  return (
    <>
      <div className='modal fade' id='kt_modal_adduser' aria-hidden='true'>
        <AddUserForm isSubmitting={isSubmitting} onSubmit={onSubmit} />
      </div>
    </>
  )
}

export {AddUserModal}
