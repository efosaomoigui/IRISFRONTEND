import {Modal} from 'react-bootstrap-v5'
import {Button} from 'semantic-ui-react'
import {KTSVG} from '../../../../_iris/helpers'
import {Formik, Form, FormikHelpers, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import IrisTextInput from '../../layout/forms/IrisTextInput'
import IrisSelectInput from '../../layout/forms/IrisSelectInput'
import {IPriceModel, IRouteModel} from '../ShipmentModels/ShipmentInterfaces'
import {usePageData} from '../../../../_iris/layout/core'
import {Alert} from '@mui/material'
import {Grid} from '@material-ui/core'
import useStyles from '../../layout/formstyles/FormStyle'
import ErrorAlert from '../../common/ErrorAlert'
import {useEffect, useState} from 'react'
import agent from '../../../../setup/axios/AxiosAgent'

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

export default function EditPriceForm(props: Props<IPriceModel>) {
  const {
    entityValues,
    selectUrlParam,
    setSelectUrlParam,
    formTitle,
    setFormTitle,
    selectValue,
    handleSelectValue,
  } = usePageData()

  const [loadingData, setLoadingData] = useState(true)
  const [routemodel, setRouteModel] = useState<IRouteModel[]>([])

  const initialFormValue: IPriceModel = {
    id: props.price ? props.price!.id : '',
    category: props.price ? props.price!.category : 0,
    routeId: props.price ? props.price!.routeId : '',
    unitWeight: props.price ? props.price!.unitWeight : 0,
    pricePerUnit: props.price ? props.price!.pricePerUnit : 0,
    product: props.price ? props.price!.product : 0,
  }

  // console.log('INIT: ', props.price!.pricePerUnit)

  const unitWeight = [
    {optionValue: 0, optionLabel: 'Select Unit Weight'},
    {optionValue: 1, optionLabel: 1},
    {optionValue: 10, optionLabel: 10},
    {optionValue: 15, optionLabel: 15},
    {optionValue: 30, optionLabel: 30},
  ]
  const category = [
    {optionValue: 0, optionLabel: 'Select Category'},
    {optionValue: 1, optionLabel: 'Mail And Parcel'},
    {optionValue: 2, optionLabel: 'Truck Load'},
    {optionValue: 3, optionLabel: 'International Frieght'},
  ]

  const product = [
    {optionValue: '', optionLabel: 'Select Product Type'},
    {optionValue: 1, optionLabel: 'MailAndParcel'},
    {optionValue: 2, optionLabel: 'Tomatoes'},
    {optionValue: 3, optionLabel: 'Vedan'},
    {optionValue: 4, optionLabel: 'Noodles'},
    {optionValue: 5, optionLabel: 'Flour'},
    {optionValue: 6, optionLabel: 'Cowbell'},
    {optionValue: 7, optionLabel: 'Nestle'},
    {optionValue: 8, optionLabel: 'Bigi'},
  ]

  const validationSchema = Yup.object({
    
    category: Yup.number().required(),
    routeId: Yup.string().required(),
    unitWeight: Yup.number().required(),
    pricePerUnit: Yup.string().required(),
    product: Yup.string().required(),
  })

  //USE EFFECT HOOK
  useEffect(() => {
    const callFunc = async () => {
      await agent.Route.list().then((response) => {
        setRouteModel(response)
        setLoadingData(false)
      })
    }
    if (loadingData) {
      callFunc()
    }
  }, [])

  const classes = useStyles()

  return (
    <>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialFormValue}
        enableReinitialize
        onSubmit={props.onSubmit}
      >
        {({values, setFieldValue}) => (
          <Form className='ui form' autoComplete='off'>
            <div className='modal-dialog modal-dialog-centered mw-900px'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h2>{'Edit Price Item'}</h2>
                  <div
                    className='btn btn-sm btn-icon btn-active-color-primary'
                    data-bs-dismiss='modal'
                  >
                    <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
                  </div>
                </div>
                <div className='modal-body'>
                  {props.showError && (
                    <ErrorAlert
                      type={'danger'}
                      message={props.errorMessage!.toString()}
                      heading={'Oh snap! You got an error!'}
                    />
                  )}
                  {props.showForm && (
                    <Grid container className={classes.root}>
                      <Grid item xs={6}>
                        <div className='col-11'>
                          <Field as='select' name='routeId' className='form-select'>
                            {routemodel.length &&
                              routemodel.map((route, index) => {
                                return (
                                  <option key={index} value={route.routeId}>
                                    {route.routeName}
                                  </option>
                                )
                              })}
                          </Field>
                          <div className='text-danger mt-2'>
                            <ErrorMessage name='routeId' />
                          </div>
                        </div>

                        <div className='col-11 mt-5'>
                          <Field as='select' name='product' className='form-select' label='Product'>
                            {product.length &&
                              product.map((unit, index) => {
                                return (
                                  <option key={index} value={unit.optionValue}>
                                    {unit.optionLabel}
                                  </option>
                                )
                              })}
                          </Field>

                          <div className='text-danger mt-2'>
                            <ErrorMessage name='product' />
                          </div>
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <div className='col-11'>
                          <Field as='select' name='unitWeight' className='form-select'>
                            {unitWeight.length &&
                              unitWeight.map((unit, index) => {
                                return (
                                  <option key={index} value={unit.optionValue}>
                                    {unit.optionLabel}
                                  </option>
                                )
                              })}
                          </Field>
                          <div className='text-danger mt-2'>
                            <ErrorMessage name='unitWeight' />
                          </div>
                        </div>
                        <IrisTextInput
                          type='number'
                          placeholder='PricePerUnit'
                          name='pricePerUnit'
                          label='PricePerUnit'
                        />
                        <div className='col-11 mt-5'>
                          <Field
                            as='select'
                            name='category'
                            className='form-select'
                            label='Category'
                          >
                            {category.length &&
                              category.map((unit, index) => {
                                return (
                                  <option key={index} value={unit.optionValue}>
                                    {unit.optionLabel}
                                  </option>
                                )
                              })}
                          </Field>

                          <div className='text-danger mt-2'>
                            <ErrorMessage name='category' />
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                  )}
                  {!props.showForm && (
                    <ErrorAlert
                      type={'success'}
                      message={'Price Created Successfully!'}
                      heading={'Confirmation Message!'}
                    />
                  )}
                </div>
                <div className='modal-body py-lg-10 px-lg-10'></div>

                <Modal.Footer>
                  {props.showForm && (
                    <Button
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
        )}
      </Formik>
    </>
  )
}
