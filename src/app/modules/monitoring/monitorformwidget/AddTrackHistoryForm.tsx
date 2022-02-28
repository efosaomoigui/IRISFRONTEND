import { Modal } from 'react-bootstrap-v5'
import { Button } from 'semantic-ui-react'
import { Formik, Form, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { KTSVG } from '../../../../_iris/helpers'
import IrisTextInput from '../../layout/forms/IrisTextInput'
import IrisSelectInput from '../../layout/forms/IrisSelectInput'
import { ITrackHistoryModel } from '../Monitor models/MonitorInterface'
import IrisDatePicker from '../../layout/forms/IrisDatePicker'
import { usePageData } from '../../../../_iris/layout/core'



interface Props<Values> {
    onSubmit: (values: Values, formikHelpers: FormikHelpers<Values>) => void | Promise<any>
    isSubmitting: boolean
    trackHistory?: ITrackHistoryModel
}

const options = [
    { text: 'one', value: 'Bag' },
    { text: 'two', value: 'Serial' },
    { text: 'three', value: 'Turkey' },
    { text: 'four', value: 'Afganistan' },
]

export default function AddTrackHistoryForm(props: Props<ITrackHistoryModel>) {

    const {
        entityDetailValues,
        setEntityDetailValues,
        selectUrlParam,
        setSelectUrlParam,
        formTitle,
        setFormTitle,
      } = usePageData()
      
    const initialFormValue: ITrackHistoryModel = {
        id: props.trackHistory ? props.trackHistory!.id : '',
        TripId: props.trackHistory ? props.trackHistory!.TripId :  '',
        Action: props.trackHistory ? props.trackHistory!.Action:'',
        Location: props.trackHistory ? props.trackHistory!.Location: '',
        TimeStamp: props.trackHistory ? props.trackHistory!.TimeStamp :'',
        Status: props.trackHistory ? props.trackHistory!.Status :''
    }

    const validationSchema = Yup.object({
        id: Yup.string().required(),
        TripId: Yup.string().required(),
        Action: Yup.string().required(),
        Location: Yup.string().required(),
        TimeStamp: Yup.string().required(),
        Status: Yup.string().required(),
    })

    return (
        <>
            <Formik
                validationSchema={validationSchema}
                initialValues={initialFormValue}
                enableReinitialize
                onSubmit={props.onSubmit}
            >
                <Form className='ui form' autoComplete='off'>
                    <div className='modal-dialog modal-dialog-centered mw-900px'>
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <h2>{formTitle + ' Track History'} </h2>
                                <div
                                    className='btn btn-sm btn-icon btn-active-color-primary'
                                    data-bs-dismiss='modal'
                                >
                                    <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
                                </div>
                            </div>

                            <div className='modal-body py-lg-10 px-lg-10'>
                                <IrisTextInput
                                    type='text'
                                    name='TripId'
                                    placeholder='TripId'
                                    label='TripId'
                                />
                                <IrisTextInput
                                    type='text'
                                    placeholder='Action'
                                    name='Action'
                                    label='Action'
                                />
                                <IrisTextInput
                                    type='text'
                                    placeholder='Location'
                                    name='Location'
                                    label='Location'
                                />
                                {/* <IrisTextInput
                                    type='text'
                                    placeholder='TimeStamp'
                                    name='TimeStamp'
                                    label='TimeStamp'
                                /> */}

                                <IrisTextInput
                                    type='text'
                                    placeholder='Status'
                                    name='Status'
                                    label='Status'
                                />

                                <IrisDatePicker
                                    placeholderText='TimeStamp'
                                    name='TimeStamp'
                                    showTimeSelect
                                    timeCaption='TimeStamp'
                                    dateFormat='MMM d, yyyy h:mm: aa'
                                    />

                                {/* <IrisTextInput
                                    type='password'
                                    placeholder='Password'
                                    name='password'
                                    label='Password'
                                />

                                <IrisSelectInput
                                    options={options}
                                    placeholder='category'
                                    name='category'
                                    label='Category'
                                /> */}

                            </div>

                            <Modal.Footer>
                                <Button
                                    floated='right'
                                    positive
                                    type='submit'
                                    variant='secondary'
                                    loading={props.isSubmitting}
                                    content='Submit'
                                ></Button>
                                <Button floated='right' positive type='button' data-bs-dismiss="modal" content='Cancel'></Button>
                            </Modal.Footer>
                        </div>
                    </div>
                </Form>
            </Formik>
        </>
    )
}
