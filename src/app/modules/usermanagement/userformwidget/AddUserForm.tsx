import clsx from 'clsx'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap-v5'
import { useDispatch } from 'react-redux'
import agent from '../../../../setup/axios/AxiosAgent'
import LoadingComponent from '../../../LoadingComponent'
import { IUserModel } from '../../auth/models/AuthInterfaces'

const initialValues: IUserModel = {
  userId: '',
  password: '',
  firstName: '',
  lastName: '',
  email: '',
  age: '',
  designation: '',
  department: 'IT',
  pictureUrl: '',
  isActive: true,
  organisation: '',
  status: 1,
  dateCreated: '',
  dateModified: '',
  isDeleted: '',
  systemUserId: '',
  systemUserRole: '',
  passwordExpireDate: '',
  identificationImage: '',
  walletNumber: '',
}

const registrationSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('First name is required'),
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  lastname: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Last name is required'),
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
  changepassword: Yup.string()
    .required('Password confirmation is required')
    .when('password', {
      is: (val: string) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf([Yup.ref('password')], "Password and Confirm Password didn't match"),
    }),
  acceptTerms: Yup.bool().required('You must accept the terms and conditions'),
})

//form starts here
const AddUserForm: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [usersmodel, setUsersModel] = useState({})

  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues,
    validationSchema: registrationSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      setLoading(true)
      setTimeout(() => {
        agent.Users.create(values)
          .then((response) => {
            // setUsersModel(response)
            setLoading(false)
          })
          .catch(() => {
            setLoading(false)
            setSubmitting(false)
            setStatus('Registration process has broken')
          })
      }, 1000)
    },
  })
  if (loading) return <LoadingComponent content='Loading...' />
  return (
    <>
      <Form
        className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
        id='kt_login_signup_form'
        onSubmit={formik.handleSubmit}
      >
        {formik.status && (
          <div className='mb-lg-15 alert alert-danger'>
            <div className='alert-text font-weight-bold'>{formik.status}</div>
          </div>
        )}

        <Row className='mb-5'>
          <Form.Group as={Col} controlId='formGridEmail'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='text'
              placeholder='First name'
              autoComplete='off'
              {...formik.getFieldProps('firstName')}
              className={clsx(
                'form-control form-control-lg form-control-solid',
                {
                  'is-invalid': formik.touched.firstName && formik.errors.firstName,
                },
                {
                  'is-valid': formik.touched.firstName && !formik.errors.firstName,
                }
              )}
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.firstName}</span>
                </div>
              </div>
            )}
          </Form.Group>

              <Form.Group controlId='formBasicPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='Password' />
              </Form.Group>
            </div>
          </div>
        </div>
        {/* 
        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control type='email' placeholder='Enter email' />
          <Form.Text className='text-muted'>
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group> */}
      </Form>
    </>
  )
}

export { AddUserForm }

