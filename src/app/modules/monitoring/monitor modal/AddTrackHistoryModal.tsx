import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import agent from '../../../../setup/axios/AxiosAgent';
import { ITrackHistoryModel, ITripModel } from '../Monitor models/MonitorInterface';
import AddTrackHistoryForm from '../monitorformwidget/AddTrackHistoryForm';
import AddTripForm from '../monitorformwidget/AddTripForm';



const AddTrackHistoryModal: React.FC = () => {

    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = (values: ITrackHistoryModel) => {
        setIsSubmitting(true);
        values.id = uuid();
        agent.TrackHistory.create(values).then((response) => { console.log(response) });
        console.log("WW: ", values);
    };

    return (
        <>
            <div className='modal fade' id='kt_modal_addtrackhistory' aria-hidden='true'>
                <AddTrackHistoryForm isSubmitting={isSubmitting} onSubmit={onSubmit} />
            </div>
        </>
    )
}

export { AddTrackHistoryModal };

