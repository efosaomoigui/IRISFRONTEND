import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import agent from '../../../../setup/axios/AxiosAgent';
import { ITripModel } from '../Monitor models/MonitorInterface';
import AddTripForm from '../monitorformwidget/AddTripForm';



const AddTripModal: React.FC = () => {

    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = (values: ITripModel) => {
        setIsSubmitting(true);
        values.id = uuid();
        agent.Trip.create(values).then((response) => { console.log(response) });
        console.log("WW: ", values);
    };

    return (
        <>
            <div className='modal fade' id='kt_modal_addtrip' aria-hidden='true'>
                <AddTripForm isSubmitting={isSubmitting} onSubmit={onSubmit} />
            </div>
        </>
    )
}

export { AddTripModal };

