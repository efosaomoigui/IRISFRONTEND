import {Grid} from '@material-ui/core'
import {Alert} from '@mui/material'
import {Form, Formik, FormikHelpers} from 'formik'
import { useState } from 'react'
import {Modal} from 'react-bootstrap-v5'
import {Button} from 'semantic-ui-react'
import * as Yup from 'yup'
import {KTSVG} from '../../../../_iris/helpers'
import {usePageData} from '../../../../_iris/layout/core'
import ErrorAlert from '../../common/ErrorAlert'
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

export default function AddCollectionForm(props: Props<IFulfilmentModel>) {
  const {
    entityDetailValues,
    setEntityDetailValues,
    selectUrlParam,
    setSelectUrlParam,
    formTitle,
    setFormTitle,
  } = usePageData()

  const [errorMessage, setErrorMessage] = useState('')
  const [showError, setShowError] = useState(true)

  const initialFormValue: IFulfilmentModel = {
    shipmentId: props.collectionCenter ? props.collectionCenter!.shipmentId : '',
    shipment: props.collectionCenter ? props.collectionCenter!.shipment : '',
    collectionStatus: props.collectionCenter ? props.collectionCenter!.collectionStatus : true,
    userId: props.collectionCenter ? props.collectionCenter!.userId : '',
  }

  const validationSchema = Yup.object({
    shipmentId: Yup.string().required(),
    shipment: Yup.string().required(),
    collectionStatus: Yup.boolean().required(),
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
        <Form className='ui form' autoComplete='off'>
          <div className='modal-dialog modal-dialog-centered mw-900px'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h2>{'Add Collection Center'}</h2>
                <div
                  className='btn btn-sm btn-icon btn-active-color-primary'
                  data-bs-dismiss='modal'
                >
                  <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
                </div>
              </div>

              <div className='modal-body'>
                {props.showError && <ErrorAlert type={'danger'} message={props.errorMessage!.toString()} heading={'Oh snap! You got an error!'} />}
                {props.showForm && (
                  <Grid container className={classes.root}>
                    <Grid item xs={6}>
                      <IrisTextInput
                        type='text'
                        placeholder='ShipmentId'
                        name='shipmentId'
                        label='ShipmentId'
                      />
                      <IrisTextInput type='text' name='shipment' label='shipment' />
                    </Grid>

                    <Grid item xs={6}>
                      <IrisTextInput
                        type='boolean'
                        name='collectionStatus'
                        label='CollectionStatus'
                      />
                      <IrisTextInput type='text' name='userId' label='UserId' />
                    </Grid>
                  </Grid>
                )}
                {!props.showForm && <ErrorAlert type={'success'} message={'Collection Center Created Successfully!'} heading={'Confirmation Message!'} />}
              </div>

              <div className='modal-body py-lg-10 px-lg-10'></div>

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
