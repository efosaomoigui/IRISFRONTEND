import {useState,createContext, useContext } from 'react'
import {KTSVG} from '../../../../_iris/helpers'
import { usePageData } from '../../../../_iris/layout/core'

interface Props {
  DetailsPath: string
  EditPath: string
  DeletePath: string
}

const TableActionLinks = ({DetailsPath, EditPath, DeletePath}: Props) => {
  const {entityDetailValues, selectUrlParam, setSelectUrlParam} = usePageData()

  const clickAction = ()=>{
    const urlParm = DetailsPath.split('/')
    setSelectUrlParam!(urlParm[urlParm.length-1]);
  }

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
        data-bs-toggle='modal'
        data-bs-target={EditPath}
        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
        onClick={clickAction}
      >
        <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
      </a>

      <a
        href={DeletePath}
        title='Delete'
        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
      >
        <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
      </a>
    </div>
  )
}

export default TableActionLinks
