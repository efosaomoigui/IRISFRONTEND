import { Form, Formik, FormikHelpers } from 'formik'
import { Modal } from 'react-bootstrap-v5'
import { Button } from 'semantic-ui-react'
import * as Yup from 'yup'
import { KTSVG } from '../../../../_iris/helpers'
import IrisSelectInput from '../../layout/forms/IrisSelectInput'
import IrisTextInput from '../../layout/forms/IrisTextInput'
import { IWalletTransactionModel } from '../Models/WalletInterfaces'




// interface Props {
//   userVal: IUserModel
// }

interface Props<Values> {
  onSubmit: (values: Values, formikHelpers: FormikHelpers<Values>) => void | Promise<any>
  isSubmitting: boolean
}

const options = [
  { text: 'true', value: true },
  { text: 'false', value: false }
]

export default function AddWalletTransactionForm(props: Props<IWalletTransactionModel>) {
  const initialFormValue: IWalletTransactionModel = {
    walletNumberId: '',
    number: '',
    isActive: true,
    userId: ''
  }

  const validationSchema = Yup.object({
    walletNumberId: Yup.string().required(),
    number: Yup.string().required(),
    userId: Yup.string().required(),
    isActive: Yup.string().required()
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
                <h2>Add Wallet Transaction</h2>
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
                  name='walletNumberId'
                  placeholder='Wallet Number Id'
                  label='Wallet Number Id'
                />
                <IrisTextInput
                  type='text'
                  placeholder='Number'
                  name='number'
                  label='number'
                />
                <IrisSelectInput
                  options={options}
                  placeholder='true'
                  name='isActive'
                  label='Active'
                />
                <IrisTextInput
                  type='text'
                  placeholder='User Id'
                  name='userId'
                  label='User Id'
                />
                {/* <IrisTextInput
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
                />

                <IrisSelectInput
                  options={options}
                  placeholder='Active'
                  name='isActive'
                  label='Active'
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
