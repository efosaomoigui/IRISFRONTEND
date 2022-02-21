import {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import agent from '../../../../../setup/axios/AxiosAgent'

import { IFulfilmentModel } from '../../models/FulfilmentInterface'



export function CollectionCenterDetail() {
  let {CollectionCenterId} = useParams<{CollectionCenterId: string}>()
  const [collectioncenterdetails, setCollectionCenterDetails] = useState<IFulfilmentModel>()

  function getCollectionCenter(collectioncenterid: string) {
    agent.CollectionCenter.details(CollectionCenterId).then((response) => {
        setCollectionCenterDetails(response)
    })
  }

  useEffect(() => {
    getCollectionCenter(CollectionCenterId)
  }, [CollectionCenterId])

  return (
    <div className='row g-5 g-xxl-8'>
      <div className='col-xl-12'>
        <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
          <div className='card-header cursor-pointer'>
            <div className='card-title m-0'>
              <h3 className='fw-bolder m-0'>Collection Center Details</h3>
            </div>

            <Link to='/adminSettings/settings' className='btn btn-primary align-self-center'>
              Edit Collection Center
            </Link>
          </div>

          <div className='card-body p-9'>
            {collectioncenterdetails && <>
            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Collection Center</label>

              <div className='col-lg-8'>
                <span className='fw-bolder fs-6 text-dark'>
                  {collectioncenterdetails?.Id}
                </span>
              </div>
            </div>

            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Company</label>

              <div className='col-lg-8 fv-row'>
                <span className='fw-bold fs-6'>Chisco Express Ltd</span>
              </div>
            </div>

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
                <span className='fw-bolder fs-6 me-2'>(070) 639 65528</span>

                <span className='badge badge-success'>Verified</span>
              </div>
            </div>

            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Company Site</label>

              <div className='col-lg-8'>
                <a href='#' className='fw-bold fs-6 text-dark text-hover-primary'>
                  http://chiscoexpress.com
                </a>
              </div>
            </div>

            <div className='row mb-7'>
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
            </div>

            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Communication</label>

              <div className='col-lg-8'>
                <span className='fw-bolder fs-6 text-dark'>Email, Phone</span>
              </div>
            </div>

            <div className='row mb-10'>
              <label className='col-lg-4 fw-bold text-muted'>Allow Changes</label>

              <div className='col-lg-8'>
                <span className='fw-bold fs-6'>Yes</span>
              </div>
            </div>
            </>}

            {!collectioncenterdetails && <><h4>Sorry, Collection Center Log does not exit!</h4></>}

          </div>
        </div>
      </div>
    </div>
  )
}