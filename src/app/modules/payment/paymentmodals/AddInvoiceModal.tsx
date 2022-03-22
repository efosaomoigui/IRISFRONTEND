import { useState } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';
import agent from '../../../../setup/axios/AxiosAgent';
import { usePageData } from '../../../../_iris/layout/core';
import AddInvoiceForm from '../paymentformwidget/AddInvoiceForm';
import { IInvoiceModel } from '../PaymentModels/PaymentmentInterfaces';




const AddInvoiceModal: React.FC = () => {

    const [isSubmitting, setIsSubmitting] = useState(false)

    const [selectInvoice, setSelectInvoice] = useState<IInvoiceModel>()

    const { entityValues, selectUrlParam, setSelectUrlParam } = usePageData()
    const [showForm, setShowForm] = useState(true)

  // handle logic
    const invoice = entityValues as IInvoiceModel[];

    const setSelectedValue = (invoice: IInvoiceModel[]) => {
    const val = invoice.find(x => x.Id === selectUrlParam)
    return val;
    }

  const selected = setSelectedValue(invoice);
  // console.log("LOG ", (selected) ? "old invoice" : "new invoice");

  const onSubmit = (values: IInvoiceModel) => {
    setIsSubmitting(true)
    values.Id = uuid()

    if (selected?.Id) {
      agent.Invoice.update(values).then((response) => {
        toast.success('Invoice Update Was Successful!')
        setInterval(() => {
          setShowForm(false);
        }, 1000)
        setIsSubmitting(false)
      })
    } else {
      agent.Invoice.create(values).then((response) => {
        toast.success('Invoice Creation Was Successful!')
        setInterval(() => {
          setShowForm(false);
        }, 1000)
      })
    }
  }

    return (
        <>
            <div className='modal fade' id='kt_modal_addinvoice' aria-hidden='true'>
          <AddInvoiceForm isSubmitting={isSubmitting} onSubmit={onSubmit} invoice={selected} showForm={showForm} />
            </div>
        </>
    )
}

export { AddInvoiceModal };

