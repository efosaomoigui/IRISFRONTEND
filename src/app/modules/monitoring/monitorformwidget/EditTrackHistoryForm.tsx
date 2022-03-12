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
        TripId: props.trackHistory ? props.trackHistory!.TripId :  '',
        Trip: props.trackHistory ? props.trackHistory!.Trip : '',
        Action: props.trackHistory ? props.trackHistory!.Action:'',
        Location: props.trackHistory ? props.trackHistory!.Location: '',
        TimeStamp: props.trackHistory ? props.trackHistory!.TimeStamp :'',
        Status: props.trackHistory ? props.trackHistory!.Status :''
    }

    const validationSchema = Yup.object({
        id: Yup.string().required(),
        TripId: Yup.string().required(),
        Trip: Yup.string().required(),
        Action: Yup.string().required(),
        Location: Yup.string().required(),
        TimeStamp: Yup.string().required(),
        Status: Yup.string().required(),
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
                                                name='id'
                                                label='id'
                                            />

                                            <IrisTextInput
                                                type='text'
                                                name='TripId'
                                                label='TripId'
                                            />
                                            <IrisTextInput
                                                type='text'
                                                name='Action'
                                                label='Action'
                                            />
                                            <IrisTextInput
                                                type='text'
                                                name='Location'
                                                label='Location'
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <IrisTextInput
                                                type='text'
                                                name='Status'
                                                label='Status'
                                            />

                                            <IrisTextInput
                                                type='text'
                                                name='Trip'
                                                label='Trip'
                                            />

                                            <IrisDatePicker
                                                placeholderText='TimeStamp'
                                                name='TimeStamp'
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
