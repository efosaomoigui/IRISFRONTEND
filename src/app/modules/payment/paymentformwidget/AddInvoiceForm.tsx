import {Modal} from 'react-bootstrap-v5'
import {Button} from 'semantic-ui-react'
import {Formik, Form, FormikHelpers} from 'formik'
import * as Yup from 'yup'
import {KTSVG} from '../../../../_iris/helpers'
import IrisTextInput from '../../layout/forms/IrisTextInput'
import {IInvoiceModel} from '../PaymentModels/PaymentmentInterfaces'
import IrisSelectInput from '../../layout/forms/IrisSelectInput'
import {usePageData} from '../../../../_iris/layout/core'

// interface Props {
//   userVal: IUserModel
// }

interface Props<Values> {
  onSubmit: (values: Values, formikHelpers: FormikHelpers<Values>) => void | Promise<any>
  isSubmitting: boolean
  invoice?: IInvoiceModel
}

const options = [
  {text: 'delivered', value: 'Bag'},
  {text: 'enroute', value: 'Serial'},
  {text: 'stop-over', value: 'Turkey'},
  {text: 'clearing', value: 'Afganistan'},
]

export default function AddInvoiceForm(props: Props<IInvoiceModel>) {
  const {
    entityDetailValues,
    setEntityDetailValues,
    selectUrlParam,
    setSelectUrlParam,
    formTitle,
    setFormTitle,
  } = usePageData()

  const initialFormValue: IInvoiceModel = {
    Id: props.invoice ? props.invoice!.Id : '',
    InvoiceCode: props.invoice ? props.invoice!.InvoiceCode : '',
    ShipmentId: props.invoice ? props.invoice!.ShipmentId : '',
    Shipment: props.invoice ? props.invoice!.Shipment : '',
    PaymentMethod: props.invoice ? props.invoice!.PaymentMethod : '',
    ShipStatus: props.invoice ? props.invoice!.ShipStatus : '',
  }

  const validationSchema = Yup.object({
    Id: Yup.string().required(),
    InvoiceCode: Yup.string().required(),
    ShipmentId: Yup.string().required(),
    Shipment: Yup.string().required(),
    PaymentMethod: Yup.string().required(),
    ShipStatus: Yup.string().required(),
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
                <h2>{formTitle + ' Invoice Item'}</h2>
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
                  name='InvoiceCode'
                  placeholder='Invoice Code'
                  label='Invoice Code'
                />
                <IrisTextInput
                  type='text'
                  placeholder='ShipmentId'
                  name='ShipmentId'
                  label='ShipmentId'
                />
                <IrisTextInput
                  type='text'
                  placeholder='Shipment'
                  name='Shipment'
                  label='Shipment'
                />
                <IrisTextInput
                  type='text'
                  placeholder='Payment Method'
                  name='PaymentMethod'
                  label='Payment Method'
                />

                {/* <IrisTextInput
                                    type='text'
                                    placeholder='Dispatcher'
                                    name='Dispatcher'
                                    label='Dispatcher'
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
                  placeholder='ShipStatus'
                  name='ShipStatus'
                  label='ShipStatus'
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
                <Button
                  floated='right'
                  positive
                  type='button'
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
