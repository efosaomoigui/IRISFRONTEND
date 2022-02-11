import { Form, Formik, FormikHelpers } from 'formik'
import { Modal } from 'react-bootstrap-v5'
import { Button } from 'semantic-ui-react'
import * as Yup from 'yup'
import { KTSVG } from '../../../../_iris/helpers'
import { IRoleModel } from '../../auth/models/AuthInterfaces'
import IrisSelectInput from '../../layout/forms/IrisSelectInput'
import IrisTextInput from '../../layout/forms/IrisTextInput'




// interface Props {
//   userVal: IUserModel
// }

interface Props<Values> {
  onSubmit: (values: Values, formikHelpers: FormikHelpers<Values>) => void | Promise<any>
  isSubmitting: boolean
}

const options = [
  { text: 'one', value: 'Bag' },
  { text: 'two', value: 'Serial' },
  { text: 'three', value: 'Turkey' },
  { text: 'four', value: 'Afganistan' },
]

export default function AddRoleForm(props: Props<IRoleModel>) {
  const initialFormValue: IRoleModel = {
    id: '',
    name: ''
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
                <h2>Add Permission</h2>
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
                  name='RoleId'
                  placeholder='RoleId'
                  label='RoleId'
                />
                {/* <IrisTextInput
                  type='text'
                  placeholder='FirstName'
                  name='firstName'
                  label='First Name'
                /> */}
                {/* <IrisTextInput
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
                /> */}

                {/* <IrisTextInput
                  type='number'
                  placeholder='Phone Number='
                  name='phonenumber'
                  label='Phone Number'
                /> */}

                {/* <IrisDatePicker
                  placeholderText='Date'
                  name='date'
                  showTimeSelect
                  timeCaption='time'
                  dateFormat='MMM d, yyyy h:mm: aa'
                /> */}

                {/* <IrisTextInput
                  type='password'
                  placeholder='Password'
                  name='password'
                  label='Password'
                /> */}

                <IrisSelectInput
                  options={options}
                  placeholder='Role name'
                  name='Role name'
                  label='Role name'
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
                <Button floated='right' positive type='button' content='Cancel'></Button>
              </Modal.Footer>
            </div>
          </div>
        </Form>
      </Formik>
    </>
  )
}
