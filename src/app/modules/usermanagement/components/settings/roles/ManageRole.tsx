import {Checkbox, FormControlLabel} from '@material-ui/core'
import {Field, Form, Formik, FormikHelpers} from 'formik'
import React, {useEffect, useState} from 'react'
import agent from '../../../../../../setup/axios/AxiosAgent'
import {IRoleModel, IUserModel, IUserRole} from '../../../../auth/models/AuthInterfaces'

interface Props<Values> {
  userId?: string
  roles?: IRoleModel[]
  onSubmit: (values: Values, formikHelpers: FormikHelpers<Values>) => void | Promise<any>
  user?: IUserModel
}

export default function ManageRole(props: Props<IUserRole>) {
  const [data, setData] = useState<IRoleModel>()
  const [rolemodel, setRoleModel] = useState<IRoleModel[]>([])
  const [loadingData, setLoadingData] = useState(true)
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
      await agent.Roles.list().then((response) => {
        setRoleModel(response)
        setLoadingData(false)
      })
    }
    if (loadingData) {
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

  const initialFormValue: IUserRole = {
    userId: props.userId,
    roleId: [],
    check: false,
  }

  return (
    <div className='card mb-5 mb-xl-3'>
      <div id='kt_account_email_preferences' className=''>
        <Formik initialValues={initialFormValue} enableReinitialize onSubmit={props.onSubmit}>
          {({values, setFieldValue}) => (
            <Form>
              {/* <Field as='checkbox' name='roleId' className='form-select'> */}
              <input type='hidden' name='userId' value={values.userId} />
              {rolemodel.length &&
                rolemodel.map((role, index) => {
                  return (
                    <div
                      key={index}
                      className='card-body px-3 py-3'
                      role='group'
                      aria-labelledby='checkbox-group'
                    >
                      <label className='form-check form-check-custom form-check-solid align-items-start'>
                        <Field
                          type='checkbox'
                          onClick={handleChange}
                          name='roleId'
                          value={role.name}
                          // checked={selectedValue === role.name}
                          // checked={!!(props.user!.roles![props.user!.roles!.indexOf(role.name)] === role.name)}
                          // checked={props.user!.roles!.indexOf(role.name) >= 0 ? true : false}
                          className='form-check-input me-3'
                          // disabled={(props.user!.roles!.indexOf(role.name)) >= 0 ? true : false}
                        />

                        {/* {route.name} */}
                        <span className='form-check-label d-flex flex-column align-items-start'>
                          <span className='col-lg-8 d-flex align-items-center'>
                            <span className='fw-bolder fs-5 mb-0 mr-10'>{role.name}</span>
                            {props.user!.roles!.indexOf(role.name) >= 0 && (
                              <span className='badge badge-success ml-14'>A</span>
                            )}
                          </span>
                          <span className='text-muted fs-6'>
                            This role allows you access to {role.name}'s previlleges
                          </span>
                        </span>
                      </label>
                      <div className='separator separator-dashed my-2'></div>
                    </div>
                  )
                })}

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
                  {!loading && 'Save Changes'}
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

export {ManageRole}
