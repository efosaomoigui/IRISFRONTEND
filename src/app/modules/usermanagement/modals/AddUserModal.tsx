import {useState, createContext, useContext, useEffect} from 'react'
import {toast} from 'react-toastify'
import {v4 as uuid} from 'uuid'
import agent from '../../../../setup/axios/AxiosAgent'
import {usePageData} from '../../../../_iris/layout/core'
import {IUserModel} from '../../auth/models/AuthInterfaces'
import AddUserForm from '../userformwidget/AddUserForm'

interface Props {
  handleSelect: () => void
  SelectedValues: any[]
}

const AddUserModal: React.FC<Props> = ({handleSelect, SelectedValues}: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectUsers, setSelectUsers] = useState<IUserModel>()

  const {entityDetailValues, selectUrlParam, setSelectUrlParam} = usePageData()

  // handle logic
  const users = entityDetailValues as IUserModel[];

  const setSelectedValue = (users: IUserModel[]) =>{
    const val = users.find(x => x.userId === selectUrlParam)
    return val;
  }

  const selected = setSelectedValue(users);
  console.log("LOG ", (selected)?"old user": "new user");

  const onSubmit = (values: IUserModel) => {
    setIsSubmitting(true)
    values.userId = uuid()

    if(selected?.userId){
      agent.Users.update(values).then((response) => {
        toast.success('User Update Was Successful!')
        setIsSubmitting(false)
      })
    }else{
      agent.Users.create(values).then((response) => {
        toast.success('User Creation Was Successful!')
        setIsSubmitting(false)
      })
    }
  }

  return (
    <>
      <div className='modal fade' id='kt_modal_adduser' aria-hidden='true'>
        <AddUserForm isSubmitting={isSubmitting} onSubmit={onSubmit} user={selected} />
      </div>
    </>
  )
}

export {AddUserModal}
