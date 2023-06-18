/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from 'react'
import {shallowEqual, useSelector} from 'react-redux'
import {toast} from 'react-toastify'
import {Button} from 'semantic-ui-react'
import {RootState} from '../../../../../setup'
import agent from '../../../../../setup/axios/AxiosAgent'
import {KTSVG} from '../../../../../_iris/helpers'
import {Dropdown1} from '../../../../../_iris/partials/content/dropdown/Dropdown1'
import {IUserModel} from '../../../auth/models/AuthInterfaces'
import {
  IBaseShipmentModel,
  IGroupWayBillModel,
  IRouteModel,
  IShipmentModel,
} from '../../ShipmentModels/ShipmentInterfaces'
import listdata from './listdata.json'

type Props = {
  className: string
  listItems: IShipmentModel[]
}

const ListItems: React.FC<Props> = ({className, listItems}) => {
  const [list, setList] = useState(listItems)
  const [listBag, setListBag] = useState<IBaseShipmentModel[]>([])
  const [listDataValue, setListDataVal] = useState<IShipmentModel[]>([])
  const [routemodel, setRouteModel] = useState<IRouteModel[]>([])
  const [loadingData, setLoadingData] = useState(true)
  const [groupWayBillCode, setGroupWayBillCode] = useState('')
  const [routeId, setRouteId] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [showError, setShowError] = useState(false)
  const [enableSave, setEnableSave] = useState(false)

  const add = (waybill: string) => {
    const newList = list.filter((item) => item.waybill !== waybill)
    const itemAdded = list.filter((item) => item.waybill === waybill)
    setList(newList)
    if (checkListDuplicate(waybill) === false) listBag.push(itemAdded[0])
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

  const removeItem = (waybill: string) => {
    const newList = listBag.filter((item) => item.waybill !== waybill)
    const itemRemoved = listBag.filter((item) => item.waybill === waybill)
    setListBag(newList)
    list.push(itemRemoved[0])
    // if (checkListDuplicate(waybill) === false) list.push(itemRemoved[0])
    setList(list)
  }

  const checkListDuplicate = (waybill: string) => {
    const newList = listBag.filter((item) => item.waybill === waybill)
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

  const getGroupCode = async () => {
    await agent.GroupWayBill.GetGroupWayBillCode().then((response) => {
      setGroupWayBillCode(response)
      setEnableSave(true)
    })
  }

  const listDataVal: IShipmentModel[] = []
  const destinationCheckArray: string[] = []

  const user: IUserModel = useSelector<RootState>(({auth}) => auth.user, shallowEqual) as IUserModel

  const fillListItems = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    var routeid = event.target.value
    setRouteId(routeid)
    // eslint-disable-next-line array-callback-return
    await agent.Shipment.shipmentByRoute(routeid).then((response) => {
      response.map((item) => {
        let itemObj: IShipmentModel = {
          waybill: item.waybill,
          destination: item.destination,
        }
        listDataVal.push(itemObj)
        // destinationCheckArray.push(routeid)
      })
      setList(listDataVal)
    })

    // console.log('AAR: ', listDataValue)
  }

  // //USE EFFECT HOOK
  useEffect(() => {
    const callFunc = async () => {
      await agent.GroupWayBill.Routelist().then((response) => {
        setRouteModel(response)
        setLoadingData(false)
      })
    }
    if (loadingData) {
      callFunc()
    }
  }, [])

  const Save = () => {
    const values: IGroupWayBillModel = {
      groupCode: groupWayBillCode,
      Waybills: listBag,
      RId: routeId,
      GroupRId: routeId,
      ServiceCenterId: routeId,
      UserId: user.userId,
    }

    setIsSubmitting(true)

    agent.GroupWayBill.create(values).then((response) => {
      if (response.validationErrors!.length > 0) {
        toast.error(response.validationErrors?.toString())
        setErrorMessage(response.validationErrors!.toString())
        setIsSubmitting(false)
        setShowError(true)
      } else {
        toast.success('Group Bag Creation Was Successful!')
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
      <h3>Destination: </h3>
      <div className='row'>
        <div className='col'>
          <select
            className='form-select mb-5'
            aria-label='Default select example'
            onChange={fillListItems}
          >
            <option>Select A Route</option>
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
          <a className='btn btn-primary' onClick={getGroupCode}>
            Generate GroupWay Code
          </a>
        </div>
      </div>
      <div className='row'>
        <div className='col-xxl-6'>
          <div className={`card ${className}`}>
            {/* begin::Header */}
            <div className='card-header border-0'>
              <h3 className='card-title fw-bolder text-dark'>List Items</h3>
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
                      {item.waybill}
                    </a>
                    <span className='text-muted fw-bold d-block'>{item.destination}</span>
                  </div>
                  {/* end::Description */}
                  <button className='btn btn-default' onClick={() => add(item.waybill!)}>
                    Add
                  </button>
                </div>
              ))}

              <hr className='bg-default border-1 mb-4 mt-4 border-top border-default'></hr>
              {/* <Button
              floated='right'
              positive
              type='submit'
              variant='primary'
              onClick={addAll}
              // loading={props.isSubmitting}
              content='Add All'
            /> */}
              <a onClick={addAll} className='btn btn-success'>
                Add All
              </a>
            </div>
            {/* end::Body */}
          </div>
        </div>

        <div className='col-xl-6'>
          <div className={`card ${className}`}>
            {/* begin::Header */}
            <div className='card-header border-0'>
              <h3 className='card-title fw-bolder text-dark'>
                List Bag {`( ${groupWayBillCode} )`}
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
                      {item.waybill}
                    </a>
                    <span className='text-muted fw-bold d-block'>{item.destination}</span>
                  </div>
                  {/* end::Description */}
                  {/* <button className='btn btn-default' onClick={() => removeItem(item.waybill!)}>
                  Remove
                </button> */}
                  <a onClick={() => removeItem(item.waybill!)} className='btn'>
                    Remove
                  </a>
                </div>
              ))}

              <hr className='bg-default border-1 mb-4 mt-4 border-top border-default'></hr>
              {/* <Button
              floated='left'
              positive
              type='submit'
              variant='primary'
              onClick={removeAll}
              // loading={props.isSubmitting}
              content='Remove All'
            /> */}

              <a onClick={removeAll} className='btn btn-success'>
                Remove All
              </a>

              {enableSave && listBag.length > 0 && (
                <>
                  <a onClick={Save} className='btn btn-primary float-end'>
                    {isSubmitting && <span className='spinner-border text-warning'></span>}
                    {!isSubmitting && <span>Save</span>}
                  </a>
                </>
              )}
            </div>
            {/* end::Body */}
          </div>
        </div>
      </div>
    </>
  )
}

export {ListItems}