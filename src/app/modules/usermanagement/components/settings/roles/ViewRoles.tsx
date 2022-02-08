import React, { useEffect, useState } from 'react';
import agent from '../../../../../../setup/axios/AxiosAgent';
import { TablesWidgetRoles } from '../../../../../../_iris/partials/widgets/tables/TablesWidgetRoles';
import LoadingComponent from '../../../../../LoadingComponent';
import { IRoleModel } from '../../../../auth/models/AuthInterfaces';


import { rolemodel } from '../../../Models/RoleModel';

export function ViewRoles() {
  return (
    <div className='row g-5 g-xxl-8'>
      <div className='col-xl-12'>
        <TablesWidgetRoles roles={rolemodel} className='mb-5 mb-xl-8' />
      </div>
    </div>
  )
}

