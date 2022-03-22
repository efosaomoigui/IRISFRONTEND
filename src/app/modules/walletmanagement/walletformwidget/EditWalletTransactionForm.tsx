import { Grid } from '@material-ui/core'
import { Alert } from '@mui/material'
import { Form, Formik, FormikHelpers } from 'formik'
import { Modal } from 'react-bootstrap-v5'
import { Button } from 'semantic-ui-react'
import * as Yup from 'yup'
import { KTSVG } from '../../../../_iris/helpers'
import { usePageData } from '../../../../_iris/layout/core'
import ErrorAlert from '../../common/ErrorAlert'
import IrisDatePicker from '../../layout/forms/IrisDatePicker'
import IrisSelectInput from '../../layout/forms/IrisSelectInput'
import IrisTextInput from '../../layout/forms/IrisTextInput'
import useStyles from '../../layout/formstyles/FormStyle'
import { IWalletModel, IWalletTransactionModel } from '../Models/WalletInterfaces'




// interface Props {
//   userVal: IUserModel
// }

interface Props<Values> {
  onSubmit: (values: Values, formikHelpers: FormikHelpers<Values>) => void | Promise<any>
  isSubmitting: boolean
  wallettransaction?: IWalletTransactionModel  //change here by Mr Efe
  showForm?: boolean
  formTitle?: string
  showError?: boolean
  errorMessage?: string
  handleClick?: () => void
}

const options = [
  { text: 'true', value: 'true' },
  { text: 'false', value: 'false' }
]

export default function EditWalletTransactionForm(props: Props<IWalletTransactionModel>) {
  const {entityValues, setEntityValues, selectUrlParam, setSelectUrlParam, formTitle, setFormTitle} = usePageData()

  const initialFormValue: IWalletTransactionModel = {
    id: props.wallettransaction ? props.wallettransaction!.id : '',
    amount: props.wallettransaction ? props.wallettransaction!.amount : '',
    transactionType: props.wallettransaction ? props.wallettransaction!.transactionType : 2,
    description: props.wallettransaction ? props.wallettransaction!.description : '',
    userId: props.wallettransaction ? props.wallettransaction!.userId : '',
  }

  const validationSchema = Yup.object({
    amount: Yup.string().required(),
    transactionType: Yup.number().required(),
    description: Yup.string().required(),
    userId: Yup.string().required()
  })

  const classes = useStyles()

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
                <h2>{"Edit Wallet Transaction"} </h2>
                <div
                  className='btn btn-sm btn-icon btn-active-color-primary'
                  data-bs-dismiss='modal'
                >
                  <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
                </div>
              </div>
              <div className='modal-body' >
                {props.showError && <ErrorAlert type={'danger'} message={props.errorMessage!.toString()} heading={'Oh snap! You got an error!'} />}
                {props.showForm && (
                  <Grid container className={classes.root}>
                    <Grid item xs={6}>
                      <IrisTextInput
                        type='text'
                        placeholder='User Id'
                        name='userId'
                        label='userId'
                      />
                      <IrisTextInput
                        type='text'
                        placeholder='Amount'
                        name='amount'
                        label='Amount'
                      />
                      <IrisTextInput
                        type='number'
                        placeholder='Transaction Type'
                        name='transactionType'
                        label='Transaction Type'
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <IrisTextInput
                        type='text'
                        placeholder='Description'
                        name='description'
                        label='Description'
                      />
                    </Grid>
                  </Grid>
                )}
                {!props.showForm && <ErrorAlert type={'success'} message={'Wallet Transaction Created Successfully!'} heading={'Confirmation Message!'} />}
              </div>
              <div className='modal-body py-lg-10 px-lg-10'>

              </div>

              <Modal.Footer>
                {props.showForm &&
                  (<Button
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
      </Formik>
    </>
  )
}
