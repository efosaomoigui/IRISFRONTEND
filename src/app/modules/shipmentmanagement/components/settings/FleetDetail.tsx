import {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import agent from '../../../../../setup/axios/AxiosAgent'
import { usePageData } from '../../../../../_iris/layout/core'
import { IFleetModel } from '../../ShipmentModels/ShipmentInterfaces'


export function FleetDetail() {
  let { fleetId } = useParams<{ fleetId: string}>()
  const [fleetdetails, setFleetDetails] = useState<IFleetModel>()
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
      await agent.Fleet.details(fleetId).then((response) => {
        setFleetDetails(response)
        setLoadingData(false)
        setLoadingData(false)
      })
    }
    if (loadingData) {
      callFunc()
    }
  }, [fleetdetails])

  const handleEdit = (event: React.MouseEvent) => {
    handleSelectValue(fleetdetails!)
  }
  return (
    <div className='row g-5 g-xxl-8'>
      <div className='col-xl-12'>
        <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
          <div className='card-header cursor-pointer'>
            <div className='card-title m-0'>
              <h3 className='fw-bolder m-0'>Fleet Details</h3>
            </div>
            <a
              href='#_b'
              title='Edit'
              id='#kt_modal_editrole'
              data-bs-toggle='modal'
              data-bs-target='#kt_modal_editfleet'
              className='btn btn-primary align-self-center'
              onClick={handleEdit}
            >
              Edit Fleet
            </a>
          </div>

          <div className='card-body p-9'>
            {fleetdetails && (
            <>
            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Fleet Name</label>

              <div className='col-lg-8'>
                <span className='fw-bolder fs-6 text-dark'>
                    {fleetdetails?.fleetId}
                </span>
              </div>
            </div>

              <div className='row mb-7'>
                <label className='col-lg-4 fw-bold text-muted'>Registration Name</label>

                <div className='col-lg-8'>
                  <span className='fw-bolder fs-6 text-dark'>
                  </span>
                </div>
              </div>

              <div className='row mb-7'>
                <label className='col-lg-4 fw-bold text-muted'>chasis Number</label>

                <div className='col-lg-8'>
                  <span className='fw-bolder fs-6 text-dark'>
                    {fleetdetails?.chassisNumber}
                  </span>
                </div>
              </div>

              <div className='row mb-7'>
                <label className='col-lg-4 fw-bold text-muted'>fleet Type</label>

                <div className='col-lg-8'>
                  <span className='fw-bolder fs-6 text-dark'>
                    {fleetdetails?.fleetMake}
                  </span>
                </div>
              </div>

              <div className='row mb-7'>
                <label className='col-lg-4 fw-bold text-muted'>capacity</label>

                <div className='col-lg-8'>
                  <span className='fw-bolder fs-6 text-dark'>
                    {fleetdetails?.capacity}
                  </span>
                </div>
              </div>

              <div className='row mb-7'>
                <label className='col-lg-4 fw-bold text-muted'>description</label>

                <div className='col-lg-8'>
                  <span className='fw-bolder fs-6 text-dark'>
                  </span>
                </div>
              </div>

            

            
            </>
            )}

            {!fleetdetails && <><h4>Sorry, Fleet does not exit!</h4></>}

          </div>
        </div>
      </div>
    </div>
  )
}
