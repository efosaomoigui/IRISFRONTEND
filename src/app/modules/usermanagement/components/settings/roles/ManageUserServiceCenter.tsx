import {Checkbox, FormControlLabel} from '@material-ui/core'
import {ErrorMessage, Field, FieldArray, Form, Formik, FormikHelpers} from 'formik'
import React, {useEffect, useState} from 'react'
import agent from '../../../../../../setup/axios/AxiosAgent'
import {
  IRoleModel,
  IServiceCenter,
  IServiceCenterData,
  IUserModel,
  IUserRole,
} from '../../../../auth/models/AuthInterfaces'

interface Props<Values> {
  userId?: string
  serviceCenters: string[]
  onSubmit: (values: Values, formikHelpers: FormikHelpers<Values>) => void | Promise<any>
  user?: IUserModel
}

export default function ManageUserServiceCenter(props: Props<IServiceCenter>) {
  const [data, setData] = useState<IRoleModel>()
  const [scmodel, setScModel] = useState<IServiceCenterData[]>([])
  const [loadingData1, setLoadingData1] = useState(true)
  const [selectedValue, setSelectedValue] = React.useState(true)

  const updateData = (fieldsToUpdate: Partial<IRoleModel>) => {
    const updatedData = {...data, ...fieldsToUpdate}
    // setData(updatedData)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.checked)
  }

  useEffect(() => {
    const callFunc = async () => {
      await agent.Shipment.serviceCenterList().then((response) => {
        setScModel(response)
        setLoadingData1(false)
      })
    }
    if (loadingData1) {
      callFunc()
    }
  }, [])

  const [loading, setLoading] = useState(false)

  const click = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  const initialFormValue: IServiceCenter = {
    userId: props.userId,
    serviceCenterCode: props.serviceCenters ? props.serviceCenters : [],
  }

  return (
    <div className='card mb-5 mb-xl-3'>
      <div id='kt_account_email_preferences' className=''>
        <Formik initialValues={initialFormValue} enableReinitialize onSubmit={props.onSubmit}>
          {({values, setFieldValue}) => (
            <Form>
              {/* <Field as='checkbox' name='roleId' className='form-select'> */}
              <input type='hidden' name='userId2' value={values.userId} />
              <FieldArray
                name='serviceCenterCode'
                render={(arrayHelpers) => (
                  <div>
                    {values.serviceCenterCode!.map((item, index) => (
                      <div className='row mb-2' key={index}>
                        {/** both these conventions do the same */}
                        {/* <hr className='bg-success border-2 border-top border-danger'></hr> */}
                        <div className='col-10 mt-5'>
                          <Field
                            as='select'
                            name={`serviceCenterCode.${index}`}
                            className='form-select'
                            label='Product'
                          >
                            {scmodel.map((unit, index) => {
                              return (
                                <option key={index} value={unit.code}>
                                  {unit.terminals}
                                </option>
                              )
                            })}
                          </Field>

                          <div className='text-danger mt-2'>
                            <ErrorMessage name={`serviceCenterCode.${index}`} />
                          </div>
                        </div>
                        <div className='col-1 mt-5'>
                          <button
                            className='float-end btn btn-sm btn-secondary me-3'
                            style={{width: '60%', fontWeight: 'bold'}}
                            type='button'
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            -
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      type='button'
                      className='float-start btn btn-lg btn-secondary'
                      onClick={() => arrayHelpers.push('')}
                    >
                      Add
                    </button>
                  </div>
                )}
              />
              <div className='card-footer d-flex justify-content-end py-6 px-9'>
                <button
                  type='submit'
                  // onClick={click}
                  onClick={() => {
                    setFieldValue('hiddenField', props.userId)
                  }}
                  className='btn btn-primary'
                  style={{width: '20%'}}
                >
                  {!loading && 'Save'}
                  {loading && (
                    <span className='indicator-progress' style={{display: 'block'}}>
                      Please wait...{' '}
                      <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                    </span>
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export {ManageUserServiceCenter}
