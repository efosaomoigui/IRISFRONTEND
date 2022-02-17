import { useState } from 'react'
import { toast } from 'react-toastify'
import { v4 as uuid } from 'uuid'
import agent from '../../../../setup/axios/AxiosAgent'
import AddCollectionForm from '../fufilmentformwidget/AddCollectionForm'
import { IFulfilmentModel } from '../models/FulfilmentInterface'

const AddCollectionCenterModal: React.FC = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const onSubmit = (values: IFulfilmentModel) => {
        setIsSubmitting(true)
        values.Id = uuid()
        agent.CollectionCenter.create(values).then((response) => {
            toast.success("User Creation Was Successful!");
            // console.log(response)
            setIsSubmitting(false)
        })
    }

    return (
        <>
            <div className='modal fade' id='kt_modal_addcollectioncenter' aria-hidden='true'>
                <AddCollectionForm isSubmitting={isSubmitting} onSubmit={onSubmit} />
            </div>
        </>
    )
}

export { AddCollectionCenterModal }

