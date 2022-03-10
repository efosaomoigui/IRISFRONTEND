import { Modal } from 'react-bootstrap-v5'
import { Button } from 'semantic-ui-react'
import { KTSVG } from '../../../../_iris/helpers'
import { Formik, Form, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import IrisTextInput from '../../layout/forms/IrisTextInput'
import { IManifestModel } from '../ShipmentModels/ShipmentInterfaces'
import { Grid } from '@material-ui/core'
import { Alert } from '@mui/material'
import useStyles from '../../layout/formstyles/FormStyle'
import { usePageData } from '../../../../_iris/layout/core'
import { useState } from 'react'
import ErrorAlert from '../../common/ErrorAlert'


// interface Props {
//   userVal: IUserModel
// }

interface Props<Values> {
    onSubmit: (values: Values, formikHelpers: FormikHelpers<Values>) => void | Promise<any>
    isSubmitting: boolean
    manifest?: IManifestModel
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

export default function AddManifestForm(props: Props<IManifestModel>) {
    const {
        entityDetailValues,
        setEntityDetailValues,
        selectUrlParam,
        setSelectUrlParam,
        formTitle,
        setFormTitle,
    } = usePageData()

    const [errorMessage, setErrorMessage] = useState('')
    const [showError, setShowError] = useState(true)
    
    const initialFormValue: IManifestModel = {
        Id: props.manifest ? props.manifest!.Id : '',
        ManifestCode: props.manifest ? props.manifest!.ManifestCode : '',
        GroupWayBillId: props.manifest ? props.manifest!.GroupWayBillId : '',
    }

    const validationSchema = Yup.object({
        Id: Yup.string().required(),
        ManifestCode: Yup.string().required(),
        GroupWayBillId: Yup.string().required(),
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
                                <h2>{'Add Trip Dispatch'}</h2>
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
                                        <Grid item xs={6}>
                                            <IrisTextInput
                                                type='text'
                                                name='Id'
                                                placeholder='Id'
                                                label='Id'
                                            />
                                            <IrisTextInput
                                                type='text'
                                                placeholder='ManifestCode'
                                                name='ManifestCode'
                                                label='ManifestCode'
                                            />
                                            <IrisTextInput
                                                type='number'
                                                placeholder='GroupWayBillId'
                                                name='GroupWayBillId'
                                                label='GroupWayBillId'
                                            />
                                        </Grid>
                                    </Grid>
                                )}
                                {!props.showForm && <ErrorAlert type={'success'} message={'Manifest Created Successfully!'} heading={'Confirmation Message!'} />}
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
