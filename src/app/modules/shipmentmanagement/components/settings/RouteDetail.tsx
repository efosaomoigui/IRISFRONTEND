import {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import agent from '../../../../../setup/axios/AxiosAgent'
import { IRouteModel, IShipmentModel } from '../../ShipmentModels/ShipmentInterfaces'


export function RouteDetail() {
  let { routeid } = useParams<{ routeid: string}>()
  const [routedetails, setRouteDetails] = useState<IRouteModel>()

  function getRoute(routeid: string) {
    agent.Route.details(routeid).then((response) => {
      setRouteDetails(response)
    })
  }

  useEffect(() => {
    getRoute(routeid)
  }, [routeid])

  return (
    <div className='row g-5 g-xxl-8'>
      <div className='col-xl-12'>
        <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
          <div className='card-header cursor-pointer'>
            <div className='card-title m-0'>
              <h3 className='fw-bolder m-0'>Route Details</h3>
            </div>

            <Link to='/adminSettings/settings' className='btn btn-primary align-self-center'>
              Edit Route
            </Link>
          </div>

          <div className='card-body p-9'>
            {routedetails && <>
            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Route Name</label>

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

            <div className='row mb-10'>
              <label className='col-lg-4 fw-bold text-muted'>Allow Changes</label>

              <div className='col-lg-8'>
                <span className='fw-bold fs-6'>Yes</span>
              </div>
            </div>
            </>}

            {!routedetails && <><h4>Sorry, Route does not exit!</h4></>}

          </div>
        </div>
      </div>
    </div>
  )
}
