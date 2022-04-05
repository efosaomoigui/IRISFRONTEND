import { useState } from 'react';
import { Container } from 'react-bootstrap-v5';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';
import agent from '../../../../setup/axios/AxiosAgent';
import { usePageData } from '../../../../_iris/layout/core';
import { IShipmentRequestModel } from '../models/ShipmentRequestInterface';
import AddShipmentRequestForm from '../shipmentrequestformwidget/AddShipmentRequestForm';


interface Props {
    handleSelect?: () => void
    SelectedValues?: any[]
}

const AddShipmentRequestModal: React.FC = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showForm, setShowForm] = useState(true)
    const [selectShipmentRequest, setSelectShipmentRequest] = useState<IShipmentRequestModel>()
    const [hasError, setHasError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [showError, setShowError] = useState(false)

    const { entityValues, selectUrlParam, setSelectUrlParam } = usePageData()

    // handle logic
    const shipmentrequest = entityValues as IShipmentRequestModel[];

    const setSelectedValue = (shipmentrequest: IShipmentRequestModel[]) => {
        const val = shipmentrequest.find(x => x.shipmentId === selectUrlParam)
        return val;
    }

    const selected = setSelectedValue(shipmentrequest);

    const handleClick = () => {
        setShowError(false);
        setShowForm(true);
        window.location.reload();
        console.log('On click', showError)
    }

    const onSubmit = (values: IShipmentRequestModel) => {
        setIsSubmitting(true)
        values.shipmentId = uuid()

        agent.ShipmentRequest.create(values)
            .then((response) => {
                if (response.validationErrors!.length > 0) {
                    toast.error(response.validationErrors?.toString())
                    setErrorMessage(response.validationErrors!.toString())
                    setIsSubmitting(false)
                    setShowError(true)
                } else {
                    toast.success('request Creation Was Successful!')
                    setInterval(() => {
                        setShowForm(false)
                    }, 1000)
                    setIsSubmitting(false)
                    setShowError(false)
                }
            })
    }
    return (
        <>
            <Container className='modal fade' id='kt_modal_addfleet' aria-hidden='true'>
                <AddShipmentRequestForm
                    isSubmitting={isSubmitting}
                    onSubmit={onSubmit}
                    shipmentrequest={selected}
                    showForm={showForm}
                    showError={showError}
                    errorMessage={errorMessage}
                    handleClick={handleClick}
                    formTitle={'Add request'}
                />
            </Container>
        </>
    )
}

export { AddShipmentRequestModal };

