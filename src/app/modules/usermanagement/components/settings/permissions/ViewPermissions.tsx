import React, { useEffect, useState } from 'react';
import agent from '../../../../../../setup/axios/AxiosAgent';
import { TablesWidgetPermission } from '../../../../../../_iris/partials/widgets/tables/TablesWidgetPermission';
import LoadingComponent from '../../../../../LoadingComponent';
import { IPermissionModel } from '../../../../auth/models/AuthInterfaces';


export function ViewPermissions() {
  const [loading, setLoading] = useState(true)
  const [permissionmodel1, setPermissionModel] = useState<IPermissionModel[]>()

  // //USE EFFECT HOOK
  useEffect(() => {
    agent.Permissions.list().then((response) => {
      setPermissionModel(response)
      setLoading(false)
    })
  }, [])
  if (loading) return <LoadingComponent content='Loading...' />

  return (
    <div className='row g-5 g-xxl-8'>
      <div className='col-xl-12'>
        <TablesWidgetPermission permission={permissionmodel1} className='mb-5 mb-xxl-8' />
      </div>
    </div>
  )
}
