import {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import agent from '../../../../../../setup/axios/AxiosAgent'
import { usePageData } from '../../../../../../_iris/layout/core'
import { IPermissionModel } from '../../../../auth/models/AuthInterfaces'

export function PermissionDetail() {
  let { roleId } = useParams<{ roleId: string}>()
  const [permissiondetails, setPermissionDetails] = useState<IPermissionModel>()
  const [loadingData, setLoadingData] = useState(true)
  const {
    selectValue,
    handleSelectValue,
    selectUrlParam,
    setSelectUrlParam,
    entityValues,
    setEntityValues,
  } = usePageData() //global data

  useEffect(() => {
    const callFunc = async () => {
      await agent.Permissions.details(roleId).then((response) => {
        setPermissionDetails(response)
        setLoadingData(false)
        setLoadingData(false)
      })
    }
    if (loadingData) {
      callFunc()
    }
  }, [permissiondetails])

  const handleEdit = (event: React.MouseEvent) => {
    handleSelectValue(permissiondetails!)
  }

  return (
    <div className='row g-5 g-xxl-8'>
      <div className='col-xl-12'>
        <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
          <div className='card-header cursor-pointer'>
            <div className='card-title m-0'>
              <h3 className='fw-bolder m-0'>Permission Details</h3>
            </div>
            <a
              href='#_b'
              title='Edit'
              id='#kt_modal_editpermission'
              data-bs-toggle='modal'
              data-bs-target='#kt_modal_editpermission'
              className='btn btn-primary align-self-center'
              onClick={handleEdit}
            >
             Edit Permission 
            </a>
          </div>

          <div className='card-body p-9'>
            {permissiondetails && (
            <>
            {/* <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Permission Name</label>

              <div className='col-lg-8'>
                <span className='fw-bolder fs-6 text-dark'>
                    {permissiondetails.roleId} 
                </span>
              </div>
            </div> */}
            

            {/* <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Permission Id</label>

              <div className='col-lg-8'>
                  <span className='fw-bold fs-6'>{permissiondetails.roleId}</span>
              </div>
            </div> */}

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
            </>
            )}

            {!permissiondetails && <><h4>Sorry, Permission does not exit!</h4></>}

          </div>
        </div>
      </div>
    </div>
  )
}
