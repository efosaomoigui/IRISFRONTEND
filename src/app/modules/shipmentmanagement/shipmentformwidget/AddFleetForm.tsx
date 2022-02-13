import {Modal} from 'react-bootstrap-v5'
import {Button} from 'semantic-ui-react'
import {KTSVG} from '../../../../_iris/helpers'
import {Formik, Form, FormikHelpers} from 'formik'
import * as Yup from 'yup'
import IrisTextInput from '../../layout/forms/IrisTextInput'
import IrisSelectInput from '../../layout/forms/IrisSelectInput'
import { IFleetModel } from '../ShipmentModels/ShipmentInterfaces'



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

export default function AddFleetForm(props: Props<IFleetModel>) {
  const initialFormValue: IFleetModel = {
    FleetId: '',
    FleetName: '',
    FleetModel: '',
    FleetMake: '',
    FleetType: '',
  }

  const validationSchema = Yup.object({
    id: Yup.string().required(),
    registrationNumber: Yup.string().required(),
    chasisNumber: Yup.string().required(),
    engineNumber: Yup.string().required(),
    fleetType: Yup.string().required(),
    capacity: Yup.string().required(),
    description: Yup.string().required(),
    fleetModel: Yup.string().required(),
    fleetMake: Yup.string().required(),
    ownerId: Yup.string().required(),
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
                <h2>Create Fleet</h2>
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
                <IrisTextInput
                  type='number'
                  placeholder='Registration Number'
                  name='registrationNumber'
                  label='Registration Number'
                />
                <IrisTextInput
                  type='number'
                  placeholder='Chasis Number'
                  name='chasisNumber'
                  label='Chasis Number'
                />
                <IrisTextInput
                  type='number'
                  placeholder='Engine Number'
                  name='engineNumber'
                  label='Email'
                />
                
                <IrisTextInput
                  type='text'
                  placeholder='Fleet Type'
                  name='fleetType'
                  label='Fleet Type'
                />
                 <IrisTextInput
                  type='text'
                  placeholder='Capacity'
                  name='capacity'
                  label='Capacity'
                />

                {/* <IrisDatePicker
                  placeholderText='Date'
                  name='date'
                  showTimeSelect
                  timeCaption='time'
                  dateFormat='MMM d, yyyy h:mm: aa'
                /> */}

                <IrisTextInput
                  type='text'
                  placeholder='Description'
                  name='description'
                  label='Description'
                />

                <IrisTextInput
                  type='text'
                  placeholder='Fleet Model'
                  name='fleetModel'
                  label='Fleet Model'
                />

                <IrisTextInput
                  type='text'
                  placeholder='Fleet Make'
                  name='fleetMake'
                  label='Fleet Make'
                />

                <IrisTextInput
                  type='number'
                  placeholder='Owner Id'
                  name='ownerId'
                  label='Owner Id'
                />

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
