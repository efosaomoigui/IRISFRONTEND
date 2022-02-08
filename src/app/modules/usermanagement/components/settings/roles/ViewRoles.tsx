import React, { useEffect, useState } from 'react';
import agent from '../../../../../../setup/axios/AxiosAgent';
import { TablesWidgetRoles } from '../../../../../../_iris/partials/widgets/tables/TablesWidgetRoles';
import LoadingComponent from '../../../../../LoadingComponent';
import { IRoleModel } from '../../../../auth/models/AuthInterfaces';


export function ViewRoles() {
  const [loading, setLoading] = useState(true)
  const [rolemodel1, setRoleModel] = useState<IRoleModel[]>()

  // //USE EFFECT HOOK
  useEffect(() => {
    agent.Roles.list().then((response) => {
      setRoleModel(response)
      setLoading(false)
    })
  }, [])
    if (loading) return <LoadingComponent content='Loading...' />

  return (
    <div className='row g-5 g-xxl-8'>
      <div className='col-xl-12'>
        <TablesWidgetRoles roles={rolemodel1} className='mb-5 mb-xl-8' />
      </div>
    </div>
  )
}

