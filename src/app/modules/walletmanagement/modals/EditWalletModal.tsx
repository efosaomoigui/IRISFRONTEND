import {useState} from 'react'
import {toast} from 'react-toastify'
import {v4 as uuid} from 'uuid'
import agent from '../../../../setup/axios/AxiosAgent'
import {usePageData} from '../../../../_iris/layout/core'
import {IWalletModel} from '../Models/WalletInterfaces'
import AddWalletForm from '../walletformwidget/AddWalletForm'
import EditWalletForm from '../walletformwidget/EditWalletForm'

interface Props {
  handleEdit?: (wallet: IWalletModel) => void
  SelectedValues?: any[]
}

const EditWalletModal: React.FC<Props> = ({handleEdit, SelectedValues}: Props) => { 
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(true)
  const [selectWallet, setSelectWallet] = useState<IWalletModel>()
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [showError, setShowError] = useState(false)

  const {selectValue, handleSelectValue, selectUrlParam, setSelectUrlParam} = usePageData() //global data

  // const onSubmit = (values: IWalletModel) => {
  //   setIsSubmitting(true)
  //   values.id = uuid()
  //   agent.Wallet.create(values).then((response) => {
  //     toast.success('wallet Creation Was Successful!')
  //     setInterval(() => {
  //       setShowForm(false)
  //     }, 1000)
  //     setIsSubmitting(false)
  //   })
  // }

  const onSubmit = (values: IWalletModel) => {
    setIsSubmitting(true)
    values.id = uuid()

    agent.Wallet.update(values).then((response) => {
      if (response.validationErrors!.length > 0) {
        toast.error(response.validationErrors?.toString())
        setErrorMessage(response.validationErrors!.toString())
        setIsSubmitting(false)
        setShowError(true)
      } else {
        toast.success('Wallet Update Was Successful!')
        setInterval(() => {
          setShowForm(false)
        }, 1000)
        setIsSubmitting(false)
        setShowError(false)
      }
    })
  }

  
  const handleClick = () => {
    setShowError(false)
    setShowForm(true)
    window.location.reload()
    console.log('On click', showError)
  }

  // console.log("wallet: ", selectValue);

  return (
    <>
      <div className='modal fade' id='kt_modal_editwallet' aria-hidden='true'>
        <EditWalletForm
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
          wallet={selectValue}
          showForm={showForm} 
          handleClick={handleClick}
          formTitle={'Edit User'}
        />
      </div>
    </>
  )
}

export {EditWalletModal}
