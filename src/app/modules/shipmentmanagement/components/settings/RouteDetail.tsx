import {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import agent from '../../../../../setup/axios/AxiosAgent'
import { usePageData } from '../../../../../_iris/layout/core'
import { IRouteModel, IShipmentModel } from '../../ShipmentModels/ShipmentInterfaces'


export function RouteDetail() {
  let { routeId } = useParams<{ routeId: string}>()
  const [routedetails, setRouteDetails] = useState<IRouteModel>()
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
      await agent.Route.details(routeId).then((response) => {
        setRouteDetails(response)
        setLoadingData(false)
        setLoadingData(false)
      })
    }
    if (loadingData) {
      callFunc()
    }
  }, [routedetails])

  const handleEdit = (event: React.MouseEvent) => {
    handleSelectValue(routedetails!)
  }
  return (
    <div className='row g-5 g-xxl-8'>
      <div className='col-xl-12'>
        <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
          <div className='card-header cursor-pointer'>
            <div className='card-title m-0'>
              <h3 className='fw-bolder m-0'>Route Details</h3>
            </div>
            <a
              href='#_b'
              title='Edit'
              id='#kt_modal_editrole'
              data-bs-toggle='modal'
              data-bs-target='#kt_modal_editroute'
              className='btn btn-primary align-self-center'
              onClick={handleEdit}
            >
              Edit Route
            </a>
          </div>

          <div className='card-body p-9'>
            {routedetails && (
            <>
            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Route Id</label>

              <div className='col-lg-8'>
                <span className='fw-bolder fs-6 text-dark'>
                    {routedetails?.routeId}
                </span>
              </div>
            </div>
            <div className='row mb-7'>
                <label className='col-lg-4 fw-bold text-muted'>Route Name</label>

                <div className='col-lg-8'>
                  <span className='fw-bolder fs-6 text-dark'>
                    {routedetails?.routeName}
                  </span>
                </div>
            </div>
              <div className='row mb-7'>
                <label className='col-lg-4 fw-bold text-muted'>Departure</label>

                <div className='col-lg-8'>
                  <span className='fw-bolder fs-6 text-dark'>
                    {routedetails?.departure}
                  </span>
                </div>
              </div>
              <div className='row mb-7'>
                <label className='col-lg-4 fw-bold text-muted'>Destination</label>

                <div className='col-lg-8'>
                  <span className='fw-bolder fs-6 text-dark'>
                    {routedetails?.destination}
                  </span>
                </div>
              </div>
            </>
            )}

            {!routedetails && <><h4>Sorry, Route does not exit!</h4></>}

          </div>
        </div>
      </div>
    </div>
  )
}
