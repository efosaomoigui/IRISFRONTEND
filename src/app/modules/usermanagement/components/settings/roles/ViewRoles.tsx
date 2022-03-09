import {useEffect, useState} from 'react'
import { Spinner } from 'react-bootstrap-v5'
import agent from '../../../../../../setup/axios/AxiosAgent'
import { usePageData } from '../../../../../../_iris/layout/core'
import {IRoleModel, IUserModel} from '../../../../auth/models/AuthInterfaces'
import {IrisTablesWidget} from '../../../../layout/tables/IrisTablesWidget'
import {modalprops} from '../../../../layout/tables/IrisTableTitle'
import Role_Data from './Role_Data.json'

export function ViewRoles() {
  const [modalTarger, setModalTarget] = useState<modalprops[]>([])
  const [loading, setLoading] = useState(true)
  const [rolemodel, setRoleModel] = useState<IRoleModel[]>([])
  const [loadingData, setLoadingData] = useState(true)
  const { selectValue, handleSelectValue, selectUrlParam, setSelectUrlParam } = usePageData() //global data
  
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
    EditPath: '#kt_modal_addrole',
    DeletePath: '',
    FakeData: Role_Data,
  }

  const ModalTarget = [
    {
      linkTitle: 'Add Role',
      linkTarget: '#kt_modal_addrole',
    },
  ]

  const handleEdit = (event: React.MouseEvent) => {
    const urlParm = event.currentTarget.getAttribute('id')
    const val = rolemodel.find((x) => x.id === urlParm)
    handleSelectValue(val!)
    return val
  }
  // //USE EFFECT HOOK
  useEffect(() => {
    const callFunc = async () => {
      await agent.Roles.list().then((response) => {
        setRoleModel(response)
        setModalTarget(ModalTarget)
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
          tableData={rolemodel}
          className='mb-5 mb-xl-8'
          columnsMap={tableProvider.columns}
          DetailsPath={tableProvider.DetailsPath}
          EditPath={tableProvider.EditPath}
          DeletePath={tableProvider.DeletePath}
          UseFakeData={false}
          FakeData={tableProvider.FakeData}
          TableTitle={'Roles'}
          Count={'Over 300 Users'}
          ModalTarget={modalTarger}
          handleEdit = {handleEdit}
        />
        )}

      </div>
    </div>
  )
}
