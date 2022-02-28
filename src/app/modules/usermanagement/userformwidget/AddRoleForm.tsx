import {Grid} from '@material-ui/core'
import { Alert } from '@mui/material'
import {Form, Formik, FormikHelpers} from 'formik'
import {Modal} from 'react-bootstrap-v5'
import {Button} from 'semantic-ui-react'
import * as Yup from 'yup'
import {KTSVG} from '../../../../_iris/helpers'
import { usePageData } from '../../../../_iris/layout/core'
import {IRoleModel} from '../../auth/models/AuthInterfaces'
import IrisTextInput from '../../layout/forms/IrisTextInput'
import useStyles from '../../layout/formstyles/FormStyle'

// interface Props {
//   userVal: IUserModel
// }

interface Props<Values> {
  onSubmit: (values: Values, formikHelpers: FormikHelpers<Values>) => void | Promise<any>
  isSubmitting: boolean
  showForm?:boolean
  role?: IRoleModel
}

export default function AddRoleForm(props: Props<IRoleModel>) {

  const {entityDetailValues, setEntityDetailValues, selectUrlParam, setSelectUrlParam, formTitle, setFormTitle} = usePageData()

  const initialFormValue: IRoleModel = {
    id: props.role ? props.role!.id : '',
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
                <h2>{formTitle+" User Role"}</h2>
                <div
                  className='btn btn-sm btn-icon btn-active-color-primary'
                  data-bs-dismiss='modal' 
                >
                  <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
                </div>
              </div>

              <div className='modal-body' >
              {props.showForm && 
                <Grid container className={classes.root}>
                  <Grid item xs={6}>
                    {/* <IrisTextInput type='text' name='id' label='Role Id' /> */}
                    <IrisTextInput type='text' name='name' label='Role Name' />
                  </Grid>
                </Grid>
                }
                {!props.showForm && <Alert severity="info">Role Created Successfully!</Alert>}
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
                <Button
                  floated='right'
                  positive
                  type='button'
                  data-bs-dismiss='modal'
                  content='Cancel'
                ></Button>
              </Modal.Footer>
            </div>
          </div>
        </Form>
      </Formik>
    </>
  )
}
