import {Grid} from '@material-ui/core'
import {Alert} from '@mui/material'
import {Field, Form, Formik, FormikHelpers} from 'formik'
import {Modal} from 'react-bootstrap-v5'
import {Button} from 'semantic-ui-react'
import * as Yup from 'yup'
import {boolean} from 'yup/lib/locale'
import {KTSVG} from '../../../../_iris/helpers'
import {usePageData} from '../../../../_iris/layout/core'
import ErrorAlert from '../../common/ErrorAlert'
import IrisDatePicker from '../../layout/forms/IrisDatePicker'
import IrisSelectInput from '../../layout/forms/IrisSelectInput'
import IrisTextInput from '../../layout/forms/IrisTextInput'
import useStyles from '../../layout/formstyles/FormStyle'
import {IWalletModel} from '../Models/WalletInterfaces'

// interface Props {
//   userVal: IUserModel
// }

interface Props<Values> {
  onSubmit: (values: Values, formikHelpers: FormikHelpers<Values>) => void | Promise<any>
  isSubmitting: boolean
  wallet?: IWalletModel //change here by Mr Efe
  showForm?: boolean
  formTitle?: string
  showError?: boolean
  errorMessage?: string
  handleClick?: () => void
}

export default function AddWalletForm(props: Props<IWalletModel>) {
  const {
    entityValues,
    setEntityValues,
    selectUrlParam,
    setSelectUrlParam,
    formTitle,
    setFormTitle,
    walletNumber,
  } = usePageData()

  const initialFormValue: IWalletModel = {
    walletNumber: props.wallet ? props.wallet!.walletNumber : walletNumber,
    amount: props.wallet ? props.wallet!.amount : '',
    transactionType: props.wallet ? props.wallet!.transactionType : 0,
  }

  // console.log("\INTVALUE: ", initialFormValue);

  const validationSchema = Yup.object({
    walletNumber: Yup.string().required(),
    amount: Yup.string().required(),
    transactionType: Yup.string().required(),
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
                <h2>{'Update Wallet Balance'}</h2>
                <div
                  className='btn btn-sm btn-icon btn-active-color-primary'
                  data-bs-dismiss='modal'
                >
                  <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
                </div>
              </div>

              <div className='modal-body'>
                {props.showError && (
                  <ErrorAlert
                    type={'danger'}
                    message={props.errorMessage!.toString()}
                    heading={'Oh snap! You got an error!'}
                  />
                )}
                {props.showForm && (
                  <Grid container className={classes.root}>
                    <Grid item xs={12}>
                      <h4>
                        Update the following field with amount to credit or debit wallet holder
                      </h4>
                    </Grid>
                    <Grid item xs={8}>
                      <input type='hidden' name='walletNumber' value={walletNumber} />
                      <IrisTextInput
                        type='text'
                        name='amount'
                        placeholder='amount'
                        label='amount'
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <div className='col-11'>
                        <h4>Transaction Type</h4>
                        <Field as='select' name='transactionType' className='form-select'>
                          <option>Transaction Type</option>
                          <option value={'2'}>Credit</option>
                          <option value={'1'}>Debit</option>
                        </Field>
                      </div>
                    </Grid>
                  </Grid>
                )}
                {!props.showForm && (
                  <ErrorAlert
                    type={'success'}
                    message={'Wallet Transaction Completed Successfully!'}
                    heading={'Confirmation Message!'}
                  />
                )}
              </div>
              <div className='modal-body py-lg-10 px-lg-10'></div>

              <Modal.Footer>
                {props.showForm && (
                  <Button
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
