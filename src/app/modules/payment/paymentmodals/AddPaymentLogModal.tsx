import {useState} from 'react'
import {toast} from 'react-toastify'
import {v4 as uuid} from 'uuid'
import agent from '../../../../setup/axios/AxiosAgent'
import {usePageData} from '../../../../_iris/layout/core'
import AddPaymentLogForm from '../paymentformwidget/AddPaymentLogForm'
import {IPaymentLogModel} from '../PaymentModels/PaymentmentInterfaces'

const AddPaymentLogModal: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectPaymentLogs, setSelectPaymentLogs] = useState<IPaymentLogModel>()
  const {entityDetailValues, selectUrlParam, setSelectUrlParam} = usePageData()
  const [showForm, setShowForm] = useState(true)

  // handle logic
  const paymentlogs = entityDetailValues as IPaymentLogModel[]

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
        <AddPaymentLogForm isSubmitting={isSubmitting} onSubmit={onSubmit} paymentlog={selected} showForm={showForm} />
      </div>
    </>
  )
}

export {AddPaymentLogModal}
