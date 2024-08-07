import { Grid } from '@material-ui/core'
import { Alert } from '@mui/material'
import { Form, Formik, FormikHelpers } from 'formik'
import { useState } from 'react'
import { Modal } from 'react-bootstrap-v5'
import { Button } from 'semantic-ui-react'
import * as Yup from 'yup'
import { KTSVG } from '../../../../_iris/helpers'
import { usePageData } from '../../../../_iris/layout/core'
import { IRoleModel } from '../../auth/models/AuthInterfaces'
import ErrorAlert from '../../common/ErrorAlert'
import IrisTextInput from '../../layout/forms/IrisTextInput'
import useStyles from '../../layout/formstyles/FormStyle'

// interface Props {
//   userVal: IUserModel
// }

interface Props<Values> {
  onSubmit: (values: Values, formikHelpers: FormikHelpers<Values>) => void | Promise<any>
  isSubmitting: boolean
  showForm?: boolean
  role?: IRoleModel
  formTitle?: string
  showError?: boolean
  errorMessage?: string
  handleClick?: () => void
}

export default function EditRoleForm(props: Props<IRoleModel>) {

  const { entityValues, setEntityValues, selectUrlParam, setSelectUrlParam, formTitle, setFormTitle } = usePageData()

  const [errorMessage, setErrorMessage] = useState('')
  const [showError, setShowError] = useState(true)

  
  const initialFormValue: IRoleModel = {
    name: props.role ? props.role!.name : '',
  }

  const validationSchema = Yup.object({ 
    name: Yup.string().required(),
  })

  const classes = useStyles()

  return (
    <>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialFormValue}
        enableReinitialize
        onSubmit={props.onSubmit}
      >
        <Form>
          <div className='modal-dialog modal-dialog-centered mw-900px'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h2>{"Edit User Role"}</h2>
                <div
                  className='btn btn-sm btn-icon btn-active-color-primary'
                  data-bs-dismiss='modal'
                >
                  <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
                </div>
              </div>

              <div className='modal-body' >
                {props.showError && <ErrorAlert type={'danger'} message={props.errorMessage!.toString()} heading={'Oh snap! You got an error!'} />}
                {props.showForm &&(
                  <Grid container className={classes.root}>
                    <Grid item xs={6}>
                      {/* <IrisTextInput type='text' name='id' label='Role Id' /> */}
                      <IrisTextInput type='text' name='name' label='Role Name' />
                    </Grid>
                  </Grid>
                )}
                {!props.showForm && <ErrorAlert type={'success'} message={'Role Created Successfully!'} heading={'Confirmation Message!'} />}
              </div>

              <Modal.Footer>
                {props.showForm &&
                  (<Button
                    floated='right'
                    positive
                    type='submit'
                    variant='primary'
                    loading={props.isSubmitting}
                    content='Submit'
                  />
                  )}
                <Button
                  floated='right'
                  positive
                  type='reset'
                  variant='primary'
                  onClick={props.handleClick}
                  data-bs-dismiss='modal'
                  content='Cancel'
                />
              </Modal.Footer>
            </div>
          </div>
        </Form>
      </Formik>
    </>
  )
}
