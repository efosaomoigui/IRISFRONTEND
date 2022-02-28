import {Modal} from 'react-bootstrap-v5'
import {Button} from 'semantic-ui-react'
import {KTSVG} from '../../../../_iris/helpers'
import {Formik, Form, FormikHelpers} from 'formik'
import * as Yup from 'yup'
import IrisTextInput from '../../layout/forms/IrisTextInput'
import IrisSelectInput from '../../layout/forms/IrisSelectInput'
import {IPriceModel} from '../ShipmentModels/ShipmentInterfaces'
import { usePageData } from '../../../../_iris/layout/core'

// interface Props {
//   userVal: IUserModel
// }

interface Props<Values> {
  onSubmit: (values: Values, formikHelpers: FormikHelpers<Values>) => void | Promise<any>
  isSubmitting: boolean
  price?: IPriceModel
}

const options = [
  {text: 'one', value: 'Bag'},
  {text: 'two', value: 'Serial'},
  {text: 'three', value: 'Turkey'},
  {text: 'four', value: 'Afganistan'},
]

export default function AddPriceForm(props: Props<IPriceModel>) {
  const {entityDetailValues, setEntityDetailValues, selectUrlParam, setSelectUrlParam, formTitle, setFormTitle} = usePageData()

  const initialFormValue: IPriceModel = {
    id: props.price ? props.price!.id : '',
    Category: props.price ? props.price!.Category : '',
    RouteId: props.price ? props.price!.RouteId : '',
    Route: props.price ? props.price!.Route : '',
    UnitWeight: props.price ? props.price!.UnitWeight : 3,
    PricePErUnit: props.price ? props.price!.PricePErUnit : '',
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
                <h2>{formTitle+" Price Item"}</h2>
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

            

                <IrisSelectInput
                  options={options}
                  placeholder='category'
                  name='Category'
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
                <Button floated='right' positive type='button' data-bs-dismiss="modal" content='Cancel'></Button>
              </Modal.Footer>
            </div>
          </div>
        </Form>
      </Formik>
    </>
  )
}
