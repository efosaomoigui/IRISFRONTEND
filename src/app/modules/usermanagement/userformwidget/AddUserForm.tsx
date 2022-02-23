import { Modal } from 'react-bootstrap-v5'
import { Button } from 'semantic-ui-react'
import { Formik, Form, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { IUserModel } from '../../auth/models/AuthInterfaces'
import { KTSVG } from '../../../../_iris/helpers'
import IrisTextInput from '../../layout/forms/IrisTextInput'
import IrisSelectInput from '../../layout/forms/IrisSelectInput'


// interface Props {
//   userVal: IUserModel
// }

interface Props<Values> {
  onSubmit: (values: Values, formikHelpers: FormikHelpers<Values>) => void | Promise<any>
  isSubmitting: boolean
  user?:IUserModel  //change here by Mr Efe
}

const options = [
  { text: 'one', value: 'Bag' },
  { text: 'two', value: 'Serial' },
  { text: 'three', value: 'Turkey' },
  { text: 'four', value: 'Afganistan' },
]

export default function AddUserForm(props: Props<IUserModel>) {

  const initialFormValue: IUserModel = {
    userId: props.user? props.user!.userId : '',
    userName: props.user? props.user!.userName : '',
    password: props.user? props.user!.password : '',
    firstName: props.user? props.user!.firstName : '',
    lastName: props.user? props.user!.lastName : '',
    email: props.user? props.user!.email : '',
    phonenumber: props.user? props.user!.phonenumber : '',
  }

  const validationSchema = Yup.object({
    userName: Yup.string().required(),
    firstName: Yup.string().required(),
    password: Yup.string().required(),
    lastName: Yup.string().required(),
    email: Yup.string().required(),
    phonenumber: Yup.string().required(),
  })

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
                <h2>Create User</h2>
                <div
                  className='btn btn-sm btn-icon btn-active-color-primary'
                  data-bs-dismiss='modal'
                >
                  <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
                </div>
              </div>

              <div className='modal-body py-lg-10 px-lg-10'>
                <IrisTextInput
                  type='text'
                  name='userName'
                  placeholder='User Name'
                  label='User name'
                />
                <IrisTextInput
                  type='text'
                  placeholder='FirstName'
                  name='firstName'
                  label='First Name'
                />
                <IrisTextInput
                  type='text'
                  placeholder='Last Name'
                  name='lastName'
                  label='Last Name'
                />
                <IrisTextInput
                  type='email'
                  placeholder='Email'
                  name='email'
                  label='Email'
                />

                <IrisTextInput
                  type='text'
                  placeholder='Phone Number='
                  name='phonenumber'
                  label='Phone Number'
                />

                <IrisTextInput
                  type='password'
                  placeholder='Password'
                  name='password'
                  label='Password'
                />

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
                <Button floated='right' positive type='reset' data-bs-dismiss="modal" content='Cancel'></Button>
              </Modal.Footer>
            </div>
          </div>
        </Form>
      </Formik>
    </>
  )
}
