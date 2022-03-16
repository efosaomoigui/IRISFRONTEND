import React, {useEffect, useState} from 'react'
import {ErrorMessage, Field, Formik, FormikHelpers, useFormik} from 'formik'
import {IRoleModel, IUserModel, IUserRole} from '../../auth/models/AuthInterfaces'
import {Grid} from '@mui/material'
import useStyles from '../../layout/formstyles/FormStyle'
import agent from '../../../../setup/axios/AxiosAgent'

interface Props<Values> {
  userId?: string //change here by Mr Efe
  onSubmit: (values: Values, formikHelpers: FormikHelpers<Values>) => void | Promise<any>
}

export const AddUserToRole = (props: Props<IUserRole>) => {
  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted
  const [rolemodel, setRoleModel] = useState<IRoleModel[]>([])
  const [loadingData, setLoadingData] = useState(true)

  const classes = useStyles()

  const initialFormValue: IUserRole = {
    userId: '',
    roleId: [],
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

  return (
    <>
      <Formik initialValues={initialFormValue} enableReinitialize onSubmit={props.onSubmit}>
        {({values, setFieldValue}) => (
          <form>
            <Grid container className={classes.root}>
              <Grid item xs={12}>
                <div className=' fv-row'>
                  <div className=''>
                    <div className='row'>
                      <div className='col-11'>
                        <Field as='select' name='roleId' className='form-select'>
                          {rolemodel.length &&
                            rolemodel.map((route, index) => {
                              return (
                                <option key={index} value={route.id}>
                                  {route.name}
                                </option>
                              )
                            })}
                        </Field>
                        <button type='submit'>Submit</button>

                        <div className='text-danger mt-2'>
                          <ErrorMessage name='roleId' />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  )
}
