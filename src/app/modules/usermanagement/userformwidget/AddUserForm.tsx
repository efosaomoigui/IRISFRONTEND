import {useFormik} from 'formik'
import React, {useState} from 'react'
import {Form, Row, Col, Button} from 'react-bootstrap-v5'
import {useDispatch} from 'react-redux'
import agent from '../../../../setup/axios/AxiosAgent'
import {IUserModel} from '../../auth/models/AuthInterfaces'
import * as Yup from 'yup';
import clsx from 'clsx'

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
  isActive: '',
  organisation: '',
  status: '',
  dateCreated: '',
  dateModified: '',
  isDeleted: '',
  systemUserId: '',
  systemUserRole: '',
  passwordExpireDate: '',
  identificationImage: '',
  walletNumber: '',
}

// const registrationSchema = Yup.object().shape({
//   firstname: Yup.string()
//     .min(3, 'Minimum 3 symbols')
//     .max(50, 'Maximum 50 symbols')
//     .required('First name is required'),
//   email: Yup.string()
//     .email('Wrong email format')
//     .min(3, 'Minimum 3 symbols')
//     .max(50, 'Maximum 50 symbols')
//     .required('Email is required'),
//   lastname: Yup.string()
//     .min(3, 'Minimum 3 symbols')
//     .max(50, 'Maximum 50 symbols')
//     .required('Last name is required'),
//   password: Yup.string()
//     .min(3, 'Minimum 3 symbols')
//     .max(50, 'Maximum 50 symbols')
//     .required('Password is required'),
//   changepassword: Yup.string()
//     .required('Password confirmation is required')
//     .when('password', {
//       is: (val: string) => (val && val.length > 0 ? true : false),
//       then: Yup.string().oneOf([Yup.ref('password')], "Password and Confirm Password didn't match"),
//     }),
//   acceptTerms: Yup.bool().required('You must accept the terms and conditions'),
// })

//form starts here
const AddUserForm: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [usersmodel, setUsersModel] = useState({})

  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues,
    validationSchema: registrationSchema,
    onSubmit: (values, {setStatus, setSubmitting}) => {
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

          <Form.Group
            as={Col}
            controlId='formGridPassword'
            type='password'
            placeholder='First name'
            autoComplete='off'
            {...formik.getFieldProps('firstName')}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              {
                'is-invalid': formik.touched.password && formik.errors.password,
              },
              {
                'is-valid': formik.touched.password && !formik.errors.pa,
              }
            )}
          >
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' placeholder='Password' />
            {formik.touched.firstName && formik.errors.firstName && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.firstName}</span>
                </div>
              </div>
            )}
          </Form.Group>
        </Row>
        <Row className='mb-5'>
          <Form.Group controlId='formGridAddress1'>
            <Form.Label>Address</Form.Label>
            <Form.Control placeholder='1234 Main St' />
          </Form.Group>
        </Row>
        <Row className='mb-5'>
          <Form.Group controlId='formGridAddress2'>
            <Form.Label>Phone No.</Form.Label>
            <Form.Control placeholder='Enter Phone Number' />
          </Form.Group>
        </Row>

//         <Row className='mb-5'>
//           <Form.Group as={Col} controlId='formGridState'>
//             <Form.Label>City</Form.Label>
//             <Form.Control as='select'>
//               <option>Choose...</option>
//               <option>...</option>
//             </Form.Control>
//           </Form.Group>

//           <Form.Group as={Col} controlId='formGridState'>
//             <Form.Label>State</Form.Label>
//             <Form.Control as='select'>
//               <option>Choose...</option>
//               <option>...</option>
//             </Form.Control>
//           </Form.Group>

//           <Form.Group as={Col} controlId='formGridZip'>
//             <Form.Label>Zip</Form.Label>
//             <Form.Control />
//           </Form.Group>
//         </Row>
//         <Row className='mb-5'>
//           <Form.Group id='formGridCheckbox'>
//             <Form.Check type='checkbox' label='Check me out' />
//           </Form.Group>
//         </Row>

//         <Button variant='primary' type='submit'>
//           Submit
//         </Button>
//       </Form>
//     </>
//   )
// }

// export {AddUserForm}

