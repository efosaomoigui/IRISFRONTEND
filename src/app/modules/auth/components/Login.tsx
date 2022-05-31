/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {useFormik} from 'formik'
import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import * as Yup from 'yup'
import {login} from '../redux/AuthCRUD'
import * as auth from '../redux/AuthRedux'

const loginSchema = Yup.object().shape({
  userName: Yup.string()
    // .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('UserName is required'),
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
})

const initialValues = {
  userName: '',
  password: '',
}

/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/

export function Login() {
  const [loading, setLoading] = useState(false)
  const [successStatus, setSetSuccessStatus] = useState(true)
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      setTimeout(() => {
        login(values.userName, values.password)
          .then(({data: {accessToken}}) => {
            setLoading(false)
            if (accessToken == null) {
              setSetSuccessStatus(false)
            } else {
              setSetSuccessStatus(true)
              dispatch(auth.actions.login(accessToken))
            }
          })
          .catch(() => {
            setLoading(false)
            setSubmitting(false)
            setSetSuccessStatus(false)
            setStatus('The login detail is incorrect')
          })
      }, 1000)
    },
  })

  return (
    <>
      <form
        className='form w-100'
        onSubmit={formik.handleSubmit}
        noValidate
        id='kt_login_signin_form'
      >
        {/* begin::Heading */}
        <div className='text-center mb-10'>
          <h1 className='text-dark mb-3'>Sign In</h1>
          {/* <div className='text-gray-400 fw-bold fs-4'>
          New Here?{' '}
          <Link to='/auth/registration' className='link-primary fw-bolder'>
            Create an Account
          </Link>
        </div> */}
        </div>
        {/* begin::Heading */}
        {/* 
      {formik.status ? (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{formik.status}</div>
        </div>
      ) : (
        <div className='mb-10 bg-light-info p-8 rounded'>
          <div className='text-info'>
            Use account <strong>admin@demo.com</strong> and password <strong>demo</strong> to
            continue.
          </div>
        </div>
      )} */}

        {!successStatus && (
          <div className='mb-10 bg-light-info p-8 rounded'>
            <div className='text-danger'>
              <strong>Username</strong> or <strong>Password</strong> Is Incorrect, Please Try Again
            </div>
          </div>
        )}

        {/* begin::Form group */}
        <div className='fv-row mb-10'>
          <label className='form-label fs-6 fw-bolder text-dark'>Email</label>
          <input
            placeholder='User Name'
            {...formik.getFieldProps('userName')}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              {'is-invalid': formik.touched.userName && formik.errors.userName},
              {
                'is-valid': formik.touched.userName && !formik.errors.userName,
              }
            )}
            type='text'
            name='userName'
            autoComplete='off'
          />
          {formik.touched.userName && formik.errors.userName && (
            <div className='fv-plugins-message-container'>
              <span role='alert'>{formik.errors.userName}</span>
            </div>
          )}
        </div>
        {/* end::Form group */}

        {/* begin::Form group */}
        <div className='fv-row mb-10'>
          <div className='d-flex justify-content-between mt-n5'>
            <div className='d-flex flex-stack mb-2'>
              {/* begin::Label */}
              <label className='form-label fw-bolder text-dark fs-6 mb-0'>Password</label>
              {/* end::Label */}
              {/* begin::Link */}
              <Link
                to='/forgot-password'
                className='link-primary fs-6 fw-bolder'
                style={{marginLeft: '5px'}}
              >
                Forgot Password ?
              </Link>
              {/* end::Link */}
            </div>
          </div>
          <input
            type='password'
            autoComplete='off'
            {...formik.getFieldProps('password')}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              {
                'is-invalid': formik.touched.password && formik.errors.password,
              },
              {
                'is-valid': formik.touched.password && !formik.errors.password,
              }
            )}
          />
          {formik.touched.password && formik.errors.password && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.password}</span>
              </div>
            </div>
          )}
        </div>
        {/* end::Form group */}

        {/* begin::Action */}
        <div className='text-center'>
          <button
            type='submit'
            id='kt_sign_in_submit'
            className='btn btn-lg btn-primary w-100 mb-5'
            disabled={formik.isSubmitting || !formik.isValid}
          >
            {!loading && <span className='indicator-label'>Continue</span>}
            {loading && (
              <span className='indicator-progress' style={{display: 'block'}}>
                Please wait...
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>

          {/* begin::Separator */}
          {/* <div className='text-center text-muted text-uppercase fw-bolder mb-5'>or</div> */}
          {/* end::Separator */}

          {/* begin::Google link */}
          {/* <a href='#' className='btn btn-flex flex-center btn-light btn-lg w-100 mb-5'>
          <img
            alt='Logo'
            src={toAbsoluteUrl('/media/svg/brand-logos/google-icon.svg')}
            className='h-20px me-3'
          />
          Continue with Google
        </a> */}
          {/* end::Google link */}

          {/* begin::Google link */}
          {/* <a href='#' className='btn btn-flex flex-center btn-light btn-lg w-100 mb-5'>
          <img
            alt='Logo'
            src={toAbsoluteUrl('/media/svg/brand-logos/facebook-4.svg')}
            className='h-20px me-3'
          />
          Continue with Facebook
        </a> */}
          {/* end::Google link */}

          {/* begin::Google link */}
          {/* <a href='#' className='btn btn-flex flex-center btn-light btn-lg w-100'>
          <img
            alt='Logo'
            src={toAbsoluteUrl('/media/svg/brand-logos/apple-black.svg')}
            className='h-20px me-3'
          />
          Continue with Apple
        </a> */}
          {/* end::Google link */}
        </div>
        {/* end::Action */}
      </form>
    </>
  )
}
