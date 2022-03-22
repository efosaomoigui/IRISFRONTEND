import {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import agent from '../../../../../setup/axios/AxiosAgent'
import { IShipmentModel } from '../../ShipmentModels/ShipmentInterfaces'


export function ShipmentDetail() {
  let { ShipmentId } = useParams<{ ShipmentId: string}>()
  const [shipmentdetails, setShipmentDetails] = useState<IShipmentModel>()

  function getShipment(shipmentId: string) {
    agent.Shipment.details(ShipmentId).then((response) => {
      setShipmentDetails(response)
    })
  }

  useEffect(() => {
    getShipment(ShipmentId)
  }, [ShipmentId])

  return (
    <div className='row g-5 g-xxl-8'>
      <div className='col-xl-12'>
        <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
          <div className='card-header cursor-pointer'>
            <div className='card-title m-0'>
              <h3 className='fw-bolder m-0'>Shipment Details</h3>
            </div>

            <Link to='/adminSettings/settings' className='btn btn-primary align-self-center'>
              Edit Shipment
            </Link>
          </div>

          <div className='card-body p-9'>
            {shipmentdetails && <>
            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Shipment Name</label>

              <div className='col-lg-8'>
                <span className='fw-bolder fs-6 text-dark'>
                    {shipmentdetails?.ShipmentId}
                </span>
              </div>
            </div>
              <div className='row mb-7'>
                <label className='col-lg-4 fw-bold text-muted'>Shipment Name</label>

                <div className='col-lg-8'>
                  <span className='fw-bolder fs-6 text-dark'>
                    {shipmentdetails?.ShipmentId}
                  </span>
                </div>
              </div>
              <div className='row mb-7'>
                <label className='col-lg-4 fw-bold text-muted'>Waybill</label>

                <div className='col-lg-8'>
                  <span className='fw-bolder fs-6 text-dark'>
                    {shipmentdetails?.Waybill}
                  </span>
                </div>
              </div>
              <div className='row mb-7'>
                <label className='col-lg-4 fw-bold text-muted'>Customer</label>

                <div className='col-lg-8'>
                  <span className='fw-bolder fs-6 text-dark'>
                    {shipmentdetails?.Customer}
                  </span>
                </div>
              </div>
              <div className='row mb-7'>
                <label className='col-lg-4 fw-bold text-muted'>Address Id</label>

                <div className='col-lg-8'>
                  <span className='fw-bolder fs-6 text-dark'>
                    {shipmentdetails?.CustomerAddress}
                  </span>
                </div>
              </div>
              <div className='row mb-7'>
                <label className='col-lg-4 fw-bold text-muted'>Reciever</label>

                <div className='col-lg-8'>
                  <span className='fw-bolder fs-6 text-dark'>
                    {shipmentdetails?.Reciever}
                  </span>
                </div>
              </div>
              <div className='row mb-7'>
                <label className='col-lg-4 fw-bold text-muted'>Reciever Address</label>

                <div className='col-lg-8'>
                  <span className='fw-bolder fs-6 text-dark'>
                    {shipmentdetails?.RecieverAddress}
                  </span>
                </div>
              </div>
              <div className='row mb-7'>
                <label className='col-lg-4 fw-bold text-muted'>Pick Up Options</label>

                <div className='col-lg-8'>
                  <span className='fw-bolder fs-6 text-dark'>
                    {shipmentdetails?.PickupOptions}
                  </span>
                </div>
              </div>
              <div className='row mb-7'>
                <label className='col-lg-4 fw-bold text-muted'>Shipment Items</label>

                <div className='col-lg-8'>
                  <span className='fw-bolder fs-6 text-dark'>
                    {shipmentdetails?.ShipmentItems}
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

            {!shipmentdetails && <><h4>Sorry, Shipment does not exit!</h4></>}

          </div>
        </div>
      </div>
    </div>
  )
}
