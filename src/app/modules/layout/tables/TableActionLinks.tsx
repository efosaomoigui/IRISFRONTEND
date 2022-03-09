import {useState,createContext, useContext, useEffect } from 'react'
import {KTSVG} from '../../../../_iris/helpers'
import { usePageData } from '../../../../_iris/layout/core'
import { IUserModel } from '../../auth/models/AuthInterfaces'

interface Props {
  DetailsPath: string
  EditPath: string
  DeletePath: string
  handleEdit?: (event: React.MouseEvent) => void
}

const TableActionLinks = ({DetailsPath, EditPath, DeletePath, handleEdit}: Props) => {
  const {entityDetailValues, selectUrlParam, setSelectUrlParam,formTitle, setFormTitle} = usePageData()

  return (
    <div className='d-flex justify-content-end flex-shrink-0'>
      <a
        href={DetailsPath}
        title='Details'
        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
      >
        <KTSVG path='/media/icons/duotune/general/gen019.svg' className='svg-icon-3' />
      </a>

      <a
        // href={EditPath}
        href="#_b"
        title='Edit'
        id={EditPath.split(",")[1]}
        data-bs-toggle='modal'
        data-bs-target={EditPath.split(",")[0]}
        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
        onClick={handleEdit}
      >
        <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' /> 
      </a>

      {/* <a
        href={DeletePath}
        title='Delete'
        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
      >
        <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
      </a> */}
    </div>
  )
}

export default TableActionLinks
