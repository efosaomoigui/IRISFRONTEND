import {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import agent from '../../../../../../setup/axios/AxiosAgent'
import { usePageData } from '../../../../../../_iris/layout/core'
import { ITrackHistoryModel } from '../../../Monitor models/MonitorInterface'


export function TrackHistoryDetail() {
  let { tripReference } = useParams<{ tripReference: string}>()
  const [trackhistorydetails, setTrackHistoryDetails] = useState<ITrackHistoryModel>()
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
      await agent.TrackHistory.details(tripReference).then((response) => {
        setTrackHistoryDetails(response)
        setLoadingData(false)
        setLoadingData(false)
      })
    }
    if (loadingData) {
      callFunc()
    }
  }, [trackhistorydetails])

  const handleEdit = (event: React.MouseEvent) => {
    handleSelectValue(trackhistorydetails!)
  }
  return (
    <div className='row g-5 g-xxl-8'>
      <div className='col-xl-12'>
        <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
          <div className='card-header cursor-pointer'>
            <div className='card-title m-0'>
              <h3 className='fw-bolder m-0'>Track Details</h3>
            </div>
            <a
              href='#_b'
              title='Edit'
              id='#kt_modal_editrole'
              data-bs-toggle='modal'
              data-bs-target='#kt_modal_edittrackhistory'
              className='btn btn-primary align-self-center'
              onClick={handleEdit}
            >
              Edit Track History
            </a>
          </div>

          <div className='card-body p-9'>
            {trackhistorydetails && (
             <>
            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Track History</label>

              <div className='col-lg-8'>
                <span className='fw-bolder fs-6 text-dark'>
                  {trackhistorydetails?.id}
                </span>
              </div>
            </div>

            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Location</label>

              <div className='col-lg-8'>
                <span className='fw-bolder fs-6 text-dark'>
                  {trackhistorydetails?.location}
                </span>
              </div>
            </div>

            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Status</label>

              <div className='col-lg-8'>
                <span className='fw-bolder fs-6 text-dark'>
                  {trackhistorydetails?.status}
                </span>
              </div>
            </div>
            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Time Stamp</label>

              <div className='col-lg-8'>
                <span className='fw-bolder fs-6 text-dark'>
                  {trackhistorydetails?.timeStamp}
                </span>
              </div>
            </div>
            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Action</label>

              <div className='col-lg-8'>
                <span className='fw-bolder fs-6 text-dark'>
                  {trackhistorydetails?.action}
                </span>
              </div>
            </div>
            </>
            )}

            {!trackhistorydetails && <><h4>Sorry, Track History Log does not exit!</h4></>}

          </div>
        </div>
      </div>
    </div>
  )
}
