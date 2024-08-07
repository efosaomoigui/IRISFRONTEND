/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from 'react'
import {Col, Container, Row, Spinner} from 'react-bootstrap-v5'
import {shallowEqual, useSelector} from 'react-redux'
import {Link, useHistory, useParams} from 'react-router-dom'
import {toast} from 'react-toastify'
import {RootState} from '../../../../setup'
import agent from '../../../../setup/axios/AxiosAgent'
import {KTSVG} from '../../../../_iris/helpers'
import {usePageData} from '../../../../_iris/layout/core'
import {
  ChartsWidget1,
  TablesWidget1,
  ListsWidget5,
  TablesWidget5,
} from '../../../../_iris/partials/widgets'
import {isThorized} from '../../../routing/access'
import {IRoleModel, IServiceCenter, IUserModel, IUserRole} from '../../auth/models/AuthInterfaces'
import {ErrorsPage} from '../../errors/ErrorsPage'
import {ManageRole} from '../../usermanagement/components/settings/roles/ManageRole'
import ManageUserServiceCenter from '../../usermanagement/components/settings/roles/ManageUserServiceCenter'
import {RoleTable} from '../../usermanagement/components/settings/roles/RoleTable'
import {EditUserModal} from '../../usermanagement/modals/EditUserModal'
import {AddUserToRole} from '../../usermanagement/userformwidget/AddUserToRole'
import FleetSummary from '../../walletmanagement/components/summary/FleetSummary'
import InvoiceSummary from '../../walletmanagement/components/summary/InvoiceSummary'
import KYCSummary from '../../walletmanagement/components/summary/KYCSummary'
import WalletTransactionSummary from '../../walletmanagement/components/summary/WalletTransactionSummary'
import {IWalletTransactionModel} from '../../walletmanagement/Models/WalletInterfaces'

export function Overview() {
  const user: IUserModel = useSelector<RootState>(({auth}) => auth.user, shallowEqual) as IUserModel
  const userRoles = user.roles!
  const {Admin, Finance, Agent, Customer, Driver} = isThorized(userRoles)

  let {UserId} = useParams<{UserId: string}>()
  const [userdetails, setUserDetails] = useState<IUserModel>()
  const [usersmodel, setUsersModel] = useState<IUserModel[]>([])
  const {selectValue, handleSelectValue, selectUrlParam, setSelectUrlParam} = usePageData() //global data
  const [errorMessage, setErrorMessage] = useState('')
  const [showError, setShowError] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [rolemodel, setRoleModel] = useState<IRoleModel[]>([])
  const [loadingData, setLoadingData] = useState(true)
  const [selectedValue, setSelectedValue] = React.useState('')
  const history = useHistory()

  function getUser(userid: string) {
    agent.Users.details(userid).then((response) => {
      setUserDetails(response)
    })
  }

  useEffect(() => {
    const callFunc = async () => {
      await agent.Roles.list().then((response) => {
        setRoleModel(response)
        setLoadingData(false)
      })
    }
    if (loadingData) {
      callFunc()
    }
  }, [])

  const onSubmit1 = (values: IUserRole) => {
    // alert(JSON.stringify(values))
    agent.Roles.AddRole(values).then((response) => {
      if (response.validationErrors!.length > 0) {
        toast.error(response.validationErrors?.toString())
        setErrorMessage(response.validationErrors!.toString())
        // setIsSubmitting(false)
        setShowError(true)
      } else {
        toast.success('User Update Was Successful!')
        setInterval(() => {}, 1000)
        setIsSubmitting(false)
        setShowError(false)
        history.push('/')
        history.push('/adminSettings/userDetails/' + userdetails?.userId)
        // history.push("/admin/users");
        console.log('user, ', `/adminSettings/userDetails`)
      }
    })
  }

  const onSubmit2 = (values: IServiceCenter) => {
    console.log(values)
    agent.Users.AddtoServiceCenter(values).then((response) => {
      if (response.validationErrors!.length > 0) {
        toast.error(response.validationErrors?.toString())
        setErrorMessage(response.validationErrors!.toString())
        // setIsSubmitting(false)
        setShowError(true)
      } else {
        toast.success('User Service Center Update Was Successful!')
        setInterval(() => {}, 1000)
        setIsSubmitting(false)
        setShowError(false)
        // history.push('/')
        // history.push('/adminSettings/userDetails/' + userdetails?.userId)
        // history.push("/admin/users");
        console.log('user, ', `/adminSettings/userDetails`)
      }
    })
  }

  useEffect(() => {
    getUser(UserId)
  }, [UserId])

  const handleEdit = (event: React.MouseEvent) => {
    handleSelectValue(userdetails!)
  }

  // console.log("VAA ", JSON.stringify(userdetails));

  return (
    <>
      {' '}
      {loadingData ? (
        <div>
          <Spinner animation='border' />
        </div>
      ) : (
        <div>
          {userdetails && (
            <>
              <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
                <div className='card-header cursor-pointer'>
                  <div className='card-title m-0'>
                    <h3 className='fw-bolder m-0'>Profile Details</h3>
                  </div>

                  <a
                    href='#_b'
                    title='Edit'
                    id='#kt_modal_edituser'
                    data-bs-toggle='modal'
                    data-bs-target='#kt_modal_edituser'
                    className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                    onClick={handleEdit}
                  >
                    <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
                  </a>
                </div>

                <div className='card-body p-9'>
                  <div className='row mb-7'>
                    <label className='col-lg-4 fw-bold text-muted'>Full Name</label>

                    <div className='col-lg-8'>
                      <span className='fw-bolder fs-6 text-dark'>
                        {userdetails?.firstName + ' ' + userdetails?.lastName}
                      </span>
                    </div>
                  </div>

                  {/* <div className='row mb-7'>
                <label className='col-lg-4 fw-bold text-muted'>Company</label>

                <div className='col-lg-8 fv-row'>
                  <span className='fw-bold fs-6'>Chisco Express Ltd</span>
                </div>
              </div> */}

                  <div className='row mb-7'>
                    <label className='col-lg-4 fw-bold text-muted'>
                      Contact Phone
                      <i
                        className='fas fa-exclamation-circle ms-1 fs-7'
                        data-bs-toggle='tooltip'
                        title='Phone number must be active'
                      ></i>
                    </label>

                    <div className='col-lg-8 d-flex align-items-center'>
                      <span className='fw-bolder fs-6 me-2'>{userdetails?.phoneNumber}</span>
                      <span className='badge badge-success'>Verified</span>
                    </div>
                  </div>

                  <div className='row mb-7'>
                    <label className='col-lg-4 fw-bold text-muted'>Email</label>

                    <div className='col-lg-8 d-flex align-items-center'>
                      <span className='fw-bolder fs-6 me-2'>{userdetails?.email}</span>
                    </div>
                  </div>

                  {/* <div className='row mb-7'>
                <label className='col-lg-4 fw-bold text-muted'>
                  Country
                  <i
                    className='fas fa-exclamation-circle ms-1 fs-7'
                    data-bs-toggle='tooltip'
                    title='Country of origination'
                  ></i>
                </label>

                <div className='col-lg-8'>
                  <span className='fw-bolder fs-6 text-dark'>Nigeria</span>
                </div>
              </div> */}
                </div>
              </div>
              {Admin && (
                <>
                  <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
                    <div className='card-header cursor-pointer'>
                      <div className='card-title m-0'>
                        <h3 className='fw-bolder m-0'>Manage Role for {userdetails?.firstName} </h3>
                      </div>
                    </div>
                    <div className='card-body p-9'>
                      <div className='row mb-12'>
                        <ManageRole
                          onSubmit={onSubmit1}
                          roles={rolemodel}
                          userId={userdetails?.userId}
                          user={userdetails}
                        />
                        {/* <div className='col-lg-8'>
                  <AddUserToRole onSubmit={onSubmit1} userId={userdetails?.userId} />
                  <ManageRole />
                </div> */}
                      </div>
                    </div>
                  </div>

                  <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
                    <div className='card-header cursor-pointer'>
                      <div className='card-title m-0'>
                        <h3 className='fw-bolder m-0'>
                          Add {userdetails?.firstName} To Service Centers{' '}
                        </h3>
                      </div>
                    </div>
                    <div className='card-body p-9'>
                      <div className='row mb-12'>
                        <ManageUserServiceCenter
                          onSubmit={onSubmit2}
                          userId={userdetails?.userId}
                          user={userdetails}
                          serviceCenters={userdetails!.serviceCenters!}
                        />
                        {/* <div className='col-lg-8'>
                  <AddUserToRole onSubmit={onSubmit1} userId={userdetails?.userId} />
                  <ManageRole />
                </div> */}
                      </div>
                    </div>
                  </div>
                </>
              )}
              <div className='row gy-10 gx-xl-10'>
                <div className='col-xl-6'>
                  {/* <WalletTransactionSummary userId={userdetails!.userId} className='card-xxl-stretch mb-5 mb-xl-10' /> */}
                </div>

                <div className='col-xl-6'>
                  {/* <FleetSummary userId={userdetails!.userId} className='card-xxl-stretch mb-5 mb-xl-10' /> */}
                </div>
              </div>
              <div className='row gy-10 gx-xl-10'>
                {/* <div className='col-xl-12'>
              <InvoiceSummary className='card-xxl-stretch mb-5 mb-xl-10' />
            </div> */}

                {/* <div className='col-xl-6'>
              <KYCSummary className='card-xxl-stretch mb-5 mb-xl-10' />
            </div> */}
              </div>
            </>
          )}
          {!userdetails && (
            <>
              <Container>
                <Row>
                  <Col>
                    <h2 className='fw-bolder fs-1x text-black-100 mb-4'>User Not Found!</h2>
                  </Col>
                </Row>
              </Container>
            </>
          )}
          <EditUserModal />
        </div>
      )}
    </>
  )
}
