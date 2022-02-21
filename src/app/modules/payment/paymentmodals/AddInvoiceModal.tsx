import { useState } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';
import agent from '../../../../setup/axios/AxiosAgent';
import AddInvoiceForm from '../paymentformwidget/AddInvoiceForm';
import { IInvoiceModel } from '../PaymentModels/PaymentmentInterfaces';




const AddInvoiceModal: React.FC = () => {

    const [isSubmitting, setIsSubmitting] = useState(false)

    const onSubmit = (values: IInvoiceModel) => {
        setIsSubmitting(true)
        values.Id = uuid()
        agent.Invoice.create(values).then((response) => {
            toast.success("Log Creation Was Successful!");
            // console.log(response)
            setIsSubmitting(false)
        })
    }
    return (
        <>
            <div className='modal fade' id='kt_modal_addinvoice' aria-hidden='true'>
                <AddInvoiceForm isSubmitting={isSubmitting} onSubmit={onSubmit} />
            </div>
        </>
    )
}

export { AddInvoiceModal };

