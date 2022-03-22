import {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import agent from '../../../../../setup/axios/AxiosAgent'
import { usePageData } from '../../../../../_iris/layout/core'
import { IPriceModel } from '../../ShipmentModels/ShipmentInterfaces'


export function PriceSettingDetail() {
  let { id } = useParams<{ id: string}>()
  const [pricedetails, setPriceDetails] = useState<IPriceModel>()
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
      await agent.Price.details(id).then((response) => {
        setPriceDetails(response)
        setLoadingData(false)
        setLoadingData(false)
      })
    }
    if (loadingData) {
      callFunc()
    }
  }, [pricedetails])

  const handleEdit = (event: React.MouseEvent) => {
    handleSelectValue(pricedetails!)
  }
  return (
    <div className='row g-5 g-xxl-8'>
      <div className='col-xl-12'>
        <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
          <div className='card-header cursor-pointer'>
            <div className='card-title m-0'>
              <h3 className='fw-bolder m-0'>Price Setting Details</h3>
            </div>
            <a
              href='#_b'
              title='Edit'
              id='#kt_modal_editrole'
              data-bs-toggle='modal'
              data-bs-target='#kt_modal_editprice'
              className='btn btn-primary align-self-center'
              onClick={handleEdit}
            >
              Edit Price
            </a>
          </div>

          <div className='card-body p-9'>
            {pricedetails && (
               <>
            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Route Id</label>
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
                <label className='col-lg-4 fw-bold text-muted'>Price Per Unit</label>

                <div className='col-lg-8'>
                  <span className='fw-bolder fs-6 text-dark'>
                    {pricedetails?.pricePerUnit}
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
            </>
            )}

            {!pricedetails && <><h4>Sorry, Price does not exit!</h4></>}

          </div>
        </div>
      </div>
    </div>
  )
}
