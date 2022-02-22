import {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import agent from '../../../../../../setup/axios/AxiosAgent'
import { ITrackHistoryModel } from '../../../Monitor models/MonitorInterface'


export function TrackHistoryDetail() {
  let {TrackHistoryId} = useParams<{TrackHistoryId: string}>()
  const [trackhistorydetails, setTrackHistoryDetails] = useState<ITrackHistoryModel>()

  function getTrackHistory(trackid: string) {
    agent.TrackHistory.details(TrackHistoryId).then((response) => {
        setTrackHistoryDetails(response)
    })
  }

  useEffect(() => {
    getTrackHistory(TrackHistoryId)
  }, [TrackHistoryId])

  return (
    <div className='row g-5 g-xxl-8'>
      <div className='col-xl-12'>
        <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
          <div className='card-header cursor-pointer'>
            <div className='card-title m-0'>
              <h3 className='fw-bolder m-0'>Track Details</h3>
            </div>

            <Link to='/adminSettings/settings' className='btn btn-primary align-self-center'>
              Edit Track
            </Link>
          </div>

          <div className='card-body p-9'>
            {trackhistorydetails && <>
            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Track History</label>

              <div className='col-lg-8'>
                <span className='fw-bolder fs-6 text-dark'>
                  {trackhistorydetails?.id}
                </span>
              </div>
            </div>

            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Trip Id</label>

              <div className='col-lg-8'>
                <span className='fw-bolder fs-6 text-dark'>
                  {trackhistorydetails?.TripId}
                </span>
              </div>
            </div>

            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Location</label>

              <div className='col-lg-8'>
                <span className='fw-bolder fs-6 text-dark'>
                  {trackhistorydetails?.Location}
                </span>
              </div>
            </div>

            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Status</label>

              <div className='col-lg-8'>
                <span className='fw-bolder fs-6 text-dark'>
                  {trackhistorydetails?.Status}
                </span>
              </div>
            </div>
            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Time Stamp</label>

              <div className='col-lg-8'>
                <span className='fw-bolder fs-6 text-dark'>
                  {trackhistorydetails?.TimeStamp}
                </span>
              </div>
            </div>
            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Action</label>

              <div className='col-lg-8'>
                <span className='fw-bolder fs-6 text-dark'>
                  {trackhistorydetails?.Action}
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

            {!trackhistorydetails && <><h4>Sorry, Track History Log does not exit!</h4></>}

          </div>
        </div>
      </div>
    </div>
  )
}
