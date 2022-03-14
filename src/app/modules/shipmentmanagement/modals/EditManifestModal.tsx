import { useState } from 'react';
import { Container } from 'react-bootstrap-v5';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';
import agent from '../../../../setup/axios/AxiosAgent';
import { usePageData } from '../../../../_iris/layout/core';
import AddManifestForm from '../shipmentformwidget/AddManifestForm';
import EditManifestForm from '../shipmentformwidget/EditManifestForm';
import { IManifestModel } from '../ShipmentModels/ShipmentInterfaces';

interface Props {
    handleEdit?: (user: IManifestModel) => void
    SelectedValues?: any[]
}

const EditManifestModal: React.FC<Props> = ({ handleEdit, SelectedValues }: Props) => {

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [selectManifest, setSelectManifest] = useState<IManifestModel>()
    const [showForm, setShowForm] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')
    const [hasError, setHasError] = useState(false)
    const [showError, setShowError] = useState(false)

    const { entityValues, selectUrlParam, setSelectUrlParam, formTitle, setFormTitle, selectValue, handleSelectValue } = usePageData()

    // handle logic
    const manifests = entityValues as IManifestModel[];

    //const selected = setSelectedValue(users)

    const handleClick = () => {
        setShowError(false)
        setShowForm(true)
        window.location.reload()
        console.log('On click', showError)
    }

   
    const onSubmit = (values: IManifestModel) => {
        setIsSubmitting(true)
        values.manifestCode = uuid()

        agent.Manifest.update(values).then((response) => {
            if (response.validationErrors!.length > 0) {
                toast.error(response.validationErrors?.toString())
                setErrorMessage(response.validationErrors!.toString())
                setIsSubmitting(false)
                setShowError(true)
            } else {
                toast.success('Manifest Update Was Successful!')
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
            <Container className='modal fade' id='kt_modal_editmanifest' aria-hidden='true'>
                <EditManifestForm 
                    isSubmitting={isSubmitting}
                    onSubmit={onSubmit}
                    manifest={selectValue}
                    showForm={showForm}
                    showError={showError}
                    errorMessage={errorMessage}
                    handleClick={handleClick}
                    formTitle={'Edit Manifest'}/>
            </Container>
        </>
    )
}

export { EditManifestModal };

