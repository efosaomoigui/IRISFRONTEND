import { useState } from 'react';
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
    const [showError, setShowError] = useState(false)

    const { entityDetailValues, selectUrlParam, setSelectUrlParam, formTitle, setFormTitle, selectValue, handleSelectValue } = usePageData()

    // handle logic
    const manifests = entityDetailValues as IManifestModel[];

    //const selected = setSelectedValue(users)

    const handleClick = () => {
        setShowError(false)
        setShowForm(true)
        window.location.reload()
        console.log('On click', showError)
    }

    const setSelectedValue = (manifests: IManifestModel[]) => {
        const val = manifests.find(x => x.Id === selectUrlParam)
        return val;
    }

    const selected = setSelectedValue(manifests);
    console.log("LOG ", (selected) ? "old Manifest" : "new Manifest");

    const onSubmit = (values: IManifestModel) => {
        setIsSubmitting(true)
        values.Id = uuid()

        if (selected?.Id) {
            agent.Manifest.update(values).then((response) => {
                toast.success('Manifest Update Was Successful!')
                setInterval(() => {
                    setShowForm(false);
                }, 1000)
                setIsSubmitting(false)
            })
        } else {
            agent.Manifest.create(values).then((response) => {
                toast.success('Manifest Creation Was Successful!')
                setInterval(() => {
                    setShowForm(false);
                }, 1000)
                setIsSubmitting(false)
            })
        }
    }

    return (
        <>
            <div className='modal fade' id='kt_modal_addmanifest' aria-hidden='true'>
                <EditManifestForm 
                    isSubmitting={isSubmitting}
                    onSubmit={onSubmit}
                    manifest={selectValue}
                    showForm={showForm}
                    showError={showError}
                    errorMessage={errorMessage}
                    handleClick={handleClick}
                    formTitle={'Edit User'}/>
            </div>
        </>
    )
}

export { EditManifestModal };

