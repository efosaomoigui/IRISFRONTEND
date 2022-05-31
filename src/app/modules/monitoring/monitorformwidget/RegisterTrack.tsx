/* eslint-disable jsx-a11y/anchor-is-valid */
import {ErrorMessage, Field, Form, Formik, FormikHelpers} from 'formik'
import React, {useEffect, useState} from 'react'
import {shallowEqual, useSelector} from 'react-redux'
import {toast} from 'react-toastify'
import {Button} from 'semantic-ui-react'
import {RootState} from '../../../../setup'
import agent from '../../../../setup/axios/AxiosAgent'
import {KTSVG} from '../../../../_iris/helpers/components/KTSVG'
import {Dropdown1} from '../../../../_iris/partials/content/dropdown/Dropdown1'
import {IUserModel} from '../../auth/models/AuthInterfaces'
import {v4 as uuid} from 'uuid'
import * as Yup from 'yup'
import {
  IBaseShipmentModel,
  IGroupWayBillModel,
  IRouteModel,
  IShipmentModel,
  TripActionAndStatusVm,
} from '../../shipmentmanagement/ShipmentModels/ShipmentInterfaces'
import {ITrackHistoryModel, ITripModel} from '../Monitor models/MonitorInterface'
import {Modal} from 'react-bootstrap-v5'

interface Props<Values> {
  onSubmit?: (values: Values, formikHelpers: FormikHelpers<Values>) => void | Promise<any>
  isSubmitting?: boolean
  trackHistory?: ITrackHistoryModel
  showForm?: boolean
  formTitle?: string
  showError?: boolean
  errorMessage?: string
  handleClick?: () => void
  className?: string
}

function RegisterTrack(props: Props<ITrackHistoryModel>) {
  const [listBag, setListBag] = useState<IBaseShipmentModel[]>([])
  const [listDataValue, setListDataVal] = useState<IShipmentModel[]>([])
  const [routemodel, setRouteModel] = useState<IRouteModel[]>([])
  const [loadingData, setLoadingData] = useState(true)
  const [groupWayBillCode, setGroupWayBillCode] = useState('')
  const [routeId, setRouteId] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [showError, setShowError] = useState(false)
  const [actionAndStatus, setActionAndStatus] = useState<TripActionAndStatusVm>()
  const [tripDetails, setTripDetails] = useState<ITripModel[]>()
  const [tripReference, setTripReference] = useState<string>('')
  const [enableSave, setEnableSave] = useState(false)

  const user: IUserModel = useSelector<RootState>(({auth}) => auth.user, shallowEqual) as IUserModel

  const initialFormValue: ITrackHistoryModel = {
    id: props.trackHistory ? props.trackHistory!.id : '',
    tripReference: props.trackHistory ? props.trackHistory!.tripReference : '',
    action: props.trackHistory ? props.trackHistory!.action : '',
    location: props.trackHistory ? props.trackHistory!.location : '',
    timeStamp: props.trackHistory ? props.trackHistory!.timeStamp : '',
    status: props.trackHistory ? props.trackHistory!.status : '',
  }

  const validationSchema = Yup.object({
    // tripReference: Yup.string().required(),
    action: Yup.string().required(),
    location: Yup.string().required(),
    // timeStamp: Yup.string().required(),
    status: Yup.string().required(),
  })

  // //USE EFFECT HOOK
  useEffect(() => {
    const callFunc = async () => {
      await agent.Route.list().then((response) => {
        setRouteModel(response)
        setLoadingData(false)
      })

      await agent.Trip.GetActionAndStatus().then((response) => {
        setActionAndStatus(response)
      })
    }
    if (loadingData) {
      callFunc()
    }
  }, [])

  const Save = (values: ITrackHistoryModel) => {
    values.tripReference = tripReference
    values.id = uuid()
    values.action = Number(values.action)
    values.status = Number(values.status)

    setIsSubmitting(true)

    agent.TrackHistory.create(values).then((response) => {
      if (response.validationErrors!.length > 0) {
        toast.error(response.validationErrors?.toString())
        setErrorMessage(response.validationErrors!.toString())
        setIsSubmitting(false)
        setShowError(true)
      } else {
        toast.success('Group Bag Creation Was Successful!')
        setInterval(() => {
          setShowForm(false)
        }, 1000)
        setListBag([])
        setIsSubmitting(false)
        setShowError(false)
      }
    })
  }

  const searchRef = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value
    setTimeout(async () => {
      await agent.Trip.searchTripByRef(searchValue).then((response) => {
        setTripDetails(response)
        if (response) setTripReference(response[0].tripReference!)
      })
    }, 300)
  }

  return (
    <>
      <h3>Trip Reference Code: </h3>
      <div className='row'>
        <div className='col'>
          <input type='text' className='form-control p-7 mb-4' onChange={searchRef} />
        </div>
      </div>
      <div className='row'>
        <div className='col-xxl-4'>
          <div className={`card ${props.className}`}>
            {/* begin::Header */}
            <div className='card-header border-0'>
              <h3 className='card-title fw-bolder text-dark'>Trip Information</h3>
              <div className='card-toolbar'>
                {/* begin::Menu */}
                <button
                  type='button'
                  className='btn btn-sm btn-icon btn-color-primary btn-active-light-primary'
                  data-kt-menu-trigger='click'
                  data-kt-menu-placement='bottom-end'
                  data-kt-menu-flip='top-end'
                >
                  <KTSVG path='/media/icons/duotune/general/gen024.svg' className='svg-icon-2' />
                </button>
                {/* <Dropdown1 /> */}
                {/* end::Menu */}
              </div>
            </div>
            {/* end::Header */}
            {/* begin::Body */}
            {tripDetails && (
              <>
                <div className='card-body pt-2'>
                  <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
                    <div className='card-header cursor-pointer'>
                      <div className='card-title m-0'>
                        <h3 className='fw-bolder m-0'>
                          Trip Code: {tripDetails && tripDetails[0].tripReference}
                        </h3>
                      </div>
                    </div>

                    <div className='card-body p-9'>
                      <div className='row mb-7'>
                        <label className='col-lg-4 fw-bold text-muted'>Date Created</label>

                        <div className='col-lg-8'>
                          <span className='fw-bolder fs-6 text-dark'>
                            {tripDetails && tripDetails[0].createdDate}
                          </span>
                        </div>
                      </div>

                      <div className='row mb-7'>
                        <label className='col-lg-4 fw-bold text-muted'>Departure</label>

                        <div className='col-lg-8 fv-row'>
                          <span className='fw-bold fs-6'>
                            {tripDetails && tripDetails[0].departure}
                          </span>
                        </div>
                      </div>

                      <div className='row mb-7'>
                        <label className='col-lg-4 fw-bold text-muted'>
                          Destination
                          <i
                            className='fas fa-exclamation-circle ms-1 fs-7'
                            data-bs-toggle='tooltip'
                            title='Phone number must be active'
                          ></i>
                        </label>

                        <div className='col-lg-8 d-flex align-items-center'>
                          <span className='fw-bolder fs-6 me-2'>
                            {tripDetails && tripDetails[0].destination}
                          </span>
                        </div>
                      </div>

                      <div className='row mb-7'>
                        <label className='col-lg-4 fw-bold text-muted'>Driver</label>

                        <div className='col-lg-8 d-flex align-items-center'>
                          <span className='fw-bolder fs-6 me-2'>
                            {tripDetails && tripDetails[0].driverName}
                          </span>
                        </div>
                      </div>

                      <div className='row mb-7'>
                        <label className='col-lg-4 fw-bold text-muted'>
                          Route Code
                          <i
                            className='fas fa-exclamation-circle ms-1 fs-7'
                            data-bs-toggle='tooltip'
                            title='Country of origination'
                          ></i>
                        </label>

                        <div className='col-lg-8'>
                          <span className='fw-bolder fs-6 text-dark'>
                            {tripDetails && tripDetails[0].routeName}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <hr className='bg-default border-1 mb-4 mt-4 border-top border-default'></hr>
                </div>
              </>
            )}

            {/* end::Body */}
          </div>
        </div>

        <div className='col-xxl-4'>
          <div className={`card ${props.className}`}>
            {/* begin::Header */}
            <div className='card-header border-0'>
              <h3 className='card-title fw-bolder text-dark'>Carrier/Fleet Information</h3>
              <div className='card-toolbar'>
                {/* begin::Menu */}
                <button
                  type='button'
                  className='btn btn-sm btn-icon btn-color-primary btn-active-light-primary'
                  data-kt-menu-trigger='click'
                  data-kt-menu-placement='bottom-end'
                  data-kt-menu-flip='top-end'
                >
                  <KTSVG path='/media/icons/duotune/general/gen024.svg' className='svg-icon-2' />
                </button>
                {/* <Dropdown1 /> */}
                {/* end::Menu */}
              </div>
            </div>
            {/* end::Header */}
            {/* begin::Body */}
            {tripDetails && (
              <>
                <div className='card-body pt-2'>
                  <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
                    <div className='card-header cursor-pointer'>
                      <div className='card-title m-0'>
                        <h3 className='fw-bolder m-0'>
                          Registration#: {tripDetails && tripDetails[0].fleetChasis}
                        </h3>
                      </div>
                    </div>

                    <div className='card-body p-9'>
                      <div className='row mb-7'>
                        <label className='col-lg-12 fw-bold text-muted'>Fleet Full Details</label>

                        <div className='col-lg-12'>
                          <span className='fw-bolder fs-6 text-dark'>
                            {tripDetails && tripDetails[0].fleetFullDetails}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <hr className='bg-default border-1 mb-4 mt-4 border-top border-default'></hr>
                </div>
              </>
            )}

            {/* end::Body */}
          </div>
        </div>

        <div className='col-xl-4'>
          <Formik
            validationSchema={validationSchema}
            initialValues={initialFormValue}
            onSubmit={Save}
            // onChange={handleOnChange}
          >
            {({values, handleChange}) => (
              <Form className='mx-auto mw-900px w-100 pb-10' id='kt_create_account_form'>
                <div className={`card ${props.className}`}>
                  {tripDetails && (
                    <>
                      <div className='card-header border-0'>
                        <h3 className='card-title fw-bolder text-dark'>Status Registration</h3>
                        <div className='card-toolbar'>
                          {/* begin::Menu */}
                          <button
                            type='button'
                            className='btn btn-sm btn-icon btn-color-primary btn-active-light-primary'
                            data-kt-menu-trigger='click'
                            data-kt-menu-placement='bottom-end'
                            data-kt-menu-flip='top-end'
                          >
                            <KTSVG
                              path='/media/icons/duotune/general/gen024.svg'
                              className='svg-icon-2'
                            />
                          </button>
                          {/* <Dropdown1 /> */}
                          {/* end::Menu */}
                        </div>
                      </div>

                      <div className='card-body pt-2'>
                        <div className='col'>
                          <div className='mb-0 fv-row'>
                            <div className='mb-0'>
                              <div className='fv-row mb-10'>
                                <label className='form-label'>Status</label>
                                {}
                                <Field as='select' name='status' className='form-select'>
                                  <option>Select Status</option>
                                  {actionAndStatus?.status.length &&
                                    actionAndStatus?.status.map((item, index) => {
                                      return (
                                        <option key={index} value={item.name}>
                                          {item.value}
                                        </option>
                                      )
                                    })}
                                </Field>
                                <div className='text-danger mt-2'>
                                  <ErrorMessage name='status' />
                                </div>
                                <Field
                                  type='hidden'
                                  name='tripReference'
                                  value={tripDetails[0].tripReference}
                                ></Field>
                              </div>

                              <div className='fv-row mb-10'>
                                <label className='form-label'>Location</label>

                                <Field
                                  name='location'
                                  className='form-control form-control-lg form-control-solid'
                                  rows={3}
                                ></Field>

                                <div className='text-danger mt-2'>
                                  <ErrorMessage name='location' />
                                </div>
                              </div>

                              <div className='fv-row mb-10'>
                                <label className='form-label'>Action</label>
                                {}
                                <Field as='select' name='action' className='form-select'>
                                  <option>Select Action</option>
                                  {actionAndStatus?.actions.length &&
                                    actionAndStatus?.actions.map((item, index) => {
                                      return (
                                        <option key={index} value={item.name}>
                                          {item.value}
                                        </option>
                                      )
                                    })}
                                </Field>
                                <div className='text-danger mt-2'>
                                  <ErrorMessage name='action' />
                                </div>
                              </div>

                              <div className='fv-row mb-10'>
                                <label className='form-label'>Comment</label>

                                <Field
                                  as='textarea'
                                  name='Comment'
                                  className='form-control form-control-lg form-control-solid'
                                  rows={3}
                                ></Field>

                                <div className='text-danger mt-2'>
                                  <ErrorMessage name='Comment' />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <hr className='bg-default border-1 mb-4 mt-4 border-top border-default'></hr>
                        <Modal.Footer>
                          {values.action && values.status && (
                            <>
                              <Button
                                floated='right'
                                positive
                                type='submit'
                                variant='primary'
                                loading={props.isSubmitting}
                                content='Save'
                              />
                            </>
                          )}
                        </Modal.Footer>
                      </div>
                    </>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  )
}

export {RegisterTrack}
