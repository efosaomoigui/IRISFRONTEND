import {Grid} from '@material-ui/core'
import {Alert} from '@mui/material'
import {Form, Formik, FormikHelpers} from 'formik'
import {Modal} from 'react-bootstrap-v5'
import {Button} from 'semantic-ui-react'
import * as Yup from 'yup'
import {boolean} from 'yup/lib/locale'
import {KTSVG} from '../../../../_iris/helpers'
import {usePageData} from '../../../../_iris/layout/core'
import IrisDatePicker from '../../layout/forms/IrisDatePicker'
import IrisSelectInput from '../../layout/forms/IrisSelectInput'
import IrisTextInput from '../../layout/forms/IrisTextInput'
import useStyles from '../../layout/formstyles/FormStyle'
import {IWalletModel} from '../Models/WalletInterfaces'

interface Props<Values> {
  onSubmit: (values: Values, formikHelpers: FormikHelpers<Values>) => void | Promise<any>
  isSubmitting: boolean
  wallet?: any //change here by Mr Efe
  showForm?: boolean
  handleEdit?: () => void
  handleClick?: () => void
  formTitle?: string
}

export default function EditWalletForm(props: Props<IWalletModel>) {
  const {
    entityValues,
    setEntityValues,
    selectUrlParam,
    setSelectUrlParam,
    formTitle,
    setFormTitle,
    selectValue,
    handleSelectValue, 
  } = usePageData()

  const initialFormValue: IWalletModel = {
    id: props.wallet ? props.wallet!.id : '',
    number: props.wallet ? props.wallet!.number : '',
    isActive: props.wallet ? props.wallet!.isActive : '',
    userId: props.wallet ? props.wallet!.userId : '',
    walletBalance: props.wallet ? props.wallet!.walletBalance : 0
  }

  const validationSchema = Yup.object({
    id: Yup.string().required(),
    number: Yup.string().required(),
    isActive: Yup.string().required(),
    userId: Yup.string().required(),
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
         {({}) => (
        <Form>
          <div className='modal-dialog modal-dialog-centered mw-900px'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h2>{'Edit Wallet'}</h2>
                <div
                  className='btn btn-sm btn-icon btn-active-color-primary'
                  data-bs-dismiss='modal'
                >
                  <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
                </div>
              </div>

              <div className='modal-body'>
                {props.showForm && (
                  <Grid container className={classes.root}>
                    <Grid item xs={6}>
                      <IrisTextInput
                        type='text'
                        name='id'
                        placeholder='WalletId'
                        label='WalletId'
                      />
                      <IrisTextInput
                        type='text'
                        placeholder='Wallet Number'
                        name='number'
                        label='Wallet Number'
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <IrisTextInput
                        type='boolean'
                        placeholder='Active'
                        name='isActive'
                        label='Active'
                      />
                      <IrisTextInput
                        type='text'
                        placeholder='UserId'
                        name='userId'
                        label='UserId'
                      />
                    </Grid>
                  </Grid>
                )}
                {!props.showForm && <Alert severity='info'>Wallet Created Successfully!</Alert>}
              </div>
              <div className='modal-body py-lg-10 px-lg-10'></div>

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
         )}
      </Formik>
    </>
  )
}
