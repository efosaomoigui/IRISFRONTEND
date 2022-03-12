import {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import agent from '../../../../../setup/axios/AxiosAgent'
import { IPriceModel } from '../../ShipmentModels/ShipmentInterfaces'


export function PriceSettingDetail() {
  let { id } = useParams<{ id: string}>()
  const [pricedetails, setPriceDetails] = useState<IPriceModel>()

  function getPrice(id: string) {
    agent.Price.details(id).then((response) => {
      setPriceDetails(response)
    })
  }

  useEffect(() => {
    getPrice(id)
  }, [id])

  return (
    <div className='row g-5 g-xxl-8'>
      <div className='col-xl-12'>
        <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
          <div className='card-header cursor-pointer'>
            <div className='card-title m-0'>
              <h3 className='fw-bolder m-0'>Price Setting Details</h3>
            </div>

            <Link to='/adminSettings/settings' className='btn btn-primary align-self-center'>
              Edit Price
            </Link>
          </div>

          <div className='card-body p-9'>
            {pricedetails && <>
            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Price Setting</label>
              <div className='col-lg-8'>
                <span className='fw-bolder fs-6 text-dark'>
                    {pricedetails?.routeId}
                </span>
              </div>
               <div className='col-lg-8'>
                <span className='fw-bolder fs-6 text-dark'>
                    {pricedetails?.routeId}
                </span>
              </div>
            </div>

              <div className='row mb-7'>
                <label className='col-lg-4 fw-bold text-muted'>Category</label>
                <div className='col-lg-8'>
                  <span className='fw-bolder fs-6 text-dark'>
                    {pricedetails?.category}
                  </span>
                </div>
              </div>

              <div className='row mb-7'>
                <label className='col-lg-4 fw-bold text-muted'>RouteId</label>

                <div className='col-lg-8'>
                  <span className='fw-bolder fs-6 text-dark'>
                    {pricedetails?.routeId}
                  </span>
                </div>
              </div>

              <div className='row mb-7'>
                <label className='col-lg-4 fw-bold text-muted'>Route</label>

                <div className='col-lg-8'>
                  <span className='fw-bolder fs-6 text-dark'>
                    {pricedetails?.routeId}
                  </span>
                </div>
              </div>

              <div className='row mb-7'>
                <label className='col-lg-4 fw-bold text-muted'>UnitWeight</label>

                <div className='col-lg-8'>
                  <span className='fw-bolder fs-6 text-dark'>
                    {pricedetails?.unitWeight}
                  </span>
                </div>
              </div>

              <div className='row mb-7'>
                <label className='col-lg-4 fw-bold text-muted'>PricePErUnit</label>

                <div className='col-lg-8'>
                  <span className='fw-bolder fs-6 text-dark'>
                    {pricedetails?.pricePErUnit}
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

            {!pricedetails && <><h4>Sorry, Price does not exit!</h4></>}

          </div>
        </div>
      </div>
    </div>
  )
}
