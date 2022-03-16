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

  const updateData = (fieldsToUpdate: Partial<IRoleModel>) => {
    const updatedData = {...data, ...fieldsToUpdate}
    // setData(updatedData)
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
                          name='roleId'
                          value={role.name}
                          checked={(props.user!.roles!.indexOf(role.name)) > 0 && true}
                          className='form-check-input me-3'
                        />
                        {/* {route.name} */}
                        <span className='form-check-label d-flex flex-column align-items-start'>
                          <span className='fw-bolder fs-5 mb-0'>{role.name}</span>
                          <span className='text-muted fs-6'>
                            The role allow you to have access to {role.name} 's previlleges'.
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
