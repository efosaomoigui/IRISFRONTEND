import { useState } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';
import agent from '../../../../setup/axios/AxiosAgent';
import { usePageData } from '../../../../_iris/layout/core';
import AddManifestForm from '../shipmentformwidget/AddManifestForm';
import { IManifestModel } from '../ShipmentModels/ShipmentInterfaces';



const AddManifestModal: React.FC = () => {

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [selectManifest, setSelectManifest] = useState<IManifestModel>()
    const [showForm, setShowForm] = useState(true)
    const { entityDetailValues, selectUrlParam, setSelectUrlParam } = usePageData()

    // handle logic
    const manifests = entityDetailValues as IManifestModel[];

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
                <AddManifestForm isSubmitting={isSubmitting} onSubmit={onSubmit} manifest={selected} showForm={showForm} />
            </div>
        </>
    )
}

    export { AddManifestModal };

