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
    IsSubRoute: props.route ? props.route!.IsSubRoute : true,
    DispatchFee: props.route ? props.route!.DispatchFee : 0,
    LoaderFee: props.route ? props.route!.LoaderFee : 0,
    CaptainFee: props.route ? props.route!.CaptainFee : 0,
    MainRouteId: props.route ? props.route!.MainRouteId : 0,
    AvailableAtTerminal: props.route ? props.route!.AvailableAtTerminal : true,
    AvailableOnline: props.route ? props.route!.AvailableOnline : true,
    RouteType: props.route ? props.route!.RouteType : 0
  }

  const validationSchema = Yup.object({
    RouteId: Yup.string().required(),
    RouteName: Yup.string().required(),
    Departure: Yup.string().required(),
    Destination: Yup.string().required(),
    IsSubRoute: Yup.boolean().required(),
    DispatchFee: Yup.number().required(),
    LoaderFee: Yup.number().required(),
    captainFee: Yup.number().required(),
    MainRouteId: Yup.string().required(),
    AvailableAtTerminal: Yup.boolean().required(),
    AvailableOnline: Yup.boolean().required(),
    RouteType: Yup.number().required(),
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
                  name='RouteId'
                  placeholder='Route Id'
                  label='Route Id'
                />
                <IrisTextInput
                  type='text'
                  placeholder='Route Name'
                  name='RouteName'
                  label='Route Name'
                />
                <IrisTextInput
                  type='text'
                  placeholder='Depature'
                  name='Departure'
                  label='Depature'
                />
                <IrisTextInput
                  type='text'
                  placeholder='Destination'
                  name='Destination'
                  label='Destination'
                />
                
                <IrisTextInput
                  type='text'
                  placeholder='Is_Sub_Route'
                  name='IsSubRoute'
                  label='Is_Sub_Route'
                />

                <IrisTextInput
                  type='text'
                  placeholder='Dispatch Fee'
                  name='DispatchFee'
                  label='Dispatch Fee'
                />
                <IrisTextInput
                  type='text'
                  placeholder='Loader Fee'
                  name='LoaderFee'
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
                  name='MainRouteId'
                  label='Main_Route_Id'
                />

                <IrisTextInput
                  type='text'
                  placeholder='Availabale_At_Terminal'
                  name='AvailableAtTerminal'
                  label='Availabale_At_Terminal'
                />

                <IrisTextInput
                  type='text'
                  placeholder='Availabale_Online'
                  name='AvailableOnline'
                  label='Availabale_Online'
                />

                <IrisTextInput
                  type='text'
                  placeholder='Route_Type'
                  name='RouteType'
                  label='Route_Type'
                />

                {/* <IrisSelectInput
                  options={options}
                  placeholder='category'
                  name='category'
                  label='Category'
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
