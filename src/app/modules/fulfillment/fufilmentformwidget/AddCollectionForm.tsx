import { Form, Formik, FormikHelpers } from 'formik'
import { Modal } from 'react-bootstrap-v5'
import { Button } from 'semantic-ui-react'
import * as Yup from 'yup'
import { KTSVG } from '../../../../_iris/helpers'
import IrisTextInput from '../../layout/forms/IrisTextInput'
import { IFulfilmentModel } from '../models/FulfilmentInterface'




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

export default function AddCollectionForm(props: Props<IFulfilmentModel>) {
    const initialFormValue: IFulfilmentModel = {
        Id: '',
        ShipmentId: '',
        Shipment: '',
        CollectionStatus: true,
        UserId: '',
    }

    const validationSchema = Yup.object({
        Id: Yup.string().required(),
        ShipmentId: Yup.string().required(),
        Shipment: Yup.string().required(),
        CollectionStatus: Yup.boolean().required(),
        UserId: Yup.string().required(),
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
                                <h2>Create User</h2>
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
                                    name='Id'
                                    placeholder='Id'
                                    label='Id'
                                />
                                <IrisTextInput
                                    type='text'
                                    placeholder='ShipmentId'
                                    name='ShipmentId'
                                    label='ShipmentId'
                                />
                                <IrisTextInput
                                    type='boolean'
                                    placeholder='CollectionStatus'
                                    name='CollectionStatus'
                                    label='CollectionStatus'
                                />
                                <IrisTextInput
                                    type='text'
                                    placeholder='UserId'
                                    name='UserId'
                                    label='UserId'
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
                                <Button floated='right' positive type='reset' data-bs-dismiss="modal" content='Cancel'></Button>
                            </Modal.Footer>
                        </div>
                    </div>
                </Form>
            </Formik>
        </>
    )
}
