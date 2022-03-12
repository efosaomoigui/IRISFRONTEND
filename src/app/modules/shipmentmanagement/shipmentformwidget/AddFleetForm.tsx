import {Modal} from 'react-bootstrap-v5'
import {Button} from 'semantic-ui-react'
import {KTSVG} from '../../../../_iris/helpers'
import {Formik, Form, FormikHelpers} from 'formik'
import * as Yup from 'yup'
import IrisTextInput from '../../layout/forms/IrisTextInput'
import IrisSelectInput from '../../layout/forms/IrisSelectInput'
import {IFleetModel} from '../ShipmentModels/ShipmentInterfaces'
import { usePageData } from '../../../../_iris/layout/core'
import useStyles from '../../layout/formstyles/FormStyle'
import { Alert } from '@mui/material'
import { Grid } from '@material-ui/core'

// interface Props {
//   userVal: IUserModel
// }

interface Props<Values> {
  onSubmit: (values: Values, formikHelpers: FormikHelpers<Values>) => void | Promise<any>
  isSubmitting: boolean
  fleet?: IFleetModel
  showForm?: boolean
}

const options = [
  {text: 'one', value: 'Bag'},
  {text: 'two', value: 'Serial'},
  {text: 'three', value: 'Turkey'},
  {text: 'four', value: 'Afganistan'},
]

export default function AddFleetForm(props: Props<IFleetModel>) {
  const {entityValues, setEntityValues, selectUrlParam, setSelectUrlParam, formTitle, setFormTitle} = usePageData()

  const initialFormValue: IFleetModel = {
    FleetId: props.fleet ? props.fleet!.FleetId : '',
    RegistrationNumber: props.fleet ? props.fleet!.RegistrationNumber : '',
    ChasisNumber: props.fleet ? props.fleet!.ChasisNumber : '',
    EngineNumber: props.fleet ? props.fleet!.EngineNumber : '',
    Status: props.fleet ? props.fleet!.Status : '',
    FleetType: props.fleet ? props.fleet!.FleetType : '',
    Capacity: props.fleet ? props.fleet!.Capacity : '',
    Description: props.fleet ? props.fleet!.Description : '',
    FleetModel: props.fleet ? props.fleet!.FleetModel : '',
    FleetMake: props.fleet ? props.fleet!.FleetMake : '',
    OwnerId: props.fleet ? props.fleet!.OwnerId : '',
  }

  const validationSchema = Yup.object({
    FleetId: Yup.string().required(),
    RegistrationNumber: Yup.string().required(),
    ChasisNumber: Yup.number().required(),
    EngineNumber: Yup.number().required(),
    Status: Yup.string().required(),
    FleetType: Yup.string().required(),
    Capacity: Yup.string().required(),
    Description: Yup.string().required(),
    FleetModel: Yup.string().required(),
    FleetMake: Yup.string().required(),
    OwnerId: Yup.string().required(),
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
                <h2>{formTitle+" Fleet"}</h2>
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
                    <Grid item xs={3}>
                      <IrisTextInput
                        type='text'
                        name='FleetId'
                        placeholder='FleetId'
                        label='FleetId'
                      />
                      <IrisTextInput
                        type='number'
                        placeholder='Registration Number'
                        name='RegistrationNumber'
                        label='Registration Number'
                      />
                      <IrisTextInput
                        type='number'
                        placeholder='Chasis Number'
                        name='ChasisNumber'
                        label='Chasis Number'
                      />
                    </Grid>
                     <Grid item xs={3}>
                      <IrisTextInput
                        type='text'
                        placeholder='Fleet Type'
                        name='FleetType'
                        label='Fleet Type'
                      />
                      <IrisTextInput
                        type='text'
                        placeholder='Capacity'
                        name='Capacity'
                        label='Capacity'
                      />
                      <IrisTextInput
                        type='text'
                        placeholder='Description'
                        name='Description'
                        label='Description'
                      />
                     </Grid>
                     <Grid item xs={3}>
                      <IrisTextInput
                        type='text'
                        placeholder='Fleet Model'
                        name='FleetModel'
                        label='Fleet Model'
                      />

                      <IrisTextInput
                        type='text'
                        placeholder='Fleet Make'
                        name='FleetMake'
                        label='Fleet Make'
                      />

                      <IrisTextInput
                        type='number'
                        placeholder='Owner Id'
                        name='OwnerId'
                        label='Owner Id'
                      />
                     </Grid>
                  </Grid>
                }
                {!props.showForm && <Alert severity="info">Fleet Created Successfully!</Alert>}
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
