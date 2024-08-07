import {FormLabel, Modal} from 'react-bootstrap-v5'
import {Button, Radio} from 'semantic-ui-react'
import {Formik, Form, FormikHelpers, Field} from 'formik'
import * as Yup from 'yup'
import {
  Category,
  Gender,
  GenderType,
  IUserModel,
  requirePasswordChanged,
  UserType,
} from '../../auth/models/AuthInterfaces'
import {KTSVG} from '../../../../_iris/helpers'
import IrisTextInput from '../../layout/forms/IrisTextInput'
import IrisSelectInput from '../../layout/forms/IrisSelectInput'
import {FormControlLabel, Grid, RadioGroup} from '@material-ui/core'
import useStyles from '../../layout/formstyles/FormStyle'
import IrisTextRadio from '../../layout/forms/IrisTextRadio'
import {Alert} from '@mui/material'
import {usePageData} from '../../../../_iris/layout/core'
import ErrorAlert from '../../common/ErrorAlert'
import {useEffect, useState} from 'react'

interface Props<Values> {
  onSubmit: (values: Values, formikHelpers: FormikHelpers<Values>) => void | Promise<any>
  isSubmitting: boolean
  user?: any //change here by Mr Efe
  showForm?: boolean
  formTitle?: string
  showError?: boolean
  errorMessage?: string
  handleClick?: () => void
  requirePasswordChanged?: requirePasswordChanged
}

export default function EditUserForm(props: Props<IUserModel>) {
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

  const initialFormValue: IUserModel = {
    userId: props.user ? props.user!.userId : '',
    username: props.user ? props.user!.username : '',
    password: props.user ? props.user!.password : '',
    firstName: props.user ? props.user!.firstName : '',
    lastName: props.user ? props.user!.lastName : '',
    email: props.user ? props.user!.email : '',
    phoneNumber: props.user ? props.user!.phoneNumber : '',
    requirePasswordChanged: 'Yes',
    // gender: props.user ? props.user!.gender : Gender.Male,
    // userType: props.user ? props.user!.userType : Category.Corporate,
  }

  const validationSchema = Yup.object({
    // username: Yup.string().required(),
    // firstName: Yup.string().required(),
    password: Yup.string().required(),
    // lastName: Yup.string().required(),
    // email: Yup.string().required(),
    // phoneNumber: Yup.string().required(),
    // gender: Yup.string().required(),
    // userType: Yup.string().required(),
    // requirePasswordChanged: Yup.string().required(),
  })

  const classes = useStyles()
  // const optionsArray1 = [
  //   {label: 'Male', value: "1"},
  //   {label: 'Female', value: "2"}
  // ]
  // const optionsArray2 = [
  //   {label: 'Corporate', value: "1"},
  //   {label: 'Individual', value: "2"}
  // ]

  return (
    <>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialFormValue}
        enableReinitialize
        onSubmit={props.onSubmit}
      >
        {({values, setFieldValue}) => (
          <Form>
            <div className='modal-dialog modal-dialog-centered mw-900px'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h2>{'Edit User (Password)'}</h2>
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
                      {/* <Grid item xs={6}>
                        <input type='hidden' name='userId' />
                        <IrisTextInput type='text' name='username' label='User Name' />
                        <IrisTextInput type='text' name='firstName' label='First Name' />
                        <IrisTextInput type='text' name='lastName' label='Last Name' />
                        <IrisTextInput type='email' name='email' label='Email' />
                      </Grid> */}

                      <Grid item xs={12}>
                        {/* <IrisTextInput type='text' name='phoneNumber' label='Phone Number' /> */}

                        {/* <IrisTextRadio
                          name='gender'
                          value={values.gender?.toString()}
                          options={optionsArray1}
                        /> */}
                        {/* <label className='mt-3'>Require Password Changed?</label> */}
                        {/* <div role='group' aria-labelledby='my-radio-group' className='m-2'> */}
                          {/* <Field
                            className='form-check-input m-1'
                            type='radio'
                            name='requirePasswordChanged'
                            value='No'
                          />
                          <label className='form-check-label m-1'>No</label> */}

                          {/* <Field
                            className='form-check-input m-1'
                            type='radio'
                            name='requirePasswordChanged'
                            value='Yes'
                          />
                          <label className='form-check-label m-1'>Yes</label> */}

                          {/* <div>Picked: {values.requirePasswordChanged}</div> */}
                        {/* </div> */}

                        <IrisTextInput type='password' name='password' label='Password' />

                        {/* <IrisTextRadio
                          name='userType'
                          value={values.userType?.toString()}
                          options={optionsArray2}
                        /> */}
                      </Grid>

                      <Grid item xs={12}></Grid>
                    </Grid>
                  )}
                  {!props.showForm && (
                    <ErrorAlert
                      type={'success'}
                      message={'User Created Successfully!'}
                      heading={'Confirmation Message!'}
                    />
                  )}
                </div>

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
