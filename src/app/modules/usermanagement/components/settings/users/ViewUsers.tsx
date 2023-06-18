import {useEffect, useState, useContext} from 'react'
import {Spinner} from 'react-bootstrap-v5'
import agent from '../../../../../../setup/axios/AxiosAgent'
import {usePageData} from '../../../../../../_iris/layout/core'
import {IUserModel} from '../../../../auth/models/AuthInterfaces'
import {IrisTablesWidget} from '../../../../layout/tables/IrisTablesWidget'
import {modalprops} from '../../../../layout/tables/IrisTableTitle'
import {AddUserModal} from '../../../modals/AddUserModal'
import {EditUserModal} from '../../../modals/EditUserModal'
import User_Data from './User_Data.json'
// import {format} from 'date-fns'

export function ViewUsers() {
  const [loading, setLoading] = useState(true)
  const [modalTarger, setModalTarget] = useState<modalprops[]>([])
  const [usersmodel, setUsersModel] = useState<IUserModel[]>([])
  const [loadingData, setLoadingData] = useState(true)
  const {selectValue, handleSelectValue, selectUrlParam, setSelectUrlParam} = usePageData() //global data

  //all the data for the table
  const tableProvider = {
    columns: [
      {
        Header: 'User Id',
        accessor: 'userId',
        // cell:({ value }) => {return format(new Date(value), 'dd/MM/YYYY')}
      },
      {
        Header: 'User Name',
        accessor: 'username',
      },
      {
        Header: 'First Name',
        accessor: 'firstName',
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Phone Number',
        accessor: 'phoneNumber',
      },
      {
        Header: 'Wallet Number',
        accessor: 'walletNumber',
      },
    ],
    DetailsPath: '/adminSettings/userDetails/',
    EditPath: '#kt_modal_edituser',
    DeletePath: '/adminSettings/userDetails/',
    FakeData: User_Data,
  }

  //Buttons on the table page
  const ModalTarget = [
    {
      linkTitle: 'Add User',
      linkTarget: '#kt_modal_adduser',
    },
  ]

  const handleEdit = (event: React.MouseEvent) => {
    const urlParm = event.currentTarget.getAttribute('id')
    const val = usersmodel.find((x) => x.userId === urlParm)
    handleSelectValue(val!)
    return val
  }

  //USE EFFECT HOOK
  useEffect(() => {
    const callFunc = async () => {
      const val = await agent.Users.list().then((response) => {
        setModalTarget(ModalTarget)
        setUsersModel(response)
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
          <div>
            <Spinner animation='border' />
          </div>
        ) : (
          <IrisTablesWidget
            tableData={usersmodel}
            className='mb-5 mb-xl-8'
            columnsMap={tableProvider.columns}
            DetailsPath={tableProvider.DetailsPath}
            EditPath={tableProvider.EditPath}
            DeletePath={tableProvider.DeletePath}
            UseFakeData={false}
            FakeData={tableProvider.FakeData}
            TableTitle={'User Profile'}
            Count={'Over 300 Users'}
            ModalTarget={modalTarger}
            handleEdit={handleEdit}
          />
        )}
      </div>

      <AddUserModal />
      <EditUserModal />
    </div>
  )
}
