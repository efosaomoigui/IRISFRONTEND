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
import ErrorAlert from '../../common/ErrorAlert'
import { useState } from 'react'
// import IrisTextRadio from '../../layout/forms/IrisTextRadio'

// interface Props {
//   userVal: IUserModel
// }

interface Props<Values> {
  onSubmit: (values: Values, formikHelpers: FormikHelpers<Values>) => void | Promise<any>
  isSubmitting: boolean
  fleet?: IFleetModel
  showForm?: boolean
  formTitle?: string
  showError?: boolean
  errorMessage?: string
  handleClick?: () => void
}

const options = [ 
  {text: 'one', value: 'Bag'},
  {text: 'two', value: 'Serial'},
  {text: 'three', value: 'Turkey'},
  {text: 'four', value: 'Afganistan'},
]

export default function EditFleetForm(props: Props<IFleetModel>) {
  const {entityValues, setEntityValues, selectUrlParam, setSelectUrlParam, formTitle, setFormTitle} = usePageData()

  const initialFormValue: IFleetModel = {
    fleetId: props.fleet ? props.fleet!.fleetId : '',
    fleetType: props.fleet ? props.fleet!.fleetType : 48,
    chassisNumber: props.fleet ? props.fleet!.chassisNumber : '',
    status: props.fleet ? props.fleet!.status : true,
    capacity: props.fleet ? props.fleet!.capacity : 200,
    fleetModel: props.fleet ? props.fleet!.fleetModel : '',
    fleetMake: props.fleet ? props.fleet!.fleetMake : '',
    ownerId: props.fleet ? props.fleet!.ownerId : '',
  }

  const validationSchema = Yup.object({
    fleetId: Yup.string().required(),
    chassisNumber: Yup.string().required(),
    status: Yup.boolean().required(),
    fleetType: Yup.number().required(),
    capacity: Yup.number().required(),
    fleetModel: Yup.string().required(),
    fleetMake: Yup.string().required(),
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
                <h2>{"Edit Fleet"}</h2>
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
                        name='fleetId'
                        placeholder='FleetId'
                        label='FleetId'
                      />
                      <IrisTextInput
                        type='text'
                        placeholder='Registration Number'
                        name='registrationNumber'
                        label='Registration Number'
                      />
                      <IrisTextInput
                        type='text'
                        placeholder='Chasis Number'
                        name='chassisNumber'
                        label='Chasis Number'
                      />
                      <IrisTextInput
                        type='text'
                        placeholder='Engine Number'
                        name='engineNumber'
                        label='Engine Number'
                      />
                    </Grid>
                     <Grid item xs={3}>
                        <IrisTextInput
                          type='text'
                          placeholder='Status'
                          name='status'
                          label='status'
                        />

                      <IrisTextInput
                        type='text'
                        placeholder='Fleet Type'
                        name='fleetType'
                        label='Fleet Type'
                      />
                      <IrisTextInput
                        type='text'
                        placeholder='Capacity'
                          name='capacity'
                        label='Capacity'
                      />
                      <IrisTextInput
                        type='text'
                        placeholder='Description'
                          name='description'
                        label='Description'
                      />
                     </Grid>
                     <Grid item xs={3}>
                      <IrisTextInput
                        type='text'
                        placeholder='Fleet Model'
                          name='fleetModel'
                        label='Fleet Model'
                      />

                      <IrisTextInput
                        type='text'
                        placeholder='Fleet Make'
                        name='fleetMake'
                        label='Fleet Make'
                      />

                      <IrisTextInput
                        type='text'
                        placeholder='Owner Id'
                        name='ownerId'
                        label='Owner Id'
                      />
                     </Grid>
                  </Grid>
                )}
                {!props.showForm && <ErrorAlert type={'success'} message={'Fleet Created Successfully!'} heading={'Confirmation Message!'} />}
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
