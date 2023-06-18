import {useEffect, useRef, useState} from 'react'
import {Spinner} from 'react-bootstrap-v5'
import {Link, useParams} from 'react-router-dom'
import {useReactToPrint} from 'react-to-print'
import agent from '../../../../../../setup/axios/AxiosAgent'
import {usePageData} from '../../../../../../_iris/layout/core'
import DispatchManifest from '../../../../payment/components/operations/DispatchManifest'
import {ITripModel} from '../../../Monitor models/MonitorInterface'

export function TripDetail() {
  let {id} = useParams<{id: string}>()
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

  const componentRef = useRef<HTMLDivElement>(null)

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

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    copyStyles: true,
  })

  return (
    <div className='row g-5 g-xxl-8'>
      <div className='col-xl-12'>
        <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
          <div className='card-header cursor-pointer'>
            <div className='card-title m-0'>
              <h3 className='fw-bolder m-0'>Invoice Details</h3>
              <button
                onClick={handlePrint}
                style={{marginLeft: '13px', width: '100p%', height: '30px'}}
              >
                Print!
              </button>
            </div>
            {/* 
            <Link to='/adminSettings/settings' className='btn btn-primary align-self-center'>
              Edit Shipment
            </Link> */}
          </div>
          {loadingData ? (
            <div>
              <Spinner animation='border' />
            </div>
          ) : (
            <div className='card-body ' ref={componentRef!}>
              {tripdetails && (
                <>
                  <div className='col-xl-12'>
                    <div className='card mb-5 mb-xl-12' id='kt_profile_details_view'>
                      <div className='card-body p-2'></div>
                      <DispatchManifest shipmentdetails={tripdetails!} />
                    </div>
                  </div>
                </>
              )}

              {!tripdetails && (
                <>
                  <h4>Sorry, Dispatch Manifest does not exit!</h4>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
