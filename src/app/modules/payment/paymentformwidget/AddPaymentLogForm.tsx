import { Modal } from 'react-bootstrap-v5'
import { Button } from 'semantic-ui-react'
import { Formik, Form, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { KTSVG } from '../../../../_iris/helpers'
import IrisTextInput from '../../layout/forms/IrisTextInput'
import { IInvoiceModel, IPaymentLogModel } from '../PaymentModels/PaymentmentInterfaces'
import IrisSelectInput from '../../layout/forms/IrisSelectInput'






// interface Props {
//   userVal: IUserModel
// }

interface Props<Values> {
    onSubmit: (values: Values, formikHelpers: FormikHelpers<Values>) => void | Promise<any>
    isSubmitting: boolean
}

const options = [
    { text: 'delivered', value: 'Bag' },
    { text: 'enroute', value: 'Serial' },
    { text: 'stop-over', value: 'Turkey' },
    { text: 'clearing', value: 'Afganistan' },
]

export default function AddPaymentlLogForm(props: Props<IPaymentLogModel>) {
    const initialFormValue: IPaymentLogModel = {
        PaymentId: '',
        Amount: '',
        PaymentMethod: '',
        User: '',
        TransactionId: ''
    }

    const validationSchema = Yup.object({
        PaymentId: Yup.string().required(),
        Amount: Yup.string().required(),
        PaymentMethod: Yup.string().required(),
        User: Yup.string().required(),
        TransactionId: Yup.string().required(),
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
                                    name='PaymentId'
                                    placeholder='PaymentId'
                                    label='PaymentId'
                                />
                                <IrisTextInput
                                    type='text'
                                    placeholder='Amount'
                                    name='Amount'
                                    label='Amount'
                                />
                                <IrisTextInput
                                    type='text'
                                    placeholder='PaymentMethod'
                                    name='PaymentMethod'
                                    label='PaymentMethod'
                                />
                                <IrisTextInput
                                    type='text'
                                    placeholder='User'
                                    name='User'
                                    label='User'
                                />

                                <IrisTextInput
                                    type='text'
                                    placeholder='TransactionId'
                                    name='TransactionId'
                                    label='TransactionId'
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
                                /> */}

                                {/* <IrisSelectInput
                                    options={options}
                                    placeholder='ShipStatus'
                                    name='ShipStatus'
                                    label='ShipStatus'
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