import {useEffect, useState} from 'react'
import agent from '../../../../../../setup/axios/AxiosAgent'
import {IRoleModel, IUserModel} from '../../../../auth/models/AuthInterfaces'
import { IrisTablesWidget } from '../../../../layout/tables/IrisTablesWidget'
import { madalprops } from '../../../../layout/tables/IrisTableTitle'
import Role_Data from './Role_Data.json'

export function ViewRoles() {
  const [modalTarger, setModalTarget] = useState<madalprops[]>([]);
    const [loading, setLoading] = useState(true)
  const [rolemodel, setRoleModel] = useState<IRoleModel[]>()

  const tableProvider = {
    columns: [
        {
          Header: 'Role Id',
          accessor: 'id',
        },
        {
          Header: 'Role Name',
          accessor: 'name',
        },
    ],
    DetailsPath: '/admin/roleDetails/',
    EditPath: '',
    DeletePath: '',
    FakeData: Role_Data,
  }

  const ModalTarget = [
    {
      linkTitle:'Add Role',
      linkTarget : '#kt_modal_addrole'
    }
  ]

  // //USE EFFECT HOOK
  useEffect(() => {
    agent.Roles.list().then((response) => {
      setRoleModel(response)
      setModalTarget(ModalTarget);
      setLoading(false)
    })
  }, [])


  return (
    <div className='row g-5 g-xxl-8'>
      <div className='col-xl-12'>
        <IrisTablesWidget
          tableData={rolemodel}
          className='mb-5 mb-xl-8'
          columnsMap={tableProvider.columns}
          DetailsPath={tableProvider.DetailsPath}
          EditPath={tableProvider.EditPath}
          DeletePath={tableProvider.DeletePath}
          UseFakeData={true}
          FakeData={tableProvider.FakeData}
          TableTitle={'Roles'}
          Count={'Over 300 Users'}
          ModalTarget={
            modalTarger
          }
        />
      </div>
    </div>
  )
}
