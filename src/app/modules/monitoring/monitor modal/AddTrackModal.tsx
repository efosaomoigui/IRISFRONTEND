import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import agent from '../../../../setup/axios/AxiosAgent';
import { ISearchTripModel, ITrackHistoryModel } from '../Monitor models/MonitorInterface';
import AddSearchTripForm from '../monitorformwidget/AddSearchTripForm';
import AddTrackForm from '../monitorformwidget/AddTrackForm';



const AddTrackModal: React.FC = () => {

    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = (values: ISearchTripModel) => {
        setIsSubmitting(true);
        values.userId = uuid();
        agent.Monitoring.create(values).then((response) => { console.log(response) });
        console.log("WW: ", values);
    };

    return (
        <>
            <div className='modal fade' id='kt_modal_addtrack' aria-hidden='true'>
                <AddTrackForm isSubmitting={isSubmitting} onSubmit={onSubmit} />
            </div>
        </>
    )
}

export { AddTrackModal };

