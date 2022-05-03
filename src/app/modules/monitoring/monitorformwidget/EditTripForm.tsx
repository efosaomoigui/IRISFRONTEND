import { Modal } from 'react-bootstrap-v5'
import { Button } from 'semantic-ui-react'
import { Formik, Form, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { KTSVG } from '../../../../_iris/helpers'
import IrisTextInput from '../../layout/forms/IrisTextInput'
import IrisSelectInput from '../../layout/forms/IrisSelectInput'
import { ITripModel } from '../Monitor models/MonitorInterface'
import {usePageData} from '../../../../_iris/layout/core'
import { Grid } from '@material-ui/core'
import { Alert } from '@mui/material'
import useStyles from '../../layout/formstyles/FormStyle'
import { useState } from 'react'
import ErrorAlert from '../../common/ErrorAlert'
import IrisDatePicker from '../../layout/forms/IrisDatePicker'





// interface Props {
//   userVal: IUserModel
// }

interface Props<Values> {
    onSubmit: (values: Values, formikHelpers: FormikHelpers<Values>) => void | Promise<any>
    isSubmitting: boolean
    trip?: ITripModel
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

export default function EditTripForm(props: Props<ITripModel>) {

    const {
        entityValues,
        setEntityValues,
        selectUrlParam,
        setSelectUrlParam,
        formTitle,
        setFormTitle,
      } = usePageData()

    const [errorMessage, setErrorMessage] = useState('')
    const [showError, setShowError] = useState(true)
      
    const initialFormValue: ITripModel = {
        id: props.trip ? props.trip!.id : '',
        tripReference: props.trip ? props.trip!.tripReference : '',
        routeCode: props.trip ? props.trip!.routeCode : '',
        manifestList: props.trip ? props.trip!.manifestList : [], 
        fleet: props.trip ? props.trip!.fleet : '',
        dispatcher: props.trip ? props.trip!.dispatcher : '',
        driver: props.trip ? props.trip!.driver : '', 
    }

    const validationSchema = Yup.object({
        id: Yup.string().required(),
        tripReference: Yup.string().required(),
        routeCode: Yup.string().required(),
        fleet: Yup.string().required(),
        dispatcher: Yup.string().required(),
        driver: Yup.string().required(),
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
                                <h2>{'Edit Trip Dispatch'}</h2>
                                <div
                                    className='btn btn-sm btn-icon btn-active-color-primary'
                                    data-bs-dismiss='modal'
                                >
                                    <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
                                </div>
                            </div>
                            <div className='modal-body' >
                                {props.showError && <ErrorAlert type={'danger'} message={props.errorMessage!.toString()} heading={'Oh snap! You got an error!'} />}
                                {props.showForm &&(
                                    <Grid container className={classes.root}>
                                        <Grid item xs={3}>
                                            <IrisTextInput
                                                type='text'
                                                placeholder='Trip Id'
                                                name='id'
                                                label='Trip Id'
                                            />
                                            <IrisTextInput
                                                type='text'
                                                name='tripReference'
                                                placeholder='Trip Reference'
                                                label='Trip Reference'
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <IrisTextInput
                                                type='text'
                                                placeholder='Driver'
                                                name='driver'
                                                label='Driver'
                                            />
                                            <IrisTextInput
                                                type='text'
                                                placeholder='RouteCode'
                                                name='routeCode'
                                                label='RouteCode'
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <IrisTextInput
                                                type='text'
                                                placeholder='fleet'
                                                name='fleet'
                                                label='fleet'
                                            />
                                            <IrisTextInput
                                                type='text'
                                                placeholder='dispatcher'
                                                name='dispatcher'
                                                label='dispatcher'
                                            />
                                        </Grid>
                                    </Grid>
                                )}
                                {!props.showForm && <ErrorAlert type={'success'} message={'Trip Created Successfully!'} heading={'Confirmation Message!'} />}
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
