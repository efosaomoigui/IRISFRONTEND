import { Grid } from '@material-ui/core'
import { Alert } from '@mui/material'
import { Form, Formik, FormikHelpers } from 'formik'
import { Modal } from 'react-bootstrap-v5'
import { Button } from 'semantic-ui-react'
import * as Yup from 'yup'
import agent from '../../../../setup/axios/AxiosAgent'
import { KTSVG } from '../../../../_iris/helpers'
import { usePageData } from '../../../../_iris/layout/core'
import { IPermissionModel, IRoleModel } from '../../auth/models/AuthInterfaces'
import ErrorAlert from '../../common/ErrorAlert'
import IrisSelectInput from '../../layout/forms/IrisSelectInput'
import { dataType, IrisSelectInput2 } from '../../layout/forms/IrisSelectInput2'
import IrisTextInput from '../../layout/forms/IrisTextInput'
import useStyles from '../../layout/formstyles/FormStyle'


interface Props<Values> {
  onSubmit: (values: Values, formikHelpers: FormikHelpers<Values>) => void | Promise<any>
  isSubmitting: boolean
  permission?: IPermissionModel //change here by Mr Efe
  systemRoles?: IRoleModel[] //change here by Mr Efe
  showForm?: boolean
  formTitle?: string
  showError?: boolean
  errorMessage?: string
  handleClick?: () => void
}

export default function EditPermissionForm(props: Props<IPermissionModel>) {
  const {
    entityDetailValues,
    setEntityDetailValues,
    selectUrlParam,
    setSelectUrlParam,
    formTitle,
    setFormTitle,
  } = usePageData()

  const initialFormValue: IPermissionModel = {
    roleId: props.permission ? props.permission!.roleId : '',
    claimType: props.permission ? props.permission!.claimType : '',
    claimValue: props.permission ? props.permission!.claimValue : '',
  }

  const validationSchema = Yup.object({
    id: Yup.number().required(),
    roleId: Yup.string().required(),
    claimType: Yup.string().required(),
    claimValue: Yup.string().required(),
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
        <Form className='ui form' autoComplete='off'>
          <div className='modal-dialog modal-dialog-centered mw-900px'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h2>{'Edit Role Permission'} </h2>
                <div
                  className='btn btn-sm btn-icon btn-active-color-primary'
                  data-bs-dismiss='modal'
                >
                  <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
                </div>
              </div>

              {/* {console.log("new what? ", props.systemRoles)} */}

              <div className='modal-body'>
                {props.showForm && (
                  <Grid container className={classes.root}>
                    <Grid item xs={6}>
                      {/* <IrisTextInput type='text' name='id' label='Role Id' /> */}
                      <IrisTextInput name='roleId' label='RoleId' placeholder={'Role'} />
                      <IrisTextInput type='text' name='claimType' label='Permission Type' />
                      <IrisTextInput type='text' name='claimValue' label='Permission' />
                    </Grid>
                  </Grid>
                )}
                {!props.showForm && <ErrorAlert type={'success'} message={'Permission Created Successfully!'} heading={'Confirmation Message!'} />}
              </div>

              {/* Are you there? */}

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
                  type='reset'
                  variant='primary'
                  onClick={props.handleClick}
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
