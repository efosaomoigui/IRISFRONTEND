import { Form, Formik, FormikHelpers } from 'formik'
import { Modal } from 'react-bootstrap-v5'
import { Button } from 'semantic-ui-react'
import * as Yup from 'yup'
import { KTSVG } from '../../../../_iris/helpers'
import { IPermissionModel } from '../../auth/models/AuthInterfaces'
import IrisSelectInput from '../../layout/forms/IrisSelectInput'
import IrisTextInput from '../../layout/forms/IrisTextInput'




// interface Props {
//   userVal: IUserModel
// }

interface Props<Values> {
  onSubmit: (values: Values, formikHelpers: FormikHelpers<Values>) => void | Promise<any>
  isSubmitting: boolean
  permission?: IPermissionModel  //change here by Mr Efe
}

export default function AddPermissionForm(props: Props<IPermissionModel>) {
  const initialFormValue: IPermissionModel = {
  roleId: props.permission ? props.permission!.roleId : '',
    claimType: props.permission ? props.permission!.claimType : '',
    claimValue: props.permission ? props.permission!.claimValue : ''
  }

  const validationSchema = Yup.object({
    roleId: Yup.string().required(),
    claimType: Yup.string().required(),
    claimValue: Yup.string().required(),
  })

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
                <h2>Add Permission</h2>
                <div
                  className='btn btn-sm btn-icon btn-active-color-primary'
                  data-bs-dismiss='modal'
                >
                  <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
                </div>
              </div>

              <div className='modal-body py-lg-10 px-lg-10'>
                <IrisTextInput
                  type='text'
                  name='roleId'
                  placeholder='RoleId'
                  label='RoleId'
                />
                <IrisTextInput
                  type='text'
                  placeholder='Permission Type'
                  name='claimType'
                  label='Permission Type'
                />
                <IrisTextInput
                  type='text'
                  placeholder='Permission'
                  name='claimValue'
                  label='Permission'
                />

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
                <Button floated='right' positive type='button' data-bs-dismiss="modal" content='Cancel'></Button>
              </Modal.Footer>
            </div>
          </div>
        </Form>
      </Formik>
    </>
  )
}
