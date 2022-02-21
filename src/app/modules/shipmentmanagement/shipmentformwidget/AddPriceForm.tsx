import {Modal} from 'react-bootstrap-v5'
import {Button} from 'semantic-ui-react'
import {KTSVG} from '../../../../_iris/helpers'
import {Formik, Form, FormikHelpers} from 'formik'
import * as Yup from 'yup'
import IrisTextInput from '../../layout/forms/IrisTextInput'
import IrisSelectInput from '../../layout/forms/IrisSelectInput'
import {IPriceModel} from '../ShipmentModels/ShipmentInterfaces'

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

export default function AddPriceForm(props: Props<IPriceModel>) {
  const initialFormValue: IPriceModel = {
    id: '',
    Category: '',
    RouteId: '',
    Route: '',
    UnitWeight: 3,
    PricePErUnit: ''
  }

  const validationSchema = Yup.object({
    id: Yup.string().required(),
    Category: Yup.string().required(),
    RouteId: Yup.string().required(),
    Route: Yup.string().required(),
    UnitWeight: Yup.number().required(),
    PricePErUnit: Yup.string().required(),
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
                <h2>Create Price</h2>
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
                  name='id'
                  placeholder='Id'
                  label='Id'
                />
                {/* <IrisTextInput
                  type='text'
                  placeholder='Category'
                  name='Category'
                  // label='Category'
                /> */}
                <IrisTextInput
                  type='number'
                  placeholder='RouteId'
                  name='RouteId'
                  label='RouteId'
                />
                <IrisTextInput type='text' placeholder='Route' name='Route' label='Route' />

                <IrisTextInput
                  type='number'
                  placeholder='UnitWeight'
                  name='UnitWeight'
                  label='UnitWeight'
                />

                <IrisTextInput
                  type='number'
                  placeholder='PricePErUnit'
                  name='PricePErUnit'
                  label='PricePErUnit'
                />

                {/* <IrisDatePicker
                  placeholderText='Date'
                  name='date'
                  showTimeSelect
                  timeCaption='time'
                  dateFormat='MMM d, yyyy h:mm: aa'
                /> */}

                <IrisSelectInput
                  options={options}
                  placeholder='category'
                  name='category'
                  label='Category'
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