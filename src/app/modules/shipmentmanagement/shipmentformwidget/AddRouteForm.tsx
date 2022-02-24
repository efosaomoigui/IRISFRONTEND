import {Modal} from 'react-bootstrap-v5'
import {Button} from 'semantic-ui-react'
import {KTSVG} from '../../../../_iris/helpers'
import {Formik, Form, FormikHelpers} from 'formik'
import * as Yup from 'yup'
import IrisTextInput from '../../layout/forms/IrisTextInput'
import IrisSelectInput from '../../layout/forms/IrisSelectInput'
import { IRouteModel } from '../ShipmentModels/ShipmentInterfaces'



// interface Props {
//   userVal: IUserModel
// }

interface Props<Values> {
  onSubmit: (values: Values, formikHelpers: FormikHelpers<Values>) => void | Promise<any>
  isSubmitting: boolean
  route?: IRouteModel
}

const options = [
  {text: 'one', value: 'Bag'},
  {text: 'two', value: 'Serial'},
  {text: 'three', value: 'Turkey'},
  {text: 'four', value: 'Afganistan'},
]

export default function AddRouteForm(props: Props<IRouteModel>) {
  const initialFormValue: IRouteModel = {
    RouteId: props.route ? props.route!.RouteId : '',
    RouteName: props.route ? props.route!.RouteName : '',
    Departure: props.route ? props.route!.Departure : '',
    Destination: props.route ? props.route!.Destination : '',
    IsSubRoute: props.route ? props.route!.IsSubRoute : '',
    DispatchFee: props.route ? props.route!.DispatchFee : '',
    LoaderFee: props.route ? props.route!.LoaderFee : '',
    CaptainFee: props.route ? props.route!.CaptainFee : '',
    MainRouteId: props.route ? props.route!.MainRouteId : '',
    AvailableAtTerminal: props.route ? props.route!.AvailableAtTerminal : '',
    AvailableOnline: props.route ? props.route!.AvailableOnline : '',
    RouteType: props.route ? props.route!.RouteType : ''
  }

  const validationSchema = Yup.object({
    routId: Yup.string().required(),
    routeName: Yup.string().required(),
    depature: Yup.string().required(),
    destination: Yup.string().required(),
    isSubRoute: Yup.string().required(),
    dispatchFee: Yup.string().required(),
    loaderFee: Yup.string().required(),
    captainFee: Yup.string().required(),
    main_Route_Id: Yup.string().required(),
    availabale_At_Terminal: Yup.string().required(),
    availabale_Online: Yup.string().required(),
    route_Type: Yup.string().required(),
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
                <h2>Create Route</h2>
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
                  name='routId'
                  placeholder='Route Id'
                  label='Route Id'
                />
                <IrisTextInput
                  type='text'
                  placeholder='Route Name'
                  name='routeName'
                  label='Route Name'
                />
                <IrisTextInput
                  type='text'
                  placeholder='Depature'
                  name='depature'
                  label='Depature'
                />
                <IrisTextInput
                  type='text'
                  placeholder='Destination'
                  name='destination'
                  label='Destination'
                />
                
                <IrisTextInput
                  type='text'
                  placeholder='Is_Sub_Route'
                  name='isSubRoute'
                  label='Is_Sub_Route'
                />

                <IrisTextInput
                  type='text'
                  placeholder='Dispatch Fee'
                  name='dispatchFee'
                  label='Dispatch Fee'
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
                  placeholder='Loader Fee'
                  name='loaderFee'
                  label='Loader Fee'
                />

                <IrisTextInput
                  type='text'
                  placeholder='Captain Fee'
                  name='captainFee'
                  label='Captain Fee'
                />

                <IrisTextInput
                  type='text'
                  placeholder='Main_Route_Id'
                  name='main_Route_Id'
                  label='Main_Route_Id'
                />

                <IrisTextInput
                  type='text'
                  placeholder='Availabale_At_Terminal'
                  name='availabale_At_Terminal'
                  label='Availabale_At_Terminal'
                />

                <IrisTextInput
                  type='text'
                  placeholder='Availabale_Online'
                  name='availabale_Online'
                  label='Availabale_Online'
                />

                <IrisTextInput
                  type='text'
                  placeholder='Route_Type'
                  name='route_Type'
                  label='Route_Type'
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
                <Button floated='right' positive type='button' data-bs-dismiss="modal" content='Cancel'></Button>
              </Modal.Footer>
            </div>
          </div>
        </Form>
      </Formik>
    </>
  )
}
