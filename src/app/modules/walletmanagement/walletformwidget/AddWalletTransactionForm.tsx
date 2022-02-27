import { Form, Formik, FormikHelpers } from 'formik'
import { Modal } from 'react-bootstrap-v5'
import { Button } from 'semantic-ui-react'
import * as Yup from 'yup'
import { KTSVG } from '../../../../_iris/helpers'
import IrisDatePicker from '../../layout/forms/IrisDatePicker'
import IrisSelectInput from '../../layout/forms/IrisSelectInput'
import IrisTextInput from '../../layout/forms/IrisTextInput'
import { IWalletModel, IWalletTransactionModel } from '../Models/WalletInterfaces'




// interface Props {
//   userVal: IUserModel
// }

interface Props<Values> {
  onSubmit: (values: Values, formikHelpers: FormikHelpers<Values>) => void | Promise<any>
  isSubmitting: boolean
  wallettransaction?: IWalletTransactionModel  //change here by Mr Efe
}

const options = [
  { text: 'true', value: 'true' },
  { text: 'false', value: 'false' }
]

export default function AddWalletForm(props: Props<IWalletTransactionModel>) {
  const initialFormValue: IWalletTransactionModel = {
    WalletTransactionId: props.wallettransaction ? props.wallettransaction!.WalletTransactionId : '',
    Amount: props.wallettransaction ? props.wallettransaction!.Amount : '',
    TransactionType: props.wallettransaction ? props.wallettransaction!.TransactionType : '',
    Description: props.wallettransaction ? props.wallettransaction!.Description : '',
    WalletNumber: props.wallettransaction ? props.wallettransaction!.WalletNumber : '',
    DateCreated: props.wallettransaction ? props.wallettransaction!.DateCreated : '',
  }

  const validationSchema = Yup.object({
    WalletTransactionId: Yup.string().required(),
    Amount: Yup.string().required(),
    TransactionType: Yup.string().required(),
    Description: Yup.string().required(),
    WalletNumber: Yup.string().required(),
    DateCreated: Yup.string().required()
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
                  name='WalletTransactionId'
                  placeholder='WalletTransaction Id'
                  label='WalletTransaction Id'
                />
                <IrisTextInput
                  type='text'
                  placeholder='Amount'
                  name='Amount'
                  label='Amount'
                />
                {/* <IrisSelectInput
                  options={options}
                  placeholder=''
                  name='isActive'
                  label='Active'
                /> */}
                <IrisTextInput
                  type='text'
                  placeholder='Transaction Type'
                  name='TransactionType'
                  label='Transaction Type'
                />
                <IrisTextInput
                  type='text'
                  placeholder='Description'
                  name='Description'
                  label='Description'
                />

                <IrisTextInput
                  type='text'
                  placeholder='WalletNumber'
                  name='WalletNumber'
                  label='WalletNumber'
                />

                <IrisDatePicker
                  placeholderText='Date'
                  name='DateCreated'
                  showTimeSelect
                  timeCaption='DateCreated'
                  dateFormat='MMM d, yyyy h:mm: aa'
                />

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
                <Button floated='right' positive type='button' data-bs-dismiss="modal" content='Cancel'></Button>
              </Modal.Footer>
            </div>
          </div>
        </Form>
      </Formik>
    </>
  )
}
