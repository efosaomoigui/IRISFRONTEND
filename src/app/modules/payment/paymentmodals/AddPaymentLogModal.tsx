import { useState } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';
import agent from '../../../../setup/axios/AxiosAgent';
import AddPaymentLogForm from '../paymentformwidget/AddPaymentLogForm';
import { IPaymentLogModel } from '../PaymentModels/PaymentmentInterfaces';




const AddPaymentLogModal: React.FC = () => {

    const [isSubmitting, setIsSubmitting] = useState(false)

    const onSubmit = (values: IPaymentLogModel) => {
        setIsSubmitting(true)
        values.PaymentId = uuid()
        agent.PaymentLog.create(values).then((response) => {
            toast.success("Log Creation Was Successful!");
            // console.log(response)
            setIsSubmitting(false)
        })
    }

    return (
        <>
            <div className='modal fade' id='kt_modal_addpaymentlog' aria-hidden='true'>
                <AddPaymentLogForm isSubmitting={isSubmitting} onSubmit={onSubmit} />
            </div>
        </>
    )
}

export { AddPaymentLogModal };
