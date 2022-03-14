import {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import agent from '../../../../../../setup/axios/AxiosAgent'
import { usePageData } from '../../../../../../_iris/layout/core'
import { ITripModel } from '../../../Monitor models/MonitorInterface'


export function TripDetail() {
  let { id } = useParams<{ id: string}>()
  const [tripdetails, setTripDetails] = useState<ITripModel>()
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
      await agent.Trip.details(id).then((response) => {
        setTripDetails(response)
        setLoadingData(false)
        setLoadingData(false)
      })
    }
    if (loadingData) {
      callFunc()
    }
  }, [tripdetails])

  const handleEdit = (event: React.MouseEvent) => {
    handleSelectValue(tripdetails!)
  }

  return (
    <div className='row g-5 g-xxl-8'>
      <div className='col-xl-12'>
        <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
          <div className='card-header cursor-pointer'>
            <div className='card-title m-0'>
              <h3 className='fw-bolder m-0'>Trip Details</h3>
            </div>
            <a
              href='#_b'
              title='Edit'
              id='#kt_modal_edittrip'
              data-bs-toggle='modal'
              data-bs-target='#kt_modal_edittrip'
              className='btn btn-primary align-self-center'
              onClick={handleEdit}
            >
              Edit Trip
            </a>
          </div>

          <div className='card-body p-9'>
            {tripdetails && (
            <>
            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Trip Id</label>

              <div className='col-lg-8'>
                <span className='fw-bolder fs-6 text-dark'>
                  {tripdetails?.id}
                </span>
              </div>
            </div>

            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Trip Reference</label>

              <div className='col-lg-8'>
                <span className='fw-bolder fs-6 text-dark'>
                  {tripdetails?.tripReference}
                </span>
              </div>
            </div>

            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Driver</label>

              <div className='col-lg-8'>
                <span className='fw-bolder fs-6 text-dark'>
                  {tripdetails?.driver}
                </span>
              </div>
            </div>
            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Manifest Id</label>

              <div className='col-lg-8'>
                <span className='fw-bolder fs-6 text-dark'>
                  {tripdetails?.manifestId}
                </span>
              </div>
            </div>
            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>EndTime</label>

              <div className='col-lg-8'>
                <span className='fw-bolder fs-6 text-dark'>
                  {tripdetails?.endTime}
                </span>
              </div>
            </div>

            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Route Code</label>

              <div className='col-lg-8'>
                <span className='fw-bolder fs-6 text-dark'>
                  {tripdetails?.routeCode}
                </span>
              </div>
            </div>
            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Fleet Id</label>

              <div className='col-lg-8'>
                <span className='fw-bolder fs-6 text-dark'>
                  {tripdetails?.fleetid}
                </span>
              </div>
            </div>

            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Fleet</label>

              <div className='col-lg-8'>
                <span className='fw-bolder fs-6 text-dark'>
                  {tripdetails?.fleet}
                </span>
              </div>
            </div>
            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Start Time</label>

              <div className='col-lg-8'>
                <span className='fw-bolder fs-6 text-dark'>
                  {tripdetails?.startTime}
                </span>
              </div>
            </div>
            </>
            )}

            {!tripdetails && <><h4>Sorry, Trip does not exit!</h4></>}

          </div>
        </div>
      </div>
    </div>
  )
}
