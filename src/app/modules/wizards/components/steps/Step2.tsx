import React, {FC, useEffect, useState} from 'react'
import {KTSVG} from '../../../../../_iris/helpers'
import {Field, ErrorMessage, FieldArray} from 'formik'
import agent from '../../../../../setup/axios/AxiosAgent'
import {IRouteModel} from '../../../shipmentmanagement/ShipmentModels/ShipmentInterfaces'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

interface Props {
  values?: any
  setFieldValue: (obj: string, value: any) => void
}

const Step2: FC<Props> = ({values, setFieldValue}: Props) => {
  const [routemodel, setRouteModel] = useState<IRouteModel[]>([])
  const [loadingData, setLoadingData] = useState(true)
  const [shipperPhoneNumber, setShipperPhoneNumber] = useState('')
  const [receiverPhoneNumber, setReceiverPhoneNumber] = useState('')

  //USE EFFECT HOOK
  useEffect(() => {
    const callFunc = async () => {
      await agent.Route.list().then((response) => {
        setRouteModel(response)
        setLoadingData(false)
      })
    }
    if (loadingData) {
      callFunc()
    }
  }, [])

  return (
    <div className='w-100'>
      <div className='pb-2 pb-lg-6'>
        <h2 className='fw-bolder text-dark'>{'Departure => Destination'}</h2>
      </div>

      <div className='mb-15 fv-row'>
        <div className='container'>
          <div className='row'>
            <div className='col-6'>
              {}
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

      <div className='pb-10 pb-lg-15'>
        <h2 className='fw-bolder text-dark'>Shippers Information</h2>
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
                          value={shipperPhoneNumber}
                          inputStyle={{
                            height: '47px',
                            fontSize: '20px',
                            width: '80%',
                            marginTop: '24px',
                          }}
                          onChange={(shipperPhoneNumber) =>
                            setFieldValue('shipperPhoneNumber', shipperPhoneNumber)
                          }
                        />

                        {/* <Field
                          type='number'
                          name='shipperPhoneNumber'
                          className='form-control form-control-lg form-control-solid'
                          rows={3}
                        ></Field> */}

                        <div className='text-danger mt-2'>
                          <ErrorMessage name='shipperPhoneNumber' />
                        </div>
                      </div>

                      <div className='fv-row mb-10'>
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
                          value={receiverPhoneNumber}
                          inputStyle={{
                            height: '47px',
                            fontSize: '20px',
                            width: '80%',
                            marginTop: '24px',
                          }}
                          onChange={(receiverPhoneNumber) =>
                            setFieldValue('receiverPhoneNumber', receiverPhoneNumber)
                          }
                        />
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
                        <label className='form-label'>Address</label>

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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export {Step2}
