import {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import agent from '../../../../../../setup/axios/AxiosAgent'
import { ITripModel } from '../../../Monitor models/MonitorInterface'


export function TripDetail() {
  let {TripId} = useParams<{TripId: string}>()
  const [tripdetails, setTripDetails] = useState<ITripModel>()

  function getTrip(tripid: string) {
    agent.Trip.details(TripId).then((response) => {
        setTripDetails(response)
    })
  }

  useEffect(() => {
    getTrip(TripId)
  }, [TripId])

  return (
    <div className='row g-5 g-xxl-8'>
      <div className='col-xl-12'>
        <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
          <div className='card-header cursor-pointer'>
            <div className='card-title m-0'>
              <h3 className='fw-bolder m-0'>Trip Details</h3>
            </div>

            <Link to='/adminSettings/settings' className='btn btn-primary align-self-center'>
              Edit Trip
            </Link>
          </div>

          <div className='card-body p-9'>
            {tripdetails && <>
            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Invoice</label>

              <div className='col-lg-8'>
                <span className='fw-bolder fs-6 text-dark'>
                  {tripdetails?.id}
                </span>
              </div>
            </div>

            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Dispatcher</label>

              <div className='col-lg-8'>
                <span className='fw-bolder fs-6 text-dark'>
                  {tripdetails?.Dispatcher}
                </span>
              </div>
            </div>

            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Driver</label>

              <div className='col-lg-8'>
                <span className='fw-bolder fs-6 text-dark'>
                  {tripdetails?.Driver}
                </span>
              </div>
            </div>
            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>DriverDispatcher</label>

              <div className='col-lg-8'>
                <span className='fw-bolder fs-6 text-dark'>
                  {tripdetails?.DriverDispatchFee}
                </span>
              </div>
            </div>
            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>EndTime</label>

              <div className='col-lg-8'>
                <span className='fw-bolder fs-6 text-dark'>
                  {tripdetails?.EndTime}
                </span>
              </div>
            </div>

            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Fuel Costs</label>

              <div className='col-lg-8'>
                <span className='fw-bolder fs-6 text-dark'>
                  {tripdetails?.FuelCosts}
                </span>
              </div>
            </div>
            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Fuel Used</label>

              <div className='col-lg-8'>
                <span className='fw-bolder fs-6 text-dark'>
                  {tripdetails?.FuelUsed}
                </span>
              </div>
            </div>

            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>ManifestId</label>

              <div className='col-lg-8'>
                <span className='fw-bolder fs-6 text-dark'>
                  {tripdetails?.ManifestId}
                </span>
              </div>
            </div>
            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Miscellaneous</label>

              <div className='col-lg-8'>
                <span className='fw-bolder fs-6 text-dark'>
                  {tripdetails?.Miscelleneous}
                </span>
              </div>
            </div>
            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>RouteCode</label>

              <div className='col-lg-8'>
                <span className='fw-bolder fs-6 text-dark'>
                  {tripdetails?.RouteCode}
                </span>
              </div>
            </div>
            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Start Time</label>

              <div className='col-lg-8'>
                <span className='fw-bolder fs-6 text-dark'>
                  {tripdetails?.StartTime}
                </span>
              </div>
            </div>
            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Trip Reference</label>

              <div className='col-lg-8'>
                <span className='fw-bolder fs-6 text-dark'>
                  {tripdetails?.TripReference}
                </span>
              </div>
            </div>
            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>fleet</label>

              <div className='col-lg-8'>
                <span className='fw-bolder fs-6 text-dark'>
                  {tripdetails?.fleet}
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

            {!tripdetails && <><h4>Sorry, Trip Log does not exit!</h4></>}

          </div>
        </div>
      </div>
    </div>
  )
}
