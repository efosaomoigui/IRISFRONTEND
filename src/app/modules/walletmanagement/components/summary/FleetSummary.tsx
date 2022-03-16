import React, { useEffect, useState } from 'react'
import agent from '../../../../../setup/axios/AxiosAgent'
import {KTSVG, toAbsoluteUrl} from '../../../../../_iris/helpers'
import { usePageData } from '../../../../../_iris/layout/core'
import { IFleetModel } from '../../../shipmentmanagement/ShipmentModels/ShipmentInterfaces'

type Props = {
  className: string
  userId?: string
}

const FleetSummary: React.FC<Props> = ({ className, userId}) => {
  const [loading, setLoading] = useState(true)
  // const [rolemodel, setRoleModel] = useState<IRoleModel[]>([])
  const [fleetmodel, setFleetModel] = useState<IFleetModel[]>([])
  const [loadingData, setLoadingData] = useState(true)

  const {
    selectValue,
    handleSelectValue,
    selectUrlParam,
    setSelectUrlParam,
    entityValues,
    setEntityValues,
  } = usePageData() //global data

  // //USE EFFECT HOOK
  useEffect(() => {
    const callFunc = async () => {
      await agent.Fleet.list().then((response) => {
        setFleetModel(response)
        setEntityValues!(response)
        setLoadingData(false)
        console.log("fleet ", fleetmodel)
      })
    }
    if (loadingData) {
      callFunc()
    }
  }, [])

  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bolder fs-3 mb-1'>Fleet Information</span>
          <span className='text-muted fw-bold fs-7'>Pending 10 tasks</span>
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
          {/* begin::Menu 1 */}
          {/* <Dropdown1 /> */}
          {/* end::Menu 1 */}
          {/* end::Menu */}
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-3'>
        {/* begin::Table container */}
        <div className='table-responsive'>
          {/* begin::Table */}
          <table className='table align-middle gs-0 gy-5'>
            {/* begin::Table head */}
            <thead>
              <tr>
                <th className='p-0 w-50px'></th>
                <th className='p-0 min-w-200px'></th>
                <th className='p-0 min-w-100px'></th>
                <th className='p-0 min-w-40px'></th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            
            <tbody>
              {fleetmodel.map((fleet) => {
              <tr>
                <th>
                  <div className='symbol symbol-50px me-2'>
                    <span className='symbol-label'>
                      <img
                        src={toAbsoluteUrl('/media/svg/brand-logos/plurk.svg')}
                        className='h-50 align-self-center'
                        alt=''
                      />
                    </span>
                  </div>
                </th>
                <td>
                  <a href='#' className='text-dark fw-bolder text-hover-primary mb-1 fs-6'>
                    Fleet Id
                  </a>
                  <span className='text-muted fw-bold d-block fs-7'>{fleet.fleetId}</span>
                </td>
                <td>
                  <a href='#' className='text-dark fw-bolder text-hover-primary mb-1 fs-6'>
                    Capacity
                  </a>
                  <span className='text-muted fw-bold d-block fs-7'>{fleet.capacity}</span>
                </td>
                <td>
                  <a href='#' className='text-dark fw-bolder text-hover-primary mb-1 fs-6'>
                    Chasis Number
                  </a>
                  <span className='text-muted fw-bold d-block fs-7'>{fleet.chassisNumber}</span>
                </td>
              </tr>
              })}
            </tbody>
            {/* end::Table body */}
            
          </table>
          {/* end::Table */}
        </div>
        {/* end::Table container */}
      </div>
    </div>
  )
}

export default FleetSummary
