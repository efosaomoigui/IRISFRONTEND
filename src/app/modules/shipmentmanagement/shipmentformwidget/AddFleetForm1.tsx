import {Modal} from 'react-bootstrap-v5'
import {Button} from 'semantic-ui-react'
import {KTSVG} from '../../../../_iris/helpers'
import {Formik, Form, FormikHelpers, Field} from 'formik'
import * as Yup from 'yup'
import IrisTextInput from '../../layout/forms/IrisTextInput'
import IrisSelectInput from '../../layout/forms/IrisSelectInput'
import {IFleetModel} from '../ShipmentModels/ShipmentInterfaces'
import {usePageData} from '../../../../_iris/layout/core'
import useStyles from '../../layout/formstyles/FormStyle'
import {Alert, Autocomplete, TextField} from '@mui/material'
import {Grid} from '@material-ui/core'
import {boolean} from 'yup/lib/locale'
import ErrorAlert from '../../common/ErrorAlert'
import {IUserModel} from '../../auth/models/AuthInterfaces'
import agent from '../../../../setup/axios/AxiosAgent'
import {useEffect, useState} from 'react'

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

export default function AddFleetForm1(props: Props<IFleetModel>) {
  const {
    entityValues,
    setEntityValues,
    selectUrlParam,
    setSelectUrlParam,
    formTitle,
    setFormTitle,
  } = usePageData()

  const [users, setUsers] = useState<IUserModel[]>([])
  const [user, setUser] = useState<IUserModel | null>(null)
  const [loadingData, setLoadingData] = useState(true)

  const initialFormValue: IFleetModel = {
    fleetId: props.fleet ? props.fleet!.fleetId : '',
    fleetType: props.fleet ? props.fleet!.fleetType : 48,
    chassisNumber: props.fleet ? props.fleet!.chassisNumber : '',
    capacity: props.fleet ? props.fleet!.capacity : 200,
    fleetModel: props.fleet ? props.fleet!.fleetModel : '',
    fleetMake: props.fleet ? props.fleet!.fleetMake : '',
    ownerId: props.fleet ? props.fleet!.ownerId : '',
  }

  const capacity = [
    {optionValue: 0, optionLabel: 'Select Capacity'},
    {optionValue: 1, optionLabel: 1},
    {optionValue: 10, optionLabel: 10},
    {optionValue: 15, optionLabel: 15},
    {optionValue: 30, optionLabel: 30},
  ]

  const fleetType = [
    {optionValue: '', optionLabel: 'Select Fleet Type'},
    {optionValue: 1, optionLabel: 'Truck'},
    {optionValue: 2, optionLabel: 'Van'},
    {optionValue: 3, optionLabel: 'Vessel'},
    {optionValue: 4, optionLabel: 'Airplane'},
    {optionValue: 5, optionLabel: 'SalonCar'},
    {optionValue: 6, optionLabel: 'MiniTruck'},
    {optionValue: 7, optionLabel: 'Motorcycle'},
    {optionValue: 8, optionLabel: 'Vehicle'},
    {optionValue: 9, optionLabel: 'Boat'},
  ]

  const validationSchema = Yup.object({
    chassisNumber: Yup.string().required(),
    fleetType: Yup.number().required(),
    capacity: Yup.number().required(),
    fleetModel: Yup.string().required(),
    fleetMake: Yup.string().required(),
    // ownerId: Yup.string().required(),
  })

  const loadUsers = async () => {
    const val = await agent.Users.list().then((response) => {
      const autoVals = response.map((option, index) => ({
        id: option.id,
        label: option.firstName + ' ' + option.lastName + ' (' + option.phoneNumber + ')',
        userId: option.userId,
        username: option.username,
        firstName: option.firstName,
        lastName: option.firstName,
        email: option.email,
        phoneNumber: option.phoneNumber,
      }))
      setUsers(autoVals)
    })
  }

  //USE EFFECT HOOK
  useEffect(() => {
    // const callFunc = async () => {
    //   await agent.Route.list().then((response) => {
    //     setRouteModel(response)
    //     setLoadingData(false)
    //   })
    // }
    if (loadingData) {
      // callFunc()
      loadUsers()
    }

    // if (reloadingUser) {
    //   loadUsers()
    //   setReloadingUser(false)
    // }
  }, [])

  const classes = useStyles()

  return (
    <>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialFormValue}
        enableReinitialize
        onSubmit={props.onSubmit}
      >
        {({values, handleChange, handleSubmit}) => ( 
        <Form className='ui form' autoComplete='off'>
          <div className='modal-dialog modal-dialog-centered mw-900px'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h2>{'Add Fleet'}</h2>
                <div
                  className='btn btn-sm btn-icon btn-active-color-primary'
                  data-bs-dismiss='modal'
                >
                  <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
                </div>
              </div>
              <div className='modal-body'>
                {props.showError && (
                  <ErrorAlert
                    type={'danger'}
                    message={props.errorMessage!.toString()}
                    heading={'Oh snap! You got an error!'}
                  />
                )}
                {props.showForm && (
                  <Grid container className={classes.root}>
                    <Grid item xs={6}>
                      <IrisTextInput
                        type='text'
                        placeholder='Chasis Number'
                        name='chassisNumber'
                        label='Chasis Number'
                      />

                      <Field
                        as='select'
                        name='capacity'
                        className='form-select'
                        label='Caoacity'
                        style={{marginTop: '20px', width: '90%'}}
                      >
                        {capacity.length &&
                          capacity.map((unit, index) => {
                            return (
                              <option key={index} value={unit.optionValue}>
                                {unit.optionLabel}
                              </option>
                            )
                          })}
                      </Field>
                      <IrisTextInput
                        type='text'
                        placeholder='Fleet Model'
                        name='fleetModel'
                        label='Fleet Model'
                      />

                      <Field
                        as='select'
                        name='fleetType'
                        className='form-select'
                        label='Fleet Type'
                        style={{marginTop: '13px', width: '90%'}}
                      >
                        {fleetType.length &&
                          fleetType.map((unit, index) => {
                            return (
                              <option key={index} value={unit.optionValue}>
                                {unit.optionLabel}
                              </option>
                            )
                          })}
                      </Field>
                    </Grid>
                    <Grid item xs={6}>
                      <IrisTextInput
                        type='text'
                        placeholder='Fleet Make'
                        name='fleetMake'
                        label='Fleet Make'
                      />

                      {/* <IrisTextInput
                        type='text'
                        placeholder='Owner Id'
                        name='ownerId'
                        label='Owner Id'
                      /> */}

                      <Autocomplete
                        options={users}
                        sx={{width: '100%'}}
                        renderInput={(params) => (
                          <TextField {...params} label='Select Fleet Owner' />
                        )}
                        value={user}
                        onChange={(event: any, newValue: IUserModel | null) => {setUser(newValue); values.ownerId = newValue!.userId!}}
                      />

                      {/* <Field
                        type='hidden' 
                        name='ownerId'
                        value='ddd'
                      ></Field> */}

                      {/* {user && <input type='hidden' name='ownerId' value={user.userId} />} */}

                    </Grid>
                  </Grid>
                )}
                {!props.showForm && (
                  <ErrorAlert
                    type={'success'}
                    message={'Fleet Created Successfully!'}
                    heading={'Confirmation Message!'}
                  />
                )}
              </div>
              <div className='modal-body py-lg-10 px-lg-10'></div>

              <Modal.Footer>
                {props.showForm && (
                  <Button
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
        )}
      </Formik>
    </>
  )
}
