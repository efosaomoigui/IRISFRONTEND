import React, {useEffect, useState} from 'react'
import agent from '../../../../../setup/axios/AxiosAgent'
import {KTSVG} from '../../../../../_iris/helpers'
import {usePageData} from '../../../../../_iris/layout/core'
import {IRoleModel} from '../../../auth/models/AuthInterfaces'

type Props = {
  className: string
  userId?: string
}

const WalletTransactionSummary: React.FC<Props> = ({className, userId}) => {
  const [loading, setLoading] = useState(true)
  const [rolemodel, setRoleModel] = useState<IRoleModel[]>([])
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
      await agent.Roles.list().then((response) => {
        setRoleModel(response)
        setEntityValues!(response)
        setLoadingData(false)
      })
    }
    if (loadingData) {
      callFunc()
    }
  }, [])

  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header align-items-center border-0 mt-4'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='fw-bolder mb-2 text-dark'>Wallet Activities</span>
          <span className='text-muted fw-bold fs-7'>890,344 Sales</span>
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
          {/* <Dropdown1 /> */}
          {/* end::Menu */}
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body pt-5'>
        {/* begin::Timeline */}
        <div className='timeline-label'>
          {/* begin::Item */}
          {rolemodel.map((role) => {
            ;<div className='timeline-item'>
              {/* begin::Label */}
              <div className='timeline-label fw-bolder text-gray-800 fs-6'>{role.name}</div>
              {/* end::Label */}
              {/* begin::Badge */}
              <div className='timeline-badge'>
                <i className='fa fa-genderless text-warning fs-1'></i>
              </div>
              {/* end::Badge */}
              {/* begin::Text */}
              <div className='fw-mormal timeline-content text-muted ps-3'>{role.name}</div>
              {/* end::Text */}
            </div>
          })}
        </div>
        {/* end::Timeline */}
      </div>
      {/* end: Card Body */}
    </div>
  )
}

export default WalletTransactionSummary
