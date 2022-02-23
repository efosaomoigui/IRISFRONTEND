import React from 'react'
import { KTSVG } from '../../../../_iris/helpers'
import { madalprops } from './IrisTableTitle'

interface Props{
    DetailsPath:string;
    EditPath:string;
    DeletePath:string;
  modelTarget?: madalprops
}

const TableActionLinks = ({DetailsPath, EditPath, DeletePath, modelTarget}: Props) => {
  return (
    <div className='d-flex justify-content-end flex-shrink-0'>
    <a href={DetailsPath} title="Details" className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1' >
      <KTSVG path='/media/icons/duotune/general/gen019.svg' className='svg-icon-3' />
    </a>

      <a href={EditPath} title="Edit" className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1' data-bs-toggle='modal'
        data-bs-target={modelTarget?.linkTarget} >
      <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
    </a>

    <a href={DeletePath} title="Delete" className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm' >
      <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
    </a>
  </div>
  )
}

export default TableActionLinks