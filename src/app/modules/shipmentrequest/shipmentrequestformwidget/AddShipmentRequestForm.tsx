import { Modal } from 'react-bootstrap-v5'
import { Button } from 'semantic-ui-react'
import { KTSVG } from '../../../../_iris/helpers'
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import IrisTextInput from '../../layout/forms/IrisTextInput'
import IrisSelectInput from '../../layout/forms/IrisSelectInput'
import { usePageData } from '../../../../_iris/layout/core'
import useStyles from '../../layout/formstyles/FormStyle'
import { Alert } from '@mui/material'
import { Grid } from '@material-ui/core'
import { boolean } from 'yup/lib/locale'
import ErrorAlert from '../../common/ErrorAlert'
import { IShipmentRequestModel } from '../models/ShipmentRequestInterface'
import { useState } from 'react'

// interface Props {
//   userVal: IUserModel
// }

interface Props<Values> {
    onSubmit: (values: Values, formikHelpers: FormikHelpers<Values>) => void | Promise<any>
    isSubmitting: boolean
    shipmentrequest?: IShipmentRequestModel
    showForm?: boolean
    formTitle?: string
    showError?: boolean
    errorMessage?: string
    handleClick?: () => void
}

const options = [
    { text: 'one', value: 'Bag' },
    { text: 'two', value: 'Serial' },
    { text: 'three', value: 'Turkey' },
    { text: 'four', value: 'Afganistan' },
]

export default function AddShipmentRequestForm(props: Props<IShipmentRequestModel>) {
    const { entityValues, setEntityValues, selectUrlParam, setSelectUrlParam, formTitle, setFormTitle } = usePageData()


    const [errorMessage, setErrorMessage] = useState('')
    const [showError, setShowError] = useState(true)

    
    const initialFormValue: IShipmentRequestModel = {
        firstName: props.shipmentrequest ? props.shipmentrequest!.firstName : '',
        lastName: props.shipmentrequest ? props.shipmentrequest!.lastName : '',
        email: props.shipmentrequest ? props.shipmentrequest!.email : '',
        phoneNumber: props.shipmentrequest ? props.shipmentrequest!.phoneNumber : '',
        description: props.shipmentrequest ? props.shipmentrequest!.description : '',
        waybill: props.shipmentrequest ? props.shipmentrequest!.waybill : '',
        customer: props.shipmentrequest ? props.shipmentrequest!.customer : '',
        reciever: props.shipmentrequest ? props.shipmentrequest!.reciever : '',
        pickupOptions: props.shipmentrequest ? props.shipmentrequest!.pickupOptions : '',
        shipmentId: props.shipmentrequest ? props.shipmentrequest!.shipmentId : '',
        serviceCenterId: props.shipmentrequest ? props.shipmentrequest!.serviceCenterId : '',
        customerAddress: props.shipmentrequest ? props.shipmentrequest!.customerAddress : '',
        recieverAddress: props.shipmentrequest ? props.shipmentrequest!.recieverAddress : '',
    }

    const validationSchema = Yup.object({
        firstName: Yup.string().required(),
        lastName: Yup.string().required(),
        email: Yup.string().required(),
        phoneNumber: Yup.string().required(),
        description: Yup.string().required(),
        waybill: Yup.string().required(),
        customer: Yup.string().required(),
        shipmentId: Yup.string().required(),
        reciever: Yup.string().required(),
        pickupOptions: Yup.string().required(),
        serviceCenterId: Yup.string().required(),
        customerAddress: Yup.string().required(),
        recieverAddress: Yup.string().required()
    })

    const classes = useStyles()

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
                                <h2>{"Add Request"}</h2>
                                <div
                                    className='btn btn-sm btn-icon btn-active-color-primary'
                                    data-bs-dismiss='modal'
                                >
                                    <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
                                </div>
                            </div>
                            <div className='modal-body' >
                                {props.showError && <ErrorAlert type={'danger'} message={props.errorMessage!.toString()} heading={'Oh snap! You got an error!'} />}
                                {props.showForm && (
                                    <Grid container className={classes.root}>
                                        <Grid item xs={3}>

                                            <IrisTextInput
                                                type='text'
                                                placeholder='shipmentId'
                                                name='shipmentId'
                                                label='shipmentId'
                                            />
                                            <IrisTextInput
                                                type='text'
                                                name='firstName'
                                                placeholder='first Name'
                                                label='first Name'
                                            />
                                            <IrisTextInput
                                                type='text'
                                                placeholder='lastName'
                                                name='lastName'
                                                label='last Name'
                                            />
                                            <IrisTextInput
                                                type='text'
                                                placeholder='email'
                                                name='email'
                                                label='email'
                                            />

                                        </Grid>
                                        <Grid item xs={3}>
                                            <IrisTextInput
                                                type='text'
                                                placeholder='description'
                                                name='description'
                                                label='description'
                                            />

                                            <IrisTextInput
                                                type='text'
                                                placeholder='waybill'
                                                name='waybill'
                                                label='waybill'
                                            />
                                            <IrisTextInput
                                                type='text'
                                                placeholder='customer'
                                                name='customer'
                                                label='customer'
                                            />
                                            <IrisTextInput
                                                type='text'
                                                placeholder='recieverAddress'
                                                name='recieverAddress'
                                                label='recieverAddress'
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <IrisTextInput
                                                type='text'
                                                placeholder='reciever'
                                                name='reciever'
                                                label='reciever'
                                            />

                                            <IrisTextInput
                                                type='text'
                                                placeholder='pickupOptions'
                                                name='pickupOptions'
                                                label='pickupOptions'
                                            />

                                            <IrisTextInput
                                                type='text'
                                                placeholder='phoneNumber'
                                                name='phoneNumber'
                                                label='phoneNumber'
                                            />

                                            <IrisTextInput
                                                type='text'
                                                placeholder='serviceCenterId'
                                                name='serviceCenterId'
                                                label='serviceCenterId'
                                            />

                                            <IrisTextInput
                                                type='text'
                                                placeholder='customerAddress'
                                                name='customerAddress'
                                                label='customerAddress'
                                            />
                                        </Grid>
                                    </Grid>
                                )}
                                {!props.showForm && <ErrorAlert type={'success'} message={'Shipment request created Successfully!'} heading={'Confirmation Message!'} />}
                            </div>
                            <div className='modal-body py-lg-10 px-lg-10'>
                            </div>

                            <Modal.Footer>
                                {props.showForm &&
                                    (<Button
                                        floated='right'
                                        positive
                                        type='submit'
                                        variant='primary'
                                        loading={props.isSubmitting}
                                        content='Submit'
                                    />
                                    )}
                                <Button
                                    floated='right'
                                    positive
                                    type='reset'
                                    variant='primary'
                                    onClick={props.handleClick}
                                    data-bs-dismiss='modal'
                                    content='Cancel'
                                />
                            </Modal.Footer>
                        </div>
                    </div>
                </Form>
            </Formik>
        </>
    )
}
