import {Modal} from 'react-bootstrap-v5'
import {Button} from 'semantic-ui-react'
import {Formik, Form, Field, ErrorMessage, FormikHelpers} from 'formik'
import * as Yup from 'yup'
import {KTSVG} from '../../../../_iris/helpers'
import IrisTextInput from '../../layout/forms/IrisTextInput'
import IrisSelectInput from '../../layout/forms/IrisSelectInput'
import {ITrackHistoryModel, ITripModel} from '../Monitor models/MonitorInterface'
import IrisDatePicker from '../../layout/forms/IrisDatePicker'
import {usePageData} from '../../../../_iris/layout/core'
import {Alert, FormControl} from '@mui/material'
import {Divider, Grid, TextField} from '@material-ui/core'
import useStyles from '../../layout/formstyles/FormStyle'
import {useEffect, useState} from 'react'
import ErrorAlert from '../../common/ErrorAlert'
// import PlacesAutocomplete, {
//   geocodeByAddress,
//   geocodeByPlaceId,
//   getLatLng,
// } from 'react-places-autocomplete'
import agent from '../../../../setup/axios/AxiosAgent'
import {
  OptionValue,
  TripActionAndStatusVm,
} from '../../shipmentmanagement/ShipmentModels/ShipmentInterfaces'

interface Props<Values> {
  onSubmit: (values: Values, formikHelpers: FormikHelpers<Values>) => void | Promise<any>
  isSubmitting: boolean
  trackHistory?: ITrackHistoryModel
  showForm?: boolean
  formTitle?: string
  showError?: boolean
  errorMessage?: string
  handleClick?: () => void
}

export default function AddTrackHistoryForm(props: Props<ITrackHistoryModel>) {
  const [address, setAddress] = useState('')
  const [coordinates, setCoordinates] = useState({lat: null, lng: null})
  // const [address, setAddress] = useState("")
  const {
    entityValues,
    setEntityValues,
    selectUrlParam,
    setSelectUrlParam,
    formTitle,
    setFormTitle,
  } = usePageData()

  const [errorMessage, setErrorMessage] = useState('')
  const [showError, setShowError] = useState(true)
  const [actionAndStatus, setActionAndStatus] = useState<TripActionAndStatusVm>()
  const [tripDetails, setTripDetails] = useState<ITripModel[]>()
  const [loadingData, setLoadingData] = useState(true)  

  const initialFormValue: ITrackHistoryModel = {
    id: props.trackHistory ? props.trackHistory!.id : '',
    tripReference: props.trackHistory ? props.trackHistory!.tripReference : '',
    action: props.trackHistory ? props.trackHistory!.action : '',
    location: props.trackHistory ? props.trackHistory!.location : '',
    timeStamp: props.trackHistory ? props.trackHistory!.timeStamp : '',
    status: props.trackHistory ? props.trackHistory!.status : '',
  }

  // const handleSelect = async (value: string) => {
  //   const results = await geocodeByAddress(value)
  //   const resVal = getLatLng(results[0]).then((data) => {da
  //     console.log(resVal)
  //   })
  // }

  const searchRef = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value
    setTimeout(async () => {
      await agent.Trip.searchTripByRef(searchValue).then((response) => {
        setTripDetails(response)
      })
    }, 300)
  }

  // //USE EFFECT HOOK
  useEffect(() => {
    const callFunc = async () => {
      await agent.Trip.GetActionAndStatus().then((response) => {
        setActionAndStatus(response)
      })
    }
    if (loadingData) {
      callFunc()
    }
  }, [])

  const validationSchema = Yup.object({
    tripReference: Yup.string().required(),
    action: Yup.string().required(),
    location: Yup.string().required(),
    // timeStamp: Yup.string().required(),
    status: Yup.string().required(),
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
                <h2>{'Register Track Information'} </h2>
                <div
                  className='btn btn-sm btn-icon btn-active-color-primary'
                  data-bs-dismiss='modal'
                >
                  <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
                </div>
              </div>

              <div className='modal-body'>
                <div className='row'>
                  <div className='col'>
                    <IrisTextInput
                      type='text'
                      name='tripReference'
                      label='Trip'
                      onChange={searchRef}
                    />
                  </div>
                  <div className='col'>
                    <a className='btn btn-primary'>Generate GroupWay Code</a>
                  </div>
                </div>
                {props.showError && (
                  <ErrorAlert
                    type={'danger'}
                    message={props.errorMessage!.toString()}
                    heading={'Oh snap! You got an error!'}
                  />
                )}
                {props.showForm && (
                  <Grid container className={classes.root}>
                    <Grid item xs={12}></Grid>
                    <Divider />
                    <Grid item xs={12}>
                      {/* <IrisTextInput type='text' name='action' label='Action' /> */}
                      <FormControl sx={{m: 1, width: '90%'}}>
                        <Field as='select' name='action' className='form-control'>
                          <option value='red'>Select</option>
                          {actionAndStatus?.actions.length &&
                            actionAndStatus?.actions.map((item, index) => {
                              return (
                                <option key={index} value={item.name}>
                                  {item.value}
                                </option>
                              )
                            })}
                        </Field>
                        <ErrorMessage name='action' />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <IrisTextInput type='text' name='location' label='Location' />
                      {/* <IrisTextInput type='text' name='status' label='Status' /> */}
                      <FormControl sx={{m: 1, width: '90%'}}>
                        <Field as='select' name='status' className='form-control'>
                          <option>Select Status</option>
                          {actionAndStatus?.status.length &&
                            actionAndStatus?.status.map((item, index) => {
                              return (
                                <option key={index} value={item.name}>
                                  {item.value}
                                </option>
                              )
                            })}
                        </Field>
                        <ErrorMessage name='status' />
                      </FormControl>

                      {/* <div>
                        <PlacesAutocomplete
                          value={address}
                          onChange={setAddress}
                          onSelect={handleSelect}
                        >
                          {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
                            <div>
                              <input
                                {...getInputProps({
                                  placeholder: 'Search Places ...',
                                  className: 'location-search-input, form-control form-control-lg',
                                  style:{width:'90%', marginTop:'23px'}
                                })}
                              />
                              <div className='autocomplete-dropdown-container'>
                                {loading && <div>Loading...</div>}
                                {suggestions.map((suggestion) => {
                                  
                                  const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item'
                                  // inline style for demonstration purpose
                                  const style = suggestion.active ? {backgroundColor: '#fafafa', cursor: 'pointer'}
                                    : {backgroundColor: '#ffffff', cursor: 'pointer'}
                                  return (
                                    <div key={suggestion.description}> 
                                      <span {...getSuggestionItemProps(suggestion, { className, style})}>{suggestion.description}</span> 
                                    </div>
                                  )
                                })}
                              </div>
                            </div>
                          )}
                        </PlacesAutocomplete>
                      </div> */}
                    </Grid>
                  </Grid>
                )}
                {!props.showForm && (
                  <ErrorAlert
                    type={'success'}
                    message={'Track History Created Successfully!'}
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
                    content='Register'
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
