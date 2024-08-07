import {Modal} from 'react-bootstrap-v5'
import {Button} from 'semantic-ui-react'
import {KTSVG} from '../../../../_iris/helpers'
import {Category, Gender, GenderType, IUserModel, UserType} from '../../auth/models/AuthInterfaces'
import {Formik, Form, FormikHelpers} from 'formik'
import * as Yup from 'yup'
import IrisTextInput from './IrisTextInput'
import IrisSelectInput from './IrisSelectInput' 


// interface Props {
//   userVal: IUserModel
// } 

interface Props<Values> {
  onSubmit: (values: Values, formikHelpers: FormikHelpers<Values>) => void | Promise<any>
  isSubmitting: boolean
}

const options = [
  {text: 'one', value: 'Bag'},
  {text: 'two', value: 'Serial'},
  {text: 'three', value: 'Turkey'},
  {text: 'four', value: 'Afganistan'},
]

export default function GenericForm(props: Props<IUserModel>) {
  const initialFormValue: IUserModel = {
    userId: '2',
    username: 'hh',
    firstName: 'hgg',
    lastName: 'jj',
    email: 'kkk@h.com',
    phoneNumber: '55657757',
    gender: Gender.Male,
    userType: Category.Corporate,  
  }

  const validationSchema = Yup.object({ 
    userName: Yup.string().required(),
    firstName: Yup.string().required(),
    password: Yup.string().required(),
    lastName: Yup.string().required(),
    email: Yup.string().required(),
    phoneNumber: Yup.string().required(), 
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
                  type='number'
                  placeholder='Phone Number='
                  name='phonenumber'
                  label='Phone Number'
                />

                {/* <IrisDatePicker
                  placeholderText='Date'
                  name='date'
                  showTimeSelect
                  timeCaption='time'
                  dateFormat='MMM d, yyyy h:mm: aa'
                /> */}

                <IrisTextInput
                  type='password'
                  placeholder='Password'
                  name='password'
                  label='Password'
                />

                {/* <IrisSelectInput
                  options={options}
                  placeholder='category'
                  name='category'
                  label='Category'
                /> */}

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
