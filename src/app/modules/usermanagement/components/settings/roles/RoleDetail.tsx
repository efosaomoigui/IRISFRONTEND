import React, {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import agent from '../../../../../../setup/axios/AxiosAgent'
import {KTSVG} from '../../../../../../_iris/helpers'
import {usePageData} from '../../../../../../_iris/layout/core'
import {IRoleModel, IUserModel} from '../../../../auth/models/AuthInterfaces'
import ErrorAlert from '../../../../common/ErrorAlert'

export function RoleDetail() {
  let {roleId} = useParams<{roleId: string}>()
  const [roledetails, setRoleDetails] = useState<IRoleModel>()
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
      await agent.Roles.details(roleId).then((response) => {
        setRoleDetails(response)
        setLoadingData(false)
        setLoadingData(false)
      })
    }
    if (loadingData) {
      callFunc()
    }
  }, [roledetails])

  const handleEdit = (event: React.MouseEvent) => {
    handleSelectValue(roledetails!)
  }

  return (
    <div className='row g-5 g-xxl-8'>
      <div className='col-xl-12'>
        <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
          <div className='card-header cursor-pointer'>
            <div className='card-title m-0'>
              <h3 className='fw-bolder m-0'>Profile Details</h3>
            </div>

            <a
              href='#_b'
              title='Edit'
              id='#kt_modal_editrole'
              data-bs-toggle='modal'
              data-bs-target='#kt_modal_editrole'
              className='btn btn-primary align-self-center'
              onClick={handleEdit}
            >
              Edit Role
            </a>
          </div>

          <div className='card-body p-9'>
            {roledetails && (
              <>
                <div className='row mb-7'>
                  <label className='col-lg-4 fw-bold text-muted'>Role Name</label>

                  <div className='col-lg-8'>
                    <span className='fw-bolder fs-6 text-dark'>{roledetails?.name}</span>
                  </div>
                </div>
              </>
            )}

            {!roledetails && (
              <>
                <h4>Sorry, Role does not exit!</h4>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
