import { useState } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';
import agent from '../../../../setup/axios/AxiosAgent';
import { usePageData } from '../../../../_iris/layout/core';
import AddInvoiceForm from '../paymentformwidget/AddInvoiceForm';
import EditInvoiceForm from '../paymentformwidget/EditInvoiceForm';
import { IInvoiceModel } from '../PaymentModels/PaymentmentInterfaces';

interface Props {
  handleEdit?: (user: IInvoiceModel) => void
  SelectedValues?: any[]
}


const EditInvoiceModal: React.FC = () => {

    const [isSubmitting, setIsSubmitting] = useState(false)

    const [selectInvoice, setSelectInvoice] = useState<IInvoiceModel>()
    const [showForm, setShowForm] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')
    const [showError, setShowError] = useState(false)

    const { entityValues, selectUrlParam, setSelectUrlParam, formTitle, setFormTitle, selectValue, handleSelectValue } = usePageData()

    

  // handle logic
    const invoice = entityValues as IInvoiceModel[];

  //const selected = setSelectedValue(users)

  const handleClick = () => {
    setShowError(false)
    setShowForm(true)
    window.location.reload()
    console.log('On click', showError)
  }

    const setSelectedValue = (invoice: IInvoiceModel[]) => {
    const val = invoice.find(x => x.Id === selectUrlParam)
    return val;
    }

  const selected = setSelectedValue(invoice);
  console.log("LOG ", (selected) ? "old invoice" : "new invoice");

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
          <EditInvoiceForm 
            isSubmitting={isSubmitting}
            onSubmit={onSubmit}
            invoice={selectValue}
            showForm={showForm}
            showError={showError}
            errorMessage={errorMessage}
            handleClick={handleClick}
            formTitle={'Edit Invoice'} />
            </div>
        </>
    )
}

export { EditInvoiceModal };

