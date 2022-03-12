import {Modal} from 'react-bootstrap-v5'
import {Button} from 'semantic-ui-react'
import {KTSVG} from '../../../../_iris/helpers'
import {Formik, Form, FormikHelpers} from 'formik'
import * as Yup from 'yup'
import IrisTextInput from '../../layout/forms/IrisTextInput'
import IrisSelectInput from '../../layout/forms/IrisSelectInput'
import {IPriceModel} from '../ShipmentModels/ShipmentInterfaces'
import { usePageData } from '../../../../_iris/layout/core'
import { Alert } from '@mui/material'
import { Grid } from '@material-ui/core'
import useStyles from '../../layout/formstyles/FormStyle'
import { useState } from 'react'
import ErrorAlert from '../../common/ErrorAlert'

// interface Props {
//   userVal: IUserModel
// }

interface Props<Values> {
  onSubmit: (values: Values, formikHelpers: FormikHelpers<Values>) => void | Promise<any>
  isSubmitting: boolean
  price?: IPriceModel
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

export default function AddPriceForm(props: Props<IPriceModel>) {
  const {entityValues,
         setEntityValues, 
         selectUrlParam, 
         setSelectUrlParam, 
         formTitle, 
         setFormTitle} = usePageData()

  const [errorMessage, setErrorMessage] = useState('')
  const [showError, setShowError] = useState(true)

  const initialFormValue: IPriceModel = {
    
    category: props.price ? props.price!.category : 2,
    routeId: props.price ? props.price!.routeId : '',
    unitWeight: props.price ? props.price!.unitWeight : 3,
    pricePErUnit: props.price ? props.price!.pricePErUnit : 300,
  }

  const validationSchema = Yup.object({
    
    category: Yup.number().required(),
    routeId: Yup.string().required(),
    unitWeight: Yup.number().required(),
    pricePErUnit: Yup.number().required(),
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
                <h2>{formTitle+" Price Item"}</h2>
                <div
                  className='btn btn-sm btn-icon btn-active-color-primary'
                  data-bs-dismiss='modal'
                >
                  <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
                </div>
              </div>
              <div className='modal-body' >
                {props.showError && <ErrorAlert type={'danger'} message={props.errorMessage!.toString()} heading={'Oh snap! You got an error!'} />}
                {props.showForm && (
                  <Grid container className={classes.root}>
                    <Grid item xs={6}>
                      <IrisTextInput
                        type='text'
                        placeholder='RouteId'
                        name='routeId'
                        label='RouteId'
                      />

                    </Grid>
                    <Grid item xs={6}>
                      <IrisTextInput
                        type='number'
                        placeholder='UnitWeight'
                        name='unitWeight'
                        label='UnitWeight'
                      />
                      <IrisTextInput
                        type='number'
                        placeholder='PricePErUnit'
                        name='pricePErUnit'
                        label='PricePErUnit'
                      />
                      <IrisTextInput
                        type='text'
                        placeholder='category'
                        name='category'
                        label='Category'
                      />
                    </Grid>
                  </Grid>
                )}
                {!props.showForm && <ErrorAlert type={'success'} message={'Price Created Successfully!'} heading={'Confirmation Message!'} />}
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
