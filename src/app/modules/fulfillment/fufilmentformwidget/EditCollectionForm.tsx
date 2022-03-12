import {Grid} from '@material-ui/core'
import {Alert} from '@mui/material'
import {Form, Formik, FormikHelpers} from 'formik'
import {Modal} from 'react-bootstrap-v5'
import {Button} from 'semantic-ui-react'
import * as Yup from 'yup'
import {KTSVG} from '../../../../_iris/helpers'
import {usePageData} from '../../../../_iris/layout/core'
import IrisTextInput from '../../layout/forms/IrisTextInput'
import useStyles from '../../layout/formstyles/FormStyle'
import {IFulfilmentModel} from '../models/FulfilmentInterface'

// interface Props {
//   userVal: IUserModel
// }

interface Props<Values> {
  onSubmit: (values: Values, formikHelpers: FormikHelpers<Values>) => void | Promise<any>
  isSubmitting: boolean
  collectionCenter?: IFulfilmentModel
  showForm?: boolean
  formTitle?: string
  showError?: boolean
  errorMessage?: string
  handleClick?: () => void
}

const options = [
  {text: 'one', value: 'Bag'},
  {text: 'two', value: 'Serial'},
  {text: 'three', value: 'Turkey'},
  {text: 'four', value: 'Afganistan'},
]

export default function EditCollectionForm(props: Props<IFulfilmentModel>) {
  const {
    entityValues,
    setEntityValues,
    selectUrlParam,
    setSelectUrlParam,
    formTitle,
    setFormTitle,
  } = usePageData()

  const initialFormValue: IFulfilmentModel = {
    Id: props.collectionCenter ? props.collectionCenter!.Id : '',
    ShipmentId: props.collectionCenter ? props.collectionCenter!.ShipmentId : '',
    Shipment: props.collectionCenter ? props.collectionCenter!.Shipment : '',
    CollectionStatus: props.collectionCenter ? props.collectionCenter!.CollectionStatus : true,
    UserId: props.collectionCenter ? props.collectionCenter!.UserId : '',
  }

  const validationSchema = Yup.object({
    Id: Yup.string().required(),
    ShipmentId: Yup.string().required(),
    Shipment: Yup.string().required(),
    CollectionStatus: Yup.boolean().required(),
    UserId: Yup.string().required(),
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
                <h2>{formTitle + ' Trip Dispatch'}</h2>
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
                      {/* <IrisTextInput type='text' name='id' label='Role Id' /> */}
                      {/* <IrisTextInput type='text' name='name' label='Role Name' /> */}
                      <IrisTextInput type='text' name='Id' label='Id' />
                      <IrisTextInput
                        type='text'
                        placeholder='ShipmentId'
                        name='ShipmentId'
                        label='ShipmentId'
                      />
                    </Grid>

                    <Grid item xs={6}>
                      {/* <IrisTextInput type='text' name='id' label='Role Id' /> */}
                      {/* <IrisTextInput type='text' name='name' label='Role Name' /> */}
                      <IrisTextInput
                        type='boolean'
                        name='CollectionStatus'
                        label='CollectionStatus'
                      />
                      <IrisTextInput type='text' name='UserId' label='UserId' />
                    </Grid>
                  </Grid>
                )}
                {!props.showForm && (
                  <Alert severity='info'>Collection Center Item Created Successfully!</Alert>
                )}
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
                />
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
