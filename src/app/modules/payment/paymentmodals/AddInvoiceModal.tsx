import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import agent from '../../../../setup/axios/AxiosAgent';
import AddInvoiceForm from '../paymentformwidget/AddInvoiceForm';
import { IInvoiceModel } from '../PaymentModels/PaymentmentInterfaces';




const AddInvoiceModal: React.FC = () => {

    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = (values: IInvoiceModel) => {
        setIsSubmitting(true);
        values.Id = uuid();
        agent.Invoice.create(values).then((response) => { console.log(response) });
        console.log("WW: ", values);
    };

    return (
        <>
            <div className='modal fade' id='kt_modal_addinvoice' aria-hidden='true'>
                <AddInvoiceForm isSubmitting={isSubmitting} onSubmit={onSubmit} />
            </div>
        </>
    )
}

export { AddInvoiceModal };

