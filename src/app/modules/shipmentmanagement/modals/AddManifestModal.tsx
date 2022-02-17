import { useState } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';
import agent from '../../../../setup/axios/AxiosAgent';
import AddManifestForm from '../shipmentformwidget/AddManifestForm';
import { IManifestModel } from '../ShipmentModels/ShipmentInterfaces';



const AddManifestModal: React.FC = () => {

    const [isSubmitting, setIsSubmitting] = useState(false)

    const onSubmit = (values: IManifestModel) => {
        setIsSubmitting(true)
        values.Id = uuid()
        agent.Manifest.create(values).then((response) => {
            toast.success("User Creation Was Successful!");
            // console.log(response)
            setIsSubmitting(false)
        })
    }

    return (
        <>
            <div className='modal fade' id='kt_modal_addmanifest' aria-hidden='true'>
                <AddManifestForm isSubmitting={isSubmitting} onSubmit={onSubmit} />
            </div>
        </>
    )
}

    export { AddManifestModal };

