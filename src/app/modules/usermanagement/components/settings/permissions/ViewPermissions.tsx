import {useEffect, useState} from 'react'
import agent from '../../../../../../setup/axios/AxiosAgent'
import {IPermissionModel, IRoleModel, IUserModel} from '../../../../auth/models/AuthInterfaces'
import { IrisTablesWidget } from '../../../../layout/tables/IrisTablesWidget'
import { madalprops } from '../../../../layout/tables/IrisTableTitle'

import Permission_Data from './Permission_Data.json'

export function ViewPermissions() {
  const [modalTarger, setModalTarget] = useState<madalprops[]>([]);
    const [loading, setLoading] = useState(true)
  const [permissionmodel, setPermissionModel] = useState<IPermissionModel[]>()


  // "PermissionId": "3d282193-8ffa-4484-87d4-a32f1a85c003",
  // "roleId": "6334",
  // "claimType": "51308",
  // "claimValue": "31727253-703c-4817-a961-2b4a5b3c318a"
  
  const tableProvider = {
    columns: [
        {
          Header: 'Role Id',
          accessor: 'roleId',
        },
      {
        Header: 'Permission id',
        accessor: 'PermissionId',
      },
        {
          Header: 'Permission Type',
          accessor: 'PermissionType',
        },
        {
          Header: 'Permission',
          accessor: 'Permission',
        },
    ],
    DetailsPath: '/admin/permissionDetails/:id',
    EditPath: '',
    DeletePath: '',
    FakeData: Permission_Data,
  }

  const ModalTarget = [
    {
      linkTitle:'Add Role To Permission',
      linkTarget : '#kt_modal_addpermission'
    }
  ]

  // //USE EFFECT HOOK
  useEffect(() => {
    agent.Permissions.list().then((response) => {
      setPermissionModel(response)
      setModalTarget(ModalTarget);
      setLoading(false)
    })
  }, [])


  return (
    <div className='row g-5 g-xxl-8'>
      <div className='col-xl-12'>
        <IrisTablesWidget
          tableData={permissionmodel}
          className='mb-5 mb-xl-8'
          columnsMap={tableProvider.columns}
          DetailsPath={tableProvider.DetailsPath}
          EditPath={tableProvider.EditPath}
          DeletePath={tableProvider.DeletePath}
          UseFakeData={true}
          FakeData={tableProvider.FakeData}
          TableTitle={'Permission'}
          Count={'Over 300 Users'}
          ModalTarget={
            modalTarger
          }
        />
      </div>
    </div>
  )
}
