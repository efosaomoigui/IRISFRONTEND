import { useState } from 'react';
import { Container } from 'react-bootstrap-v5';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';
import agent from '../../../../setup/axios/AxiosAgent';
import { usePageData } from '../../../../_iris/layout/core';
import AddManifestForm from '../shipmentformwidget/AddManifestForm';
import { IManifestModel } from '../ShipmentModels/ShipmentInterfaces';

interface Props {
    handleSelect?: () => void
    SelectedValues?: any[]
}

const AddManifestModal: React.FC = () => {

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [selectManifest, setSelectManifest] = useState<IManifestModel>()
    const [showForm, setShowForm] = useState(true)
    const [hasError, setHasError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [showError, setShowError] = useState(false)
    const { entityValues, selectUrlParam, setSelectUrlParam, formTitle, setFormTitle } =
        usePageData()

    // handle logic
    const manifests = entityValues as IManifestModel[];

    const setSelectedValue = (manifests: IManifestModel[]) => {
        const val = manifests.find(x => x.groupWayBillId === selectUrlParam)
        return val;
    }

    const selected = setSelectedValue(manifests);
    
    const handleClick = () => {
        setShowError(false);
        setShowForm(true);
        window.location.reload();
        console.log('On click', showError)
    }

    const onSubmit = (values: IManifestModel) => {
        setIsSubmitting(true)
        values.groupWayBillId = uuid()

        agent.Manifest.create(values)
            .then((response) => {
                if (response.validationErrors!.length > 0) {
                    toast.error(response.validationErrors?.toString())
                    setErrorMessage(response.validationErrors!.toString())
                    setIsSubmitting(false)
                    setShowError(true)
                } else {
                    toast.success('Manifest Creation Was Successful!')
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
            <Container className='modal fade' id='kt_modal_addmanifest' aria-hidden='true'>
                <AddManifestForm 
                    isSubmitting={isSubmitting}
                    onSubmit={onSubmit}
                    manifest={selected}
                    showForm={showForm}
                    showError={showError}
                    errorMessage={errorMessage}
                    handleClick={handleClick}
                    formTitle={'Add Manifest'}
                />
            </Container>
        </>
    )
}

    export { AddManifestModal };

