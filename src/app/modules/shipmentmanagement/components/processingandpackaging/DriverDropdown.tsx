/* eslint-disable jsx-a11y/anchor-is-valid */
import { Grid } from '@material-ui/core'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import React from 'react'
import { Modal } from 'react-bootstrap-v5'
import { Button } from 'semantic-ui-react'
import { KTSVG } from '../../../../../_iris/helpers/components/KTSVG'
import { Category, Gender, IUserModel } from '../../../auth/models/AuthInterfaces'
import ErrorAlert from '../../../common/ErrorAlert'
import IrisTextInput from '../../../layout/forms/IrisTextInput'
import * as Yup from 'yup'
import useStyles from '../../../layout/formstyles/FormStyle'

interface Props<Values> {
  onSubmit?: (values: Values, formikHelpers: FormikHelpers<Values>) => void | Promise<any>
  isSubmitting?: boolean
  user?: IUserModel //change here by Mr Efe
  showForm?: boolean
  formTitle?: string
  showError?: boolean
  errorMessage?: string
  handleClick?: () => void
}

export function DriverDropdown(props: Props<IUserModel>) {

  const classes = useStyles()

  const initialFormValue: IUserModel = {
    userId: props.user ? props.user!.userId : '', 
    username: props.user ? props.user!.username : '', 
    password: props.user ? props.user!.password : '', 
    firstName: props.user ? props.user!.firstName : '',
    lastName: props.user ? props.user!.lastName : '',
    email: props.user ? props.user!.email : '',
    phoneNumber: props.user ? props.user!.phoneNumber : '', 
    gender: props.user ? props.user!.gender : Gender.Male,
    userType: props.user ? props.user!.userType : Category.Corporate,  
  }

  const validationSchema = Yup.object({
    username: Yup.string().required(),
    firstName: Yup.string().required(),
    password: Yup.string().required(),
    passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
    lastName: Yup.string().required(),
    email: Yup.string().required(),
    phoneNumber: Yup.string().required(),
    gender: Yup.string().required(),
    userType: Yup.string().required(), 
  }) 

  return (
    <div className='menu menu-sub menu-sub-dropdown w-250px w-md-300px' data-kt-menu='true'>
      <div className='px-7 py-5'>
        <div className='fs-5 text-dark fw-bolder'>Add A Driver</div>
      </div>

      <div className='separator border-gray-200'></div>

      <Formik
        validationSchema={validationSchema}
        initialValues={initialFormValue}
        enableReinitialize
        onSubmit={()=> console.log("eeee")}
      >
        {({values, setFieldValue}) => (
          <Form>
            <div className='modal-dialog modal-dialog-centered mw-900px'>
              <div className='modal-content'>
                <div className='modal-body' style={{ paddingTop:'-10px' }}>
                  {/* {props.showError && (
                    <ErrorAlert
                      type={'danger'}
                      message={props.errorMessage!.toString()}
                      heading={'Oh snap! You got an error!'}
                    />
                  )} */}
                  {/* {props.showForm && ( */}
                    <Grid container>
                      <Grid item xs={12}>
                        <IrisTextInput type='text' name='username' label='User Name' />
                        <IrisTextInput type='text' name='firstName' label='First Name' />
                        <IrisTextInput type='text' name='lastName' label='Last Name' />
                        <IrisTextInput type='email' name='email' label='Email' />
                      </Grid>

                      <Grid item xs={12}>
                        <IrisTextInput type='text' name='phoneNumber' label='Phone Number' />
                        <div id='my-radio-group' className="mt-3" >Gender </div>
                        <div role='group' aria-labelledby='my-radio-group' className="m-2">
                          
                            <Field  className="form-check-input m-1" type='radio' name='gender' value='Male'   />
                            <label className="form-check-label m-1">Male</label>
                          
                            <Field className="form-check-input m-1" type='radio' name='gender' value='Female' />
                            <label className="form-check-label m-1">Female</label>
                        </div>

                        {/* <IrisTextRadio name='gender' options={optionsArray1} /> */}

                        <IrisTextInput type='password' name='password' label='Password' />

                        <IrisTextInput
                          type='password'
                          name='passwordConfirmation' 
                          label='Confirm Password'  
                        />

                        {/* <IrisTextRadio name='userType' options={optionsArray2} /> */}

                        <div id='my-radio-group' className="mt-3" >Category </div>
                        <div role='group' aria-labelledby='my-radio-group' className="m-2">
                          
                            <Field className="form-check-input m-1" type='radio' name='userType' value='Corporate'  />
                            <label className="form-check-label m-1">Individual</label>    

                            <Field  className="form-check-input m-1" type='radio' name='userType' value='Individual'/>
                            <label className="form-check-label m-1">Corporate</label>
                        </div>

                      </Grid>
                    </Grid>
                  {/* )} */}
                  {/* {!props.showForm && (
                    <ErrorAlert
                      type={'success'}
                      message={'User Creation Was Successful!'}
                      heading={'Confirmation Message!'}
                    />
                  )} */}
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

      {/* <div className='px-7 py-5'>
        <div className='mb-10'>
          <label className='form-label fw-bold'>Status:</label>

          <div>
            <select
              className='form-select form-select-solid'
              data-kt-select2='true'
              data-placeholder='Select option'
              data-allow-clear='true'
              defaultValue={'1'}
            >
              <option></option>
              <option value='1'>Approved</option>
              <option value='2'>Pending</option>
              <option value='3'>In Process</option>
              <option value='4'>Rejected</option>
            </select>
          </div>
        </div>

        <div className='mb-10'>
          <label className='form-label fw-bold'>Member Type:</label>

          <div className='d-flex'>
            <label className='form-check form-check-sm form-check-custom form-check-solid me-5'>
              <input className='form-check-input' type='checkbox' value='1' />
              <span className='form-check-label'>Author</span>
            </label>

            <label className='form-check form-check-sm form-check-custom form-check-solid'>
              <input className='form-check-input' type='checkbox' value='2' defaultChecked={true} />
              <span className='form-check-label'>Customer</span>
            </label>
          </div>
        </div>

        <div className='mb-10'>
          <label className='form-label fw-bold'>Notifications:</label>

          <div className='form-check form-switch form-switch-sm form-check-custom form-check-solid'>
            <input
              className='form-check-input'
              type='checkbox'
              value=''
              name='notifications'
              defaultChecked={true}
            />
            <label className='form-check-label'>Enabled</label>
          </div>
        </div>

        <div className='d-flex justify-content-end'>
          <button
            type='reset'
            className='btn btn-sm btn-white btn-active-light-primary me-2'
            data-kt-menu-dismiss='true'
          >
            Reset
          </button>

          <button type='submit' className='btn btn-sm btn-primary' data-kt-menu-dismiss='true'>
            Apply
          </button>
        </div>
      </div> */}
    </div>
  )
}
