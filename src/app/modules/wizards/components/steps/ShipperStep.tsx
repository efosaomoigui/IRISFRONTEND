import {Divider} from '@material-ui/core'
import {ErrorMessage, Field, FormikValues, useFormikContext} from 'formik'
import React, {useState, useEffect, ChangeEvent} from 'react'
import {Spinner} from 'react-bootstrap-v5'
import PhoneInput from 'react-phone-input-2'
import agent from '../../../../../setup/axios/AxiosAgent'
import {IUserModel} from '../../../auth/models/AuthInterfaces'
import {IRouteModel} from '../../../shipmentmanagement/ShipmentModels/ShipmentInterfaces'
import {ICreateAccount} from '../CreateAccountWizardHelper'

const ShipperStep = () => {
  const [routemodel, setRouteModel] = useState<IRouteModel[]>([])
  const [loadingData, setLoadingData] = useState(true)

  const formikProps = useFormikContext<ICreateAccount>() //Magic of taking nexted values from parent to child

  const handleSearchShipper = (phone: string) => {
    setLoadingData(true)
    setTimeout(() => {
      agent.Users.userByPhone(phone).then((response) => {
        if (response) {
          formikProps.setFieldValue('shipperFullName', response.firstName + ' ' + response.lastName)
          formikProps.setFieldValue('shipperPhoneNumber', response.phoneNumber)
          formikProps.setFieldValue('shipperEmail', response.email)
        }
        setLoadingData(false)
      })
    }, 1500)
  }

  const handleSearchReceiver = (phone: string) => {
    setLoadingData(true)
    setTimeout(() => {
      agent.Users.userByPhone(phone).then((response) => {
        if (response) {
          formikProps.setFieldValue(
            'receiverFullName',
            response.firstName + ' ' + response.lastName
          )
          formikProps.setFieldValue('receiverPhoneNumber', response.phoneNumber)
          formikProps.setFieldValue('receiverEmail', response.email)
        }
        setLoadingData(false)
      })
    }, 1500)
  }

  //USE EFFECT HOOK
  useEffect(() => {
    const callFunc = async () => {
      await agent.Route.list().then((response) => {
        setRouteModel(response)
        formikProps.values.routeVals = response
        setLoadingData(false)
      })
    }
    if (loadingData) {
      callFunc()
    }
  }, [])

  return (
    <div className='w-100'>
      <div className='pb-10 pb-lg-15'>
        {/* <h2 className='fw-bolder text-dark'>Shippers Information</h2> */}
      </div>

      <div className='mb-10 fv-row'>
        <div className='container'>
          <div className='row'>
            <div className='col-6'>
              <div className='row mb-2' data-kt-buttons='true'>
                <div className='col'>
                  <div className='mb-0 fv-row'>
                    <label className='d-flex align-items-center form-label mb-5'>
                      <h3>Shipper</h3>
                      <i
                        className='fas fa-exclamation-circle ms-2 fs-7'
                        data-bs-toggle='tooltip'
                        title='Monthly billing will be based on your account plan'
                      ></i>
                    </label>

                    <div className='mb-0'>
                      <div className='fv-row mb-10'>
                        {/* <div className='mt-6'></div> */}
                        <label className='form-label'>Contact Phone</label>
                        <PhoneInput
                          country={'ng'}
                          value={formikProps?.values.shipperPhoneNumber}
                          inputStyle={{
                            height: '45px',
                            fontSize: '15px',
                            width: '80%',
                            marginTop: '24px',
                          }}
                          // disabled
                          onChange={(shipperPhoneNumber) => {
                            formikProps.setFieldValue('shipperPhoneNumber', shipperPhoneNumber)
                            handleSearchShipper(shipperPhoneNumber)
                          }}
                        />

                        <div className='text-danger mt-2'>
                          <ErrorMessage name='shipperPhoneNumber' />
                        </div>
                      </div>

                      <div className='fv-row mb-10'>
                        {loadingData && (
                          <div>
                            <Spinner animation='border' />
                          </div>
                        )}

                        <label className='form-label'>Full Name</label>

                        <Field
                          name='shipperFullName'
                          className='form-control form-control-lg form-control-solid'
                          rows={3}
                        ></Field>

                        <div className='text-danger mt-2'>
                          <ErrorMessage name='shipperFullName' />
                        </div>
                      </div>

                      <div className='fv-row mb-10'>
                        <label className='form-label'>Email</label>

                        <Field
                          name='shipperEmail'
                          className='form-control form-control-lg form-control-solid'
                          rows={3}
                        ></Field>

                        <div className='text-danger mt-2'>
                          <ErrorMessage name='shipperEmail' />
                        </div>
                      </div>

                      <div className='fv-row mb-10'>
                        <label className='form-label'>Address</label>

                        <Field
                          as='textarea'
                          name='shipperAddress'
                          className='form-control form-control-lg form-control-solid'
                          rows={3}
                        ></Field>

                        <div className='text-danger mt-2'>
                          <ErrorMessage name='shipperAddress' />
                        </div>
                      </div>
                      <div className='fv-row mb-10'>
                        {}
                        <label className='form-label'>
                          <h3>{'Departure => Destination'}</h3>
                        </label>
                        <Field as='select' name='route' className='form-select'>
                          <option>Select A Route</option>
                          {routemodel.length &&
                            routemodel.map((route, index) => {
                              return (
                                <option key={index} value={route.routeId}>
                                  {route.departure + ' ==> ' + route.destination}
                                </option>
                              )
                            })}
                        </Field>
                        <div className='text-danger mt-2'>
                          <ErrorMessage name='route' />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='col-6'>
              <div className='row mb-2' data-kt-buttons='true'>
                <div className='col'>
                  <div className='mb-0 fv-row'>
                    <label className='d-flex align-items-center form-label mb-5'>
                      <h3>Receiver</h3>
                      <i
                        className='fas fa-exclamation-circle ms-2 fs-7'
                        data-bs-toggle='tooltip'
                        title='Monthly billing will be based on your account plan'
                      ></i>
                    </label>

                    <div className='mb-0'>
                      <div className='fv-row mb-10'>
                        <label className='form-label'>Contact Phone</label>
                        {/* <Field
                          type='number'
                          name='receiverPhoneNumber'
                          className='form-control form-control-lg form-control-solid'
                          rows={3}
                        ></Field> */}
                        <PhoneInput
                          country={'ng'}
                          inputStyle={{
                            height: '45px',
                            fontSize: '15px',
                            width: '80%',
                            marginTop: '24px',
                          }}
                          onChange={(receiverPhoneNumber) => {
                            formikProps.setFieldValue('receiverPhoneNumber', receiverPhoneNumber)
                            handleSearchReceiver(receiverPhoneNumber)
                          }}
                        />
                        {/* <input type='text' value={receiverPhoneNumber} name='receiverPhoneNumber' /> */}
                        <div className='text-danger mt-2'>
                          <ErrorMessage name='receiverPhoneNumber' />
                        </div>
                      </div>

                      <div className='fv-row mb-10'>
                        <label className='form-label'>Full Name</label>

                        <Field
                          name='receiverFullName'
                          className='form-control form-control-lg form-control-solid'
                          rows={3}
                        ></Field>

                        <div className='text-danger mt-2'>
                          <ErrorMessage name='receiverFullName' />
                        </div>
                      </div>

                      <div className='fv-row mb-10'>
                        <label className='form-label'>Email</label>

                        <Field
                          name='receiverEmail'
                          className='form-control form-control-lg form-control-solid'
                          rows={3}
                        ></Field>

                        <div className='text-danger mt-2'>
                          <ErrorMessage name='receiverEmail' />
                        </div>
                      </div>

                      <div className='fv-row mb-10'>
                        <label className='form-label'>Pick Up or Drop Off Address</label>

                        <Field
                          as='textarea'
                          name='receiverAddress'
                          className='form-control form-control-lg form-control-solid'
                          rows={3}
                        ></Field>

                        <div className='text-danger mt-2'>
                          <ErrorMessage name='receiverAddress' />
                        </div>
                      </div>

                      <div className='fv-row mb-10'>
                        {}
                        <label className='form-label'>
                          <h3>{'Shipment Option'}</h3>
                        </label>
                        <Field as='select' name='shipmentOption' className='form-select'>
                          <option>Pick up or Drop off?</option>
                          <option value='1'>Drop Off </option>
                          <option value='2'>Pick Up</option>
                        </Field>
                        <div className='text-danger mt-2'>
                          <ErrorMessage name='shipmentOption' />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Divider />
    </div>
  )
}

export default ShipperStep
