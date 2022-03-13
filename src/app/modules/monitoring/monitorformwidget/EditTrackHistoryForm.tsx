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
import { Alert } from '@mui/material'
import { Grid } from '@material-ui/core'
import useStyles from '../../layout/formstyles/FormStyle'
import ErrorAlert from '../../common/ErrorAlert'
import { useState } from 'react'



interface Props<Values> {
    onSubmit: (values: Values, formikHelpers: FormikHelpers<Values>) => void | Promise<any>
    isSubmitting: boolean
    trackHistory?: ITrackHistoryModel
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

export default function EditTrackHistoryForm(props: Props<ITrackHistoryModel>) {

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

    const initialFormValue: ITrackHistoryModel = {
        id: props.trackHistory ? props.trackHistory!.id : '',
        tripReference: props.trackHistory ? props.trackHistory!.tripReference : '',
        action: props.trackHistory ? props.trackHistory!.action : '',
        location: props.trackHistory ? props.trackHistory!.location : '',
        timeStamp: props.trackHistory ? props.trackHistory!.timeStamp : '',
        status: props.trackHistory ? props.trackHistory!.status : ''
    }

    const validationSchema = Yup.object({
        id: Yup.string().required(),
        tripReference: Yup.string().required(),
        action: Yup.string().required(),
        location: Yup.string().required(),
        timeStamp: Yup.string().required(),
        status: Yup.string().required(),
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
                                <h2>{'Edit Track History'} </h2>
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
                                                name='tripReference'
                                                label='Trip Reference'
                                            />
                                            <IrisTextInput
                                                type='text'
                                                name='id'
                                                label='Id'
                                            />

                                            <IrisTextInput
                                                type='text'
                                                name='action'
                                                label='Action'
                                            />
                                            
                                        </Grid>
                                        <Grid item xs={3}>
                                            <IrisTextInput
                                                type='text'
                                                name='status'
                                                label='Status'
                                            />

                                            <IrisTextInput
                                                type='text'
                                                name='location'
                                                label='Location'
                                            />

                                            <IrisDatePicker
                                                placeholderText='TimeStamp'
                                                name='timeStamp'
                                                showTimeSelect
                                                timeCaption='TimeStamp'
                                                dateFormat='MMM d, yyyy h:mm: aa'
                                            />
                                        </Grid>
                                    </Grid>
                                )}
                                {!props.showForm && <ErrorAlert type={'success'} message={'Track Created Successfully!'} heading={'Confirmation Message!'} />}
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
