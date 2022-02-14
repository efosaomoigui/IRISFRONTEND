import React from 'react'
import {KTSVG} from '../../../../_iris/helpers'
import {GenericTable} from './GenericTable'
import IrisTableHeading, {madalprops} from './IrisTableTitle'

interface colAcc {
  Header: string
  accessor: string
}

type Props = {
  className: string
  tableData?: any[]
  columnsMap: colAcc[]
  DetailsPath: string
  EditPath: string
  DeletePath: string
  UseFakeData: boolean
  FakeData: any[]
  TableTitle: string
  Count: string
  ModalTarget: madalprops[]
}

const IrisTablesWidget: React.FC<Props> = ({
  tableData,
  className,
  columnsMap,
  DetailsPath,
  EditPath,
  DeletePath,
  UseFakeData,
  FakeData,
  TableTitle,
  Count,
  ModalTarget,
}) => {
  const tabledata = UseFakeData ? FakeData : tableData

  console.log('==>', tableData)

  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <IrisTableHeading tableTitle={TableTitle} count={Count} modelTarget={ModalTarget} />
      {/* end::Header */}

      {/* begin::Body */}
      <div className='card-body py-3'>
        {/* begin::Table container */}
        <div className='table-responsive'>
          {/* begin::Table */}
          <GenericTable
            irisData={tabledata}
            columnsMap={columnsMap}
            DetailsPath={DetailsPath}
            EditPath={EditPath}
            DeletePath={DeletePath}
          />
          {/* end::Table */}
        </div>
        {/* end::Table container */}
      </div>
      {/* begin::Body */}

      <div className='container-fluid d-flex align-items-stretch justify-content-between'>
        {/*begin::Aside mobile toggle*/}
        <div className='d-flex align-items-center d-lg-none ms-n3 me-1' title='Show aside menu'>
          <div
            className='btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px'
            id='kt_aside_mobile_toggle'
          >
            {/*begin::Svg Icon | path: icons/duotune/abstract/abs015.svg*/}
            <span className='svg-icon svg-icon-2x mt-1'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width={24}
                height={24}
                viewBox='0 0 24 24'
                fill='none'
              >
                <path
                  d='M21 7H3C2.4 7 2 6.6 2 6V4C2 3.4 2.4 3 3 3H21C21.6 3 22 3.4 22 4V6C22 6.6 21.6 7 21 7Z'
                  fill='black'
                />
                <path
                  opacity='0.3'
                  d='M21 14H3C2.4 14 2 13.6 2 13V11C2 10.4 2.4 10 3 10H21C21.6 10 22 10.4 22 11V13C22 13.6 21.6 14 21 14ZM22 20V18C22 17.4 21.6 17 21 17H3C2.4 17 2 17.4 2 18V20C2 20.6 2.4 21 3 21H21C21.6 21 22 20.6 22 20Z'
                  fill='black'
                />
              </svg>
            </span>
            {/*end::Svg Icon*/}
          </div>
        </div>
        {/*end::Aside mobile toggle*/}
        {/*begin::Mobile logo*/}
        <div className='d-flex align-items-center flex-grow-1 flex-lg-grow-0'>
          <a href='../../demo1/dist/index.html' className='d-lg-none'>
            <img alt='Logo' src='assets/media/logos/logo-2.svg' className='h-30px' />
          </a>
        </div>
      </div>
    </div>
  )
}

export {IrisTablesWidget}