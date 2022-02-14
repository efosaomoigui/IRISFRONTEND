import React from 'react'
import {KTSVG} from '../../../../_iris/helpers'

export interface madalprops {
  linkTitle: string
  linkTarget: string
}

interface Props {
  tableTitle: string
  count: string
  modelTarget: madalprops[]
}

const IrisTableHeading = ({tableTitle, count, modelTarget}: Props) => {
  return (
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bolder fs-3 mb-1'>{tableTitle}</span>
          <span className='text-muted mt-1 fw-bold fs-7'>{count}</span>
        </h3>
        <div
          className='card-toolbar'
          data-bs-toggle='tooltip'
          data-bs-placement='top'
          data-bs-trigger='hover'
          title='Click to add a user'
        >
          {modelTarget.map((target) => {
            //   {target.linkTarget}
            return (
            <div key={target.linkTarget}>
            <a
              href='#_b'
              className='btn btn-sm btn-light-primary'
              data-bs-toggle='modal'
              data-bs-target={target.linkTarget}
            >
              <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-3' />
              {target.linkTitle}
            </a>
            </div>)
          })}
        </div>
      </div>
  )
}

export default IrisTableHeading
