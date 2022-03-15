import {FormLabel, Modal} from 'react-bootstrap-v5'
import {Button, Radio} from 'semantic-ui-react'
import {Formik, Form, FormikHelpers} from 'formik'
import * as Yup from 'yup'
import {GenderType, IUserModel, UserType} from '../../auth/models/AuthInterfaces'
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
  user?: IUserModel //change here by Mr Efe
  showForm?: boolean
  formTitle?: string
  showError?: boolean
  errorMessage?: string
  handleClick?: () => void
}

export default function AddUserForm(props: Props<IUserModel>) {
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
    userName: props.user ? props.user!.userName : '',
    password: props.user ? props.user!.password : '',
    firstName: props.user ? props.user!.firstName : '',
    lastName: props.user ? props.user!.lastName : '',
    email: props.user ? props.user!.email : '',
    phoneNumber: props.user ? props.user!.phoneNumber : '',
    gender: props.user ? props.user!.gender : GenderType['Male'],
    userType: props.user ? props.user!.userType : UserType['Individual'],
  }

  const validationSchema = Yup.object({
    userName: Yup.string().required(),
    firstName: Yup.string().required(),
    password: Yup.string().required(),
    passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
    lastName: Yup.string().required(),
    email: Yup.string().required(),
    phoneNumber: Yup.string().required(),
    gender: Yup.string().required(),
    userType: Yup.string().required(),
  })

  const classes = useStyles()
  const optionsArray1 = ['Male', 'Female']
  const optionsArray2 = ['Corporate', 'Individual']

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
                  {/* {console.log('==> ', props.user?.userId)} */}
                  <h2>{'Add User'}</h2>
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
                        <IrisTextInput type='text' name='userName' label='User Name' />
                        <IrisTextInput type='text' name='firstName' label='First Name' />
                        <IrisTextInput type='text' name='lastName' label='Last Name' />
                        <IrisTextInput type='email' name='email' label='Email' />
                      </Grid>

                      <Grid item xs={6}>
                        <IrisTextInput type='text' name='phoneNumber' label='Phone Number' />

                        <IrisTextRadio
                          name='gender'
                          options={optionsArray1} 
                        />

                        <IrisTextInput type='password' name='password' label='Password' />
                        <IrisTextInput
                          type='password'
                          name='passwordConfirmation'
                          label='Confirm Password'
                        />

                        <IrisTextRadio
                          name='userType'
                          options={optionsArray2}
                        />
                      </Grid>
                    </Grid>
                  )}
                  {!props.showForm && (
                    <ErrorAlert
                      type={'success'}
                      message={'Role Created Successfully!'}
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
