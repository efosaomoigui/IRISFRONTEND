import { Modal } from 'react-bootstrap-v5'
import { Button } from 'semantic-ui-react'
import { Formik, Form, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { KTSVG } from '../../../../_iris/helpers'
import IrisTextInput from '../../layout/forms/IrisTextInput'
import IrisSelectInput from '../../layout/forms/IrisSelectInput'
import { ITripModel } from '../Monitor models/MonitorInterface'





// interface Props {
//   userVal: IUserModel
// }

interface Props<Values> {
    onSubmit: (values: Values, formikHelpers: FormikHelpers<Values>) => void | Promise<any>
    isSubmitting: boolean
}

const options = [
    { text: 'one', value: 'Bag' },
    { text: 'two', value: 'Serial' },
    { text: 'three', value: 'Turkey' },
    { text: 'four', value: 'Afganistan' },
]

export default function AddTripForm(props: Props<ITripModel>) {
    const initialFormValue: ITripModel = {
        id: '',
        TripReference: '',
        RouteCode: '',
        fleetid: '',
        fleet: '',
        ManifestId: '',
        manifest: '',
        Driver: '',
        Dispatcher: '',
        DriverDispatchFee: '',
        Miscelleneous: '',
        FuelCosts: '',
        FuelUsed: '',
        StartTime: '',
        EndTime: '',
        status: '',
    }

    const validationSchema = Yup.object({
        TripReference: Yup.string().required(),
        RouteCode: Yup.string().required(),
        fleetid: Yup.string().required(),
        ManifestId: Yup.string().required(),
        Driver: Yup.string().required(),
        Dispatcher: Yup.string().required(),
        DriverDispatchFee: Yup.string().required(),
        StartTime: Yup.string().required(),
        EndTime: Yup.string().required(),
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
                                <h2>Add Trip</h2>
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
                                    name='TripReference'
                                    placeholder='Trip Reference'
                                    label='Trip Reference'
                                />
                                <IrisTextInput
                                    type='text'
                                    placeholder='fleetid'
                                    name='fleetid'
                                    label='fleetid'
                                />
                                <IrisTextInput
                                    type='text'
                                    placeholder='Driver'
                                    name='Driver'
                                    label='Driver'
                                />
                                <IrisTextInput
                                    type='text'
                                    placeholder='FuelCosts'
                                    name='FuelCosts'
                                    label='FuelCosts'
                                />

                                <IrisTextInput
                                    type='text'
                                    placeholder='Dispatcher'
                                    name='Dispatcher'
                                    label='Dispatcher'
                                />

                                {/* <IrisDatePicker
                  placeholderText='Date'
                  name='date'
                  showTimeSelect
                  timeCaption='time'
                  dateFormat='MMM d, yyyy h:mm: aa'
                /> */}

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
                                <Button floated='right' positive type='button' content='Cancel'></Button>
                            </Modal.Footer>
                        </div>
                    </div>
                </Form>
            </Formik>
        </>
    )
}
