import {useState} from 'react'
import {toast} from 'react-toastify'
import {v4 as uuid} from 'uuid'
import agent from '../../../../setup/axios/AxiosAgent'
import {usePageData} from '../../../../_iris/layout/core'
import AddPaymentLogForm from '../paymentformwidget/AddPaymentLogForm'
import EditPaymentLogForm from '../paymentformwidget/EditPaymentLogForm'
import {IPaymentLogModel} from '../PaymentModels/PaymentmentInterfaces'

const EditPaymentLogModal: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectPaymentLogs, setSelectPaymentLogs] = useState<IPaymentLogModel>()
  const [showForm, setShowForm] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [showError, setShowError] = useState(false)

  const { entityDetailValues, selectUrlParam, setSelectUrlParam, formTitle, setFormTitle, selectValue, handleSelectValue } = usePageData()

  // handle logic
  const paymentlogs = entityDetailValues as IPaymentLogModel[]

  //const selected = setSelectedValue(users)

  const handleClick = () => {
    setShowError(false)
    setShowForm(true)
    window.location.reload()
    console.log('On click', showError)
  }

  const setSelectedValue = (paymentlog: IPaymentLogModel[]) => {
    const val = paymentlogs.find((x) => x.PaymentId === selectUrlParam)
    return val
  }

  const selected = setSelectedValue(paymentlogs)
  // console.log("LOG ", (selected) ? "old paymentlog" : "new paymentlog");

  const onSubmit = (values: IPaymentLogModel) => {
    setIsSubmitting(true)
    values.PaymentId = uuid()

    if (selected?.PaymentId) {
      agent.PaymentLog.update(values).then((response) => {
        toast.success('Payment log Update Was Successful!')
        setInterval(() => {
          setShowForm(false);
        }, 1000)
        setIsSubmitting(false)
      })
    } else {
      agent.PaymentLog.create(values).then((response) => {
        toast.success('Payment log Creation Was Successful!')
        setInterval(() => {
          setShowForm(false);
        }, 1000)
        setIsSubmitting(false)
      })
    }
  }

  return (
    <>
      <div className='modal fade' id='kt_modal_addpaymentlog' aria-hidden='true'>
        <EditPaymentLogForm 
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
          paymentlog={selectValue}
          showForm={showForm}
          showError={showError}
          errorMessage={errorMessage}
          handleClick={handleClick}
          formTitle={'Edit Payment Log'}/>
      </div>
    </>
  )
}

export { EditPaymentLogModal}
