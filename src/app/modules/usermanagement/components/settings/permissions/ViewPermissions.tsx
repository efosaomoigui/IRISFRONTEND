import {useEffect, useState} from 'react'
import { Spinner } from 'react-bootstrap-v5'
import agent from '../../../../../../setup/axios/AxiosAgent'
import {IPermissionModel, IRoleModel, IUserModel} from '../../../../auth/models/AuthInterfaces'
import { IrisTablesWidget } from '../../../../layout/tables/IrisTablesWidget'
import { modalprops } from '../../../../layout/tables/IrisTableTitle'

import Permission_Data from './Permission_Data.json'

export function ViewPermissions() {
  const [modalTarger, setModalTarget] = useState<modalprops[]>([]);
    const [loading, setLoading] = useState(true)
  const [permissionmodel, setPermissionModel] = useState<IPermissionModel[]>()
  const [loadingData, setLoadingData] = useState(true)
  
  const tableProvider = {
    columns: [
        {
          Header: 'Role Id',
          accessor: 'roleId',
        },
        {
          Header: 'Permission Type',
          accessor: 'claimType',
        },
        {
          Header: 'Permission',
          accessor: 'claimValue',
        },
    ],
    DetailsPath: '/admin/permissionDetails/',
    EditPath: '#kt_modal_addpermission',
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

    // //USE EFFECT HOOK
    useEffect(() => {
      const callFunc = async () => {
        await agent.Permissions.list().then((response) => {
          setPermissionModel(response)
          setModalTarget(ModalTarget);
          setLoadingData(false)
        })
      }
      if (loadingData) {
        callFunc()
      }
    }, [])


  return (
    <div className='row g-5 g-xxl-8'>
      <div className='col-xl-12'>
      {loadingData ? (
          <div><Spinner animation="border" /></div>
        ) : (
        <IrisTablesWidget
          tableData={permissionmodel}
          className='mb-5 mb-xl-8'
          columnsMap={tableProvider.columns}
          DetailsPath={tableProvider.DetailsPath}
          EditPath={tableProvider.EditPath}
          DeletePath={tableProvider.DeletePath}
          UseFakeData={false}
          FakeData={tableProvider.FakeData}
          TableTitle={'Permission'}
          Count={'Over 300 Users'}
          ModalTarget={
            modalTarger
          }
        />
      )}

      </div>
    </div>
  )
}
