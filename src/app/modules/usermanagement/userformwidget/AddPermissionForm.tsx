import { Form, Formik, FormikHelpers } from 'formik'
import { Modal } from 'react-bootstrap-v5'
import { Button } from 'semantic-ui-react'
import * as Yup from 'yup'
import { KTSVG } from '../../../../_iris/helpers'
import { IPermissionModel } from '../../auth/models/AuthInterfaces'
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

export default function AddPermissionForm(props: Props<IPermissionModel>) {
  const initialFormValue: IPermissionModel = {
  id: '',
  roleId: '',
  PermissionId: '',
  PermissionType: '',
  Permission: ''
  }

  const validationSchema = Yup.object({
    roleId: Yup.string().required(),
    PermissionId: Yup.string().required(),
    PermissionType: Yup.string().required(),
    Permission: Yup.string().required(),
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
                <IrisTextInput
                  type='text'
                  placeholder='PermissionId'
                  name='PermissionId'
                  label='PermissionId'
                />
                <IrisTextInput
                  type='text'
                  placeholder='PermissionType'
                  name='PermissionType'
                  label='PermissionType'
                />
                <IrisTextInput
                  type='text'
                  placeholder='Permission'
                  name='Permission'
                  label='Permission'
                />

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

                {/* <IrisSelectInput
                  options={options}
                  placeholder='RoleId'
                  name='RoleId'
                  label='RoleId'
                /> */}

                {/* <IrisSelectInput
                  options={options}
                  placeholder='Claim Type'
                  name='Claim Type'
                  label='Claim Type'
                /> */}

                {/* <IrisSelectInput
                  options={options}
                  placeholder='Claim Value'
                  name='Claim Value'
                  label='Claim Value'
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
                <Button floated='right' positive type='button' data-bs-dismiss="modal" content='Cancel'></Button>
              </Modal.Footer>
            </div>
          </div>
        </Form>
      </Formik>
    </>
  )
}
