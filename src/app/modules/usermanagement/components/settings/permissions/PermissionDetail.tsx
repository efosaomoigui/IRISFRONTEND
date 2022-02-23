import {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import agent from '../../../../../../setup/axios/AxiosAgent'
import { IPermissionModel } from '../../../../auth/models/AuthInterfaces'

export function PermissionDetail() {
  let { roleId } = useParams<{ roleId: string}>()
  const [permissiondetails, setPermissionDetails] = useState<IPermissionModel>()

  function getPermission(roleId: string) {
    agent.Permissions.details(roleId).then((response) => {
      setPermissionDetails(response)
    })
  }

  useEffect(() => {
    getPermission(roleId)
  }, [roleId])

  return (
    <div className='row g-5 g-xxl-8'>
      <div className='col-xl-12'>
        <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
          <div className='card-header cursor-pointer'>
            <div className='card-title m-0'>
              <h3 className='fw-bolder m-0'>Permission Details</h3>
            </div>

            <Link to='/adminSettings/settings' className='btn btn-primary align-self-center'>
              Edit Permission
            </Link>
          </div>

          <div className='card-body p-9'>
            {permissiondetails && <>
            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Permission Name</label>

              <div className='col-lg-8'>
                <span className='fw-bolder fs-6 text-dark'>
                    {permissiondetails.roleId} 
                </span>
              </div>
            </div>

            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Permission Id</label>

              <div className='col-lg-8'>
                  <span className='fw-bold fs-6'>{permissiondetails.roleId}</span>
              </div>
            </div>

              <div className='row mb-7'>
                <label className='col-lg-4 fw-bold text-muted'>Permission Type</label>

                <div className='col-lg-8'>
                  <span className='fw-bold fs-6'>{permissiondetails.claimType}</span>
                </div>
              </div>

              <div className='row mb-7'>
                <label className='col-lg-4 fw-bold text-muted'>Permission Value</label>

                <div className='col-lg-8'>
                  <span className='fw-bold fs-6'>{permissiondetails.claimValue}</span>
                </div>
              </div>

            <div className='row mb-10'>
              <label className='col-lg-4 fw-bold text-muted'>Allow Changes</label>

              <div className='col-lg-8'>
                <span className='fw-bold fs-6'>Yes</span>
              </div>
            </div>
            </>}

            {!permissiondetails && <><h4>Sorry, Permission does not exit!</h4></>}

          </div>
        </div>
      </div>
    </div>
  )
}
