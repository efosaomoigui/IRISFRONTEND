import {Modal} from 'react-bootstrap-v5'
import {Button} from 'semantic-ui-react'
import {Formik, Form, FormikHelpers} from 'formik'
import * as Yup from 'yup'
import {KTSVG} from '../../../../_iris/helpers'
import IrisTextInput from '../../layout/forms/IrisTextInput'
import {IInvoiceModel, IPaymentLogModel} from '../PaymentModels/PaymentmentInterfaces'
import IrisSelectInput from '../../layout/forms/IrisSelectInput'
import {usePageData} from '../../../../_iris/layout/core'
import { Grid } from '@material-ui/core'
import { Alert } from '@mui/material'
import useStyles from '../../layout/formstyles/FormStyle'

// interface Props {
//   userVal: IUserModel
// }

interface Props<Values> {
  onSubmit: (values: Values, formikHelpers: FormikHelpers<Values>) => void | Promise<any>
  isSubmitting: boolean
  showForm?: boolean
  paymentlog?: IPaymentLogModel
  formTitle?: string
  showError?: boolean
  errorMessage?: string
  handleClick?: () => void
}

const options = [
  {text: 'delivered', value: 'Bag'},
  {text: 'enroute', value: 'Serial'},
  {text: 'stop-over', value: 'Turkey'},
  {text: 'clearing', value: 'Afganistan'},
]

export default function EditPaymentlLogForm(props: Props<IPaymentLogModel>) {
  const {
    entityValues,
    setEntityValues,
    selectUrlParam,
    setSelectUrlParam,
    formTitle,
    setFormTitle,
  } = usePageData()

  const initialFormValue: IPaymentLogModel = {
    PaymentId: props.paymentlog ? props.paymentlog!.PaymentId : '',
    Amount: props.paymentlog ? props.paymentlog!.Amount : '',
    PaymentMethod: props.paymentlog ? props.paymentlog!.PaymentMethod : '',
    User: props.paymentlog ? props.paymentlog!.User : '',
    TransactionId: props.paymentlog ? props.paymentlog!.TransactionId : '',
  }

  const validationSchema = Yup.object({
    PaymentId: Yup.string().required(),
    Amount: Yup.string().required(),
    PaymentMethod: Yup.string().required(),
    User: Yup.string().required(),
    TransactionId: Yup.string().required(),
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
                <h2>{formTitle + ' Payment Log'}</h2>
                <div
                  className='btn btn-sm btn-icon btn-active-color-primary'
                  data-bs-dismiss='modal'
                >
                  <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
                </div>
              </div>

              <div className='modal-body' >
                {props.showForm &&
                  <Grid container className={classes.root}>
                    <Grid item xs={6}>
                      {/* <IrisTextInput type='text' name='id' label='Role Id' /> */}
                      <IrisTextInput
                        type='text'
                        name='PaymentId'
                        placeholder='PaymentId'
                        label='PaymentId'
                      />
                      <IrisTextInput type='text' placeholder='Amount' name='Amount' label='Amount' />
                      <IrisTextInput
                        type='text'
                        placeholder='PaymentMethod'
                        name='PaymentMethod'
                        label='PaymentMethod'
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <IrisTextInput type='text' placeholder='User' name='User' label='User' />

                      <IrisTextInput
                        type='text'
                        placeholder='TransactionId'
                        name='TransactionId'
                        label='TransactionId'
                      />
                    </Grid>
                    </Grid>
                }
                {!props.showForm && <Alert severity="info">Payment Log Created Successfully!</Alert>}
              </div>
              <div className='modal-body py-lg-10 px-lg-10'>
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
                <Button
                  floated='right'
                  positive
                  type='reset'
                  variant='primary'
                  onClick={props.handleClick}
                  data-bs-dismiss='modal'
                  content='Cancel'
                ></Button>
              </Modal.Footer>
            </div>
          </div>
        </Form>
      </Formik>
    </>
  )
}
