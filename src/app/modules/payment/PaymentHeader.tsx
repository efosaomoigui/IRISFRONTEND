/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {KTSVG, toAbsoluteUrl} from '../../../_iris/helpers'
import {Link} from 'react-router-dom'
import {Dropdown1} from '../../../_iris/partials'
import {useLocation} from 'react-router-dom'
import { UserHeader } from '../usermanagement/UserHeader'

const PaymentHeader: React.FC = () => {
  const location = useLocation()

  return (
    <>
      <UserHeader/>
    </>
  )
}

export {PaymentHeader}
