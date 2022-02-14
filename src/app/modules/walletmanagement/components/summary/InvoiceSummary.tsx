import React from 'react'
import { KTSVG } from '../../../../../_iris/helpers'

type Props = {
  className: string
}

const InvoiceSummary : React.FC<Props> = ({className}) =>{
  return (
    <div className={`card ${className}`}>
    {/* begin::Header */}
    <div className='card-header border-0 pt-5'>
      {/* begin::Title */}
      <h3 className='card-title align-items-start flex-column'>
        <span className='card-label fw-bolder fs-3 mb-1'>Recent Inovoices</span>

        <span className='text-muted fw-bold fs-7'>More than 400 new members</span>
      </h3>
      {/* end::Title */}

      {/* begin::Toolbar */}
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
      {/* end::Toolbar */}
    </div>
    {/* end::Header */}

    {/* begin::Body */}
    <div className='card-body'>
      {/* begin::Chart */}
      {/* <div ref={chartRef} id='kt_charts_widget_1_chart' style={{height: '350px'}} /> */}
      {/* end::Chart */}
    </div>
    {/* end::Body */}
  </div>
  )
}

export default InvoiceSummary