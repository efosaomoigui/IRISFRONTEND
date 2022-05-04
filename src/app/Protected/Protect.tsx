import React, {Component, useEffect, useState} from 'react'
import {Alert} from 'react-bootstrap-v5'
import {render} from 'react-dom'
import {Redirect, Route} from 'react-router-dom'
import {number} from 'yup'

interface Props {
  AllowPermissions: string[]
  Component: React.LazyExoticComponent<React.FC<{}>>
  HasUserRoles: string[]
  RouteTo?: string
  IsAuth?: boolean
}

const Protect = ({AllowPermissions, Component, HasUserRoles, RouteTo}: Props) => {
  const [canAccess, setCanAccess] = useState(false)
  const [loadingData, setLoadingData] = useState(true)

  useEffect(() => {
    const callFunc = async () => {
      for (let i = 0; i < HasUserRoles.length; i++) {
        if (AllowPermissions.includes(HasUserRoles[i])) {
            alert(HasUserRoles[i])
          setCanAccess(true)
          setLoadingData(false)
          break
        }
      }
    }
    if (loadingData) {
      callFunc()
    }
  }, [])

  return (
    <Route
      render={(props) => {
        alert(canAccess)
        if (canAccess) {
          return Component
        } else {
          return <Redirect to={{pathname: '/dashboard'}} />
        }
      }}
    />
  )
}

export default Protect
