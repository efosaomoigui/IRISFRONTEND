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





// interface Props {
//   userVal: IUserModel
// }

interface Props<Values> {
    onSubmit: (values: Values, formikHelpers: FormikHelpers<Values>) => void | Promise<any>
    isSubmitting: boolean
    trip?: ITripModel
    showForm?: boolean
}

const options = [
    { text: 'one', value: 'Bag' },
    { text: 'two', value: 'Serial' },
    { text: 'three', value: 'Turkey' },
    { text: 'four', value: 'Afganistan' },
]

export default function AddTripForm(props: Props<ITripModel>) {

    const {
        entityDetailValues,
        setEntityDetailValues,
        selectUrlParam,
        setSelectUrlParam,
        formTitle,
        setFormTitle,
      } = usePageData()
      
    const initialFormValue: ITripModel = {
        id: props.trip ? props.trip!.id : '',
        TripReference: props.trip ? props.trip!.TripReference :'',
        RouteCode: props.trip ? props.trip!.RouteCode:'',
        fleetid: props.trip ? props.trip!.fleetid :'',
        fleet: props.trip ? props.trip!.fleet :'',
        ManifestId: props.trip ? props.trip!.ManifestId :'',
        manifest: props.trip ? props.trip!.manifest :'',
        Driver: props.trip ? props.trip!.Driver :'',
        Dispatcher: props.trip ? props.trip!.Dispatcher :'',
        DriverDispatchFee: props.trip ? props.trip!.DriverDispatchFee :'',
        Miscelleneous: props.trip ? props.trip!.Miscelleneous :'',
        FuelCosts: props.trip ? props.trip!.FuelCosts :'',
        FuelUsed: props.trip ? props.trip!.FuelUsed :'',
        StartTime: props.trip ? props.trip!.StartTime :'',
        EndTime: props.trip ? props.trip!.EndTime :'',
        status: props.trip ? props.trip!.status :'',
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
                                <h2>{formTitle + ' Trip Dispatch'}</h2>
                                <div
                                    className='btn btn-sm btn-icon btn-active-color-primary'
                                    data-bs-dismiss='modal'
                                >
                                    <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
                                </div>
                            </div>
                            <div className='modal-body' >
                                {props.showForm &&
                                    <Grid container className={classes.root}>
                                        <Grid item xs={6}>
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
                                        </Grid>
                                        <Grid item xs={6}>
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
                                        </Grid>
                                    </Grid>
                                }
                                {!props.showForm && <Alert severity="info">Trip Created Successfully!</Alert>}
                            </div>
                            <div className='modal-body py-lg-10 px-lg-10'>
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
