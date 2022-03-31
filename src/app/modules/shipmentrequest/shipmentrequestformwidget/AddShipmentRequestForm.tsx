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
        FirstName: props.shipmentrequest ? props.shipmentrequest!.FirstName : '',
        LastName: props.shipmentrequest ? props.shipmentrequest!.LastName : '',
        email: props.shipmentrequest ? props.shipmentrequest!.email : '',
        PhoneNumber: props.shipmentrequest ? props.shipmentrequest!.PhoneNumber : '',
        Description: props.shipmentrequest ? props.shipmentrequest!.Description : '',
        Waybill: props.shipmentrequest ? props.shipmentrequest!.Waybill : '',
        Customer: props.shipmentrequest ? props.shipmentrequest!.Customer : '',
        GrandTotal: props.shipmentrequest ? props.shipmentrequest!.GrandTotal : '',
        Reciever: props.shipmentrequest ? props.shipmentrequest!.Reciever : '',
        pickUpOptions: props.shipmentrequest ? props.shipmentrequest!.pickUpOptions : '',
        ownerId: props.shipmentrequest ? props.shipmentrequest!.ownerId : '',
    }

    const validationSchema = Yup.object({
        FirstName: Yup.string().required(),
        LastName: Yup.string().required(),
        email: Yup.string().required(),
        PhoneNumber: Yup.string().required(),
        Description: Yup.string().required(),
        Waybill: Yup.string().required(),
        Customer: Yup.string().required(),
        GrandTotal: Yup.string().required(),
        Reciever: Yup.string().required(),
        pickUpOptions: Yup.string().required(),
        ownerId: Yup.string().required(),
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
                                                placeholder='Owner Id'
                                                name='ownerId'
                                                label='Owner Id'
                                            />
                                            <IrisTextInput
                                                type='text'
                                                name='FirstName'
                                                placeholder='FirstName'
                                                label='First Name'
                                            />
                                            <IrisTextInput
                                                type='text'
                                                placeholder='LastName'
                                                name='LastName'
                                                label='Last Name'
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
                                                placeholder='Description'
                                                name='Description'
                                                label='Description'
                                            />

                                            <IrisTextInput
                                                type='text'
                                                placeholder='Waybill'
                                                name='Waybill'
                                                label='Waybill'
                                            />
                                            <IrisTextInput
                                                type='text'
                                                placeholder='Customer'
                                                name='Customer'
                                                label='Customer'
                                            />
                                            <IrisTextInput
                                                type='text'
                                                placeholder='GrandTotal'
                                                name='GrandTotal'
                                                label='GrandTotal'
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <IrisTextInput
                                                type='text'
                                                placeholder='Reciever'
                                                name='Reciever'
                                                label='Reciever'
                                            />
                                            
                                            <IrisTextInput
                                                type='text'
                                                placeholder='pickUpOptions'
                                                name='pickUpOptions'
                                                label='pickUpOptions'
                                            />

                                            <IrisTextInput
                                                type='text'
                                                placeholder='PhoneNumber'
                                                name='PhoneNumber'
                                                label='PhoneNumber'
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
