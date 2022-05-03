/* eslint-disable jsx-a11y/anchor-is-valid */
import {Autocomplete, TextField} from '@mui/material'
import React, {useEffect, useState} from 'react'
import {shallowEqual, useSelector} from 'react-redux'
import {toast} from 'react-toastify'
import {Button} from 'semantic-ui-react'
import {RootState} from '../../../../../setup'
import agent from '../../../../../setup/axios/AxiosAgent'
import {KTSVG} from '../../../../../_iris/helpers'
import {Dropdown1} from '../../../../../_iris/partials/content/dropdown/Dropdown1'
import {FleetType, IFleetModel2, IUserModel, IUserModel2} from '../../../auth/models/AuthInterfaces'
import {IBaseTripModel, ITripModel} from '../../../monitoring/Monitor models/MonitorInterface'
import {AddUserModal2} from '../../../usermanagement/modals/AddUserModal2'
import {FaArrowCircleDown} from 'react-icons/fa'
import {GrRefresh} from 'react-icons/gr'
import {top100Films} from './top100Films'
import {
  IBaseGroupWayBillModel,
  IFleetModel,
  IGroupWayBillModel,
  IManifestModel,
  IRouteModel,
} from '../../ShipmentModels/ShipmentInterfaces'
import {CarrierDropdown} from './CarrierDropdown'
import {DriverDropdown} from './DriverDropdown'
import listdata from './listdata.json'
import {useRowSelect} from 'react-table'
import {AddFleetModal1} from '../../modals/AddFleetModal1'

type Props = {
  className: string
  listItems: ITripModel[]
}

const TripDispatch: React.FC<Props> = ({className, listItems}) => {
  const [list, setList] = useState(listItems)
  const [listBag, setListBag] = useState<IBaseTripModel[]>([])
  const [listDataValue, setListDataVal] = useState<ITripModel[]>([])
  const [routemodel, setRouteModel] = useState<IRouteModel[]>([])
  const [loadingData, setLoadingData] = useState(true)
  const [dispatchCode, setDispatchCode] = useState('')
  const [routeId, setRouteId] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [showError, setShowError] = useState(false)
  const [drivers, setDrivers] = useState<IUserModel2[]>([])
  const [driver, setDriver] = useState<IUserModel2 | null>(null)
  const [fleet, setFleet] = useState<IFleetModel | null>(null)
  const [fleets, setFleets] = useState<IFleetModel[]>([])
  const [reloadingUser, setReloadingUser] = useState(false)

  const add = (manifestCode: string) => {
    const newList = list.filter((item) => item.manifestCode !== manifestCode)
    const itemAdded = list.filter((item) => item.manifestCode === manifestCode)
    setList(newList)
    if (checkListDuplicate(manifestCode) === false) listBag.push(itemAdded[0])
    setListBag(listBag)
  }

  const addAll = () => {
    // eslint-disable-next-line array-callback-return
    list.map((item) => {
      listBag.push(item)
    })
    setListBag(listBag)
    setList([])
  }

  const removeItem = (manifestCode: string) => {
    const newList = listBag.filter((item) => item.manifestCode !== manifestCode)
    const itemRemoved = listBag.filter((item) => item.manifestCode === manifestCode)
    setListBag(newList)
    list.push(itemRemoved[0])
    // if (checkListDuplicate(manifestCode) === false) list.push(itemRemoved[0])
    setList(list)
  }

  const checkListDuplicate = (manifestCode: string) => {
    const newList = listBag.filter((item) => item.manifestCode === manifestCode)
    if (Object.keys(newList).length > 0) {
      return true
    }
    return false
  }

  const removeAll = () => {
    // eslint-disable-next-line array-callback-return
    listBag.map((item) => {
      list.push(item)
    })
    setListBag([])
    setList(list)
  }

  const getDispatchCode = async () => {
    await agent.Trip.GetDispatchCode().then((response) => {
      setDispatchCode(response)
    })
  }

  const listDataVal: IBaseGroupWayBillModel[] = []
  const destinationCheckArray: string[] = []

  const user: IUserModel = useSelector<RootState>(({auth}) => auth.user, shallowEqual) as IUserModel

  const fillListItems = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    var routeid = event.target.value
    setRouteId(routeid)
    // eslint-disable-next-line array-callback-return
    await agent.Manifest.GetManifestByRouteId(routeid).then((response) => {
      response.map((item) => {
        let itemObj: ITripModel = {
          manifestCode: item.manifestCode,
          destination: item.destination,
        }
        listDataVal.push(itemObj)
        // destinationCheckArray.push(routeid)
      })
      setList(listDataVal)
    })
  }

  //Reload User
  const reloadUsers = async () => {
    loadUsers()
  }

    //Reload User
    const reloadFleet = async () => {
      loadFleet()
    }
  

  const loadUsers = async () => {
    const val = await agent.Users.list().then((response) => {
      const autoVals = response.map((option, index) => ({
        id: option.id,
        label: option.firstName + ' ' + option.lastName + ' (' + option.phoneNumber + ')',
        userId: option.userId,
        username: option.username,
        firstName: option.firstName,
        lastName: option.firstName,
        email: option.email,
        phoneNumber: option.phoneNumber,
      }))
      setDrivers(autoVals)
    })
  }

  const loadFleet = async () => {
    const val = await agent.Fleet.list().then((response) => {
      const autoVals = response.map((option, index) => ({
        fleetId: option.fleetId,
        label: option.fleetMake + ' ' + option.fleetModel + ' (' + option.chassisNumber + ')',
        fleetType: option.fleetType,
        chassisNumber: option.chassisNumber,
        status: option.status,
        capacity: option.capacity,
        fleetModel: option.fleetModel,
        fleetMake: option.fleetMake,
        ownerId: option.ownerId,
        ownerName: option.ownerName, 
      }))
      setFleets(autoVals)
    })
  }

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
      loadUsers()
      loadFleet()
    }
  }, [])

  const Save = () => {
    // alert(FleetType[fleet!.fleetType])
    fleet!.fleetType = Number(FleetType[fleet!.fleetType])
    fleet!.status = true
    const values: ITripModel = {
      manifestList: listBag,
      tripReference: dispatchCode,
      // departure:list[0].departure,
      // destination:list[0].destination,
      fleet:fleet?.fleetId,
      driver:driver?.userId,
      fleetObj:fleet!,
      driverObj:driver!,
      RouteCode: routeId, 
    }

    agent.Trip.create(values).then((response) => {
      if (response.validationErrors!.length > 0) {
        toast.error(response.validationErrors?.toString())
        setErrorMessage(response.validationErrors!.toString())
        setIsSubmitting(false)
        setShowError(true)
      } else {
        toast.success('Dispatch |Registered Successful!')
        setInterval(() => {
          setShowForm(false)
        }, 1000)
        setListBag([])
        setIsSubmitting(false)
        setShowError(false)
      }
    })
  }

  return (
    <>
      <div className='alert alert-light' role='alert'>
        <div>
          <h3>Trip Dispatch / Movement Options </h3>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <select
            className='form-select mb-5'
            aria-label='Default select example'
            onChange={fillListItems}
          >
            <option>Select A Destination</option>
            {routemodel.length &&
              routemodel.map((route, index) => {
                return (
                  <option key={index} value={route.routeId}>
                    {route.destination}
                  </option>
                )
              })}
          </select>
        </div>
        <div className='col'>
          <a className='btn btn-primary' onClick={getDispatchCode}>
            Generate Dispatch Code
          </a>
          {console.log("Fleets ",fleets)}
        </div>
      </div>
      <div className='row'>
        <div className='col'></div>
        <div className='col'></div>
      </div>
      <div className='row'>
        <div className='col-xxl-4'>
          <div className={`card ${className}`}>
            {/* begin::Header */}
            <div className='card-header border-0'>
              <h3 className='card-title fw-bolder text-dark'>Carrier/Fleet Details</h3>
              <div className='card-toolbar'>
                {/* begin::Menu */}
                <button
                  type='button'
                  className='btn btn-sm btn-icon btn-color-primary btn-active-light-primary'
                  data-bs-toggle='modal'
                  data-bs-target={'#kt_modal_addfleet1'}
                >
                  <KTSVG path='/media/icons/duotune/general/gen024.svg' className='svg-icon-2' />
                  Add
                </button>
                {/* <CarrierDropdown /> */}
                {/* end::Menu */}
              </div>
            </div>
            {/* end::Header */}
            {/* begin::Body */}
            <div className='card-body pt-2'>
              <div className='d-flex align-items-center mb-8'>
                <div className='flex-grow-1 '>
                  <div className='row'>
                    <div className='col-10'>
                      <Autocomplete
                        options={fleets}
                        sx={{width: '100%'}}
                        renderInput={(params) => (
                          <TextField {...params} label='Select Carrier/Fleet' />
                        )}
                        value={fleet}
                        onChange={(event: any, newValue: IFleetModel | null) => setFleet(newValue)}
                      />
                    </div>
                    <div className='col-2'>
                      <a href='#' title='Refresh' onClick={() => reloadFleet()}>
                        <GrRefresh size={30} color='#7e8299' />
                      </a>
                    </div>
                  </div>

                  <br></br>
                  {fleet && (
                    <>
                      <a href='#' className='text-gray-800 text-hover-primary fw-bolder fs-6 '>
                        {fleet!.fleetMake +
                          ' ' +
                          fleet!.fleetModel +
                          ' (' +
                          fleet!.chassisNumber +
                          ')'}
                      </a>
                      <span className='text-muted fw-bold d-block'>
                        Chasis Number: {fleet!.chassisNumber}
                      </span>
                      <span className='text-muted fw-bold d-block'>Owner: {fleet!.ownerName}</span>
                    </>
                  )}
                </div>
                {/* end::Description */}
              </div>
            </div>
            {/* end::Body */}
          </div>

          <div className={`card ${className}`}>
            {/* begin::Header */}
            <div className='card-header border-0'>
              <h3 className='card-title fw-bolder text-dark'>Driver Details</h3>
              <div className='card-toolbar'>
                <button
                  type='button'
                  className='btn btn-sm btn-icon btn-color-primary btn-active-light-primary'
                  data-bs-toggle='modal'
                  data-bs-target={'#kt_modal_adduser2'}
                  onClick={() => reloadUsers()}
                >
                  <KTSVG path='/media/icons/duotune/general/gen024.svg' className='svg-icon-2' />
                  Add
                </button>
                {/* end::Menu */}
              </div>
            </div>
            {/* end::Header */}
            {/* begin::Body */}
            <div className='card-body pt-2'>
              {/* end:Item */}
              <div className='d-flex align-items-center mb-8'>
                {/* begin::Description */}

                {/* {console.log('Driver: ', driver)} */}

                <div className='flex-grow-1 '>
                  <div className='row'>
                    <div className='col-10'>
                      <Autocomplete
                        options={drivers}
                        sx={{width: '100%'}}
                        renderInput={(params) => <TextField {...params} label='Select Driver' />}
                        value={driver}
                        onChange={(event: any, newValue: IUserModel | null) => setDriver(newValue)}
                      />
                    </div>
                    <div className='col-2'>
                      <a href='#' title='Refresh' onClick={() => reloadUsers()}>
                        <GrRefresh size={30} color={'white'} />
                      </a>
                    </div>
                  </div>

                  <br></br>
                  {driver && (
                    <>
                      <a href='#' className='text-gray-800 text-hover-primary fw-bolder fs-6 '>
                        {driver!.firstName +
                          ' ' +
                          driver!.lastName +
                          ' (' +
                          driver!.phoneNumber +
                          ')'}
                      </a>
                      <span className='text-muted fw-bold d-block'>
                        Phone: {driver!.phoneNumber}
                      </span>
                      <span className='text-muted fw-bold d-block'>Email: {driver!.email}</span>
                    </>
                  )}
                </div>
                {/* end::Description */}
              </div>
            </div>
            {/* end::Body */}
          </div>
        </div>

        <div className='col-xxl-4'>
          <div className={`card ${className}`}>
            {/* begin::Header */}
            <div className='card-header border-0'>
              <h3 className='card-title fw-bolder text-dark'>Manifest List</h3>
              <div className='card-toolbar'>
                {/* begin::Menu */}
                <button
                  type='button'
                  className='btn btn-sm btn-icon btn-color-primary btn-active-light-primary'
                  data-kt-menu-trigger='click'
                  data-kt-menu-placement='bottom-end'
                  data-kt-menu-flip='top-end'
                >
                  <KTSVG path='/media/icons/duotune/general/gen024.svg' className='svg-icon-2' />
                </button>
                <Dropdown1 />
                {/* end::Menu */}
              </div>
            </div>
            {/* end::Header */}
            {/* begin::Body */}
            <div className='card-body pt-2'>
              {/* end:Item */}

              {list.map((item, index) => (
                <div key={index} className='d-flex align-items-center mb-8'>
                  {/* begin::Bullet */}
                  <span className='bullet bullet-vertical h-40px bg-primary'></span>
                  {/* end::Bullet */}
                  {/* begin::Checkbox */}
                  <div className='form-check form-check-custom form-check-solid mx-5'>
                    <input className='form-check-input' type='checkbox' value='' />
                  </div>
                  {/* end::Checkbox */}
                  {/* begin::Description */}
                  <div className='flex-grow-1'>
                    <a href='#' className='text-gray-800 text-hover-primary fw-bolder fs-6'>
                      {item.manifestCode}
                    </a>
                    <span className='text-muted fw-bold d-block'>{item.destination}</span>
                  </div>
                  {/* end::Description */}
                  <button className='btn btn-default' onClick={() => add(item.manifestCode!)}>
                    Add
                  </button>
                </div>
              ))}

              <hr className='bg-default border-1 mb-4 mt-4 border-top border-default'></hr>
              <a onClick={addAll} className='btn btn-success'>
                Add All
              </a>
            </div>
            {/* end::Body */}
          </div>
        </div>

        <div className='col-xl-4'>
          <div className={`card ${className}`}>
            {/* begin::Header */}
            <div className='card-header border-0'>
              <h3 className='card-title fw-bolder text-dark'>
                Manifest Bag {`( ${dispatchCode} )`}
              </h3>
              <div className='card-toolbar'>
                {/* begin::Menu */}
                <button
                  type='button'
                  className='btn btn-sm btn-icon btn-color-primary btn-active-light-primary'
                  data-kt-menu-trigger='click'
                  data-kt-menu-placement='bottom-end'
                  data-kt-menu-flip='top-end'
                >
                  <KTSVG path='/media/icons/duotune/general/gen024.svg' className='svg-icon-2' />
                </button>
                <Dropdown1 />
                {/* end::Menu */}
              </div>
            </div>
            {/* end::Header */}
            {/* begin::Body */}
            <div className='card-body pt-2'>
              {/* end:Item */}

              {listBag.map((item, index) => (
                <div key={index} className='d-flex align-items-center mb-8'>
                  {/* begin::Bullet */}
                  <span className='bullet bullet-vertical h-40px bg-primary'></span>
                  {/* end::Bullet */}
                  {/* begin::Checkbox */}
                  <div className='form-check form-check-custom form-check-solid mx-5'>
                    <input className='form-check-input' type='checkbox' value='' />
                  </div>
                  {/* end::Checkbox */}
                  {/* begin::Description */}
                  <div className='flex-grow-1'>
                    <a href='#' className='text-gray-800 text-hover-primary fw-bolder fs-6'>
                      {item.manifestCode}
                    </a>
                    <span className='text-muted fw-bold d-block'>{item.destination}</span>
                  </div>
                  <a onClick={() => removeItem(item.manifestCode!)} className='btn'>
                    Remove
                  </a>
                </div>
              ))}

              <hr className='bg-default border-1 mb-4 mt-4 border-top border-default'></hr>
              <a onClick={removeAll} className='btn btn-success'>
                Remove All
              </a>
              <a onClick={Save} className='btn btn-primary float-end'>
                Register Dispatch
              </a>
            </div>
            {/* end::Body */}
          </div>
        </div>

        <AddUserModal2 />
        <AddFleetModal1 />
      </div>
    </>
  )
}

export {TripDispatch}
