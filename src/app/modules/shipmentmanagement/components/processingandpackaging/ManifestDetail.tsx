import {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import agent from '../../../../../setup/axios/AxiosAgent'
import { usePageData } from '../../../../../_iris/layout/core'
import { IManifestModel } from '../../ShipmentModels/ShipmentInterfaces'


export function ManifestDetail() {
  let { manifestid } = useParams<{ manifestid: string}>()
  const [manifestdetails, setRoleDetails] = useState<IManifestModel>()
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
      await agent.Manifest.details(manifestid).then((response) => {
        setRoleDetails(response)
        setLoadingData(false)
        setLoadingData(false)
      })
    }
    if (loadingData) {
      callFunc()
    }
  }, [manifestdetails])

  const handleEdit = (event: React.MouseEvent) => {
    handleSelectValue(manifestdetails!)
  }
  return (
    <div className='row g-5 g-xxl-8'>
      <div className='col-xl-12'>
        <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
          <div className='card-header cursor-pointer'>
            <div className='card-title m-0'>
              <h3 className='fw-bolder m-0'>Manifest Details</h3>
            </div>
            <a
              href='#_b'
              title='Edit'
              id='#kt_modal_editmanifest'
              data-bs-toggle='modal'
              data-bs-target='#kt_modal_editrole'
              className='btn btn-primary align-self-center'
              onClick={handleEdit}
            >
              Edit Manifest
            </a>
          </div>

          <div className='card-body p-9'>
            {manifestdetails && (
            <>
            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Manifest</label>

              <div className='col-lg-8'>
                <span className='fw-bolder fs-6 text-dark'>
                    {manifestdetails?.manifestCode}
                </span>
              </div>
            </div>

            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Group Waybill Id</label>

              <div className='col-lg-8 fv-row'>
                    <span className='fw-bold fs-6'>{manifestdetails?.groupWayBillId}</span>
              </div>
            </div>
            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Service Center Id</label>

              <div className='col-lg-8'>
                    <span className='fw-bolder fs-6 text-dark'>{manifestdetails?.serviceCenterId}</span>
              </div>
            </div>
            </>
            )}

            {!manifestdetails && <><h4>Sorry, Manifest does not exit!</h4></>}

          </div>
        </div>
      </div>
    </div>
  )
}
