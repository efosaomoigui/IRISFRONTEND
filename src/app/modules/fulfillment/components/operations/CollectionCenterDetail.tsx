import {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import agent from '../../../../../setup/axios/AxiosAgent'
import { usePageData } from '../../../../../_iris/layout/core'

import { IFulfilmentModel } from '../../models/FulfilmentInterface'



export function CollectionCenterDetail() {
  let {CollectionCenterId} = useParams<{CollectionCenterId: string}>()
  const [collectioncenterdetails, setCollectionCenterDetails] = useState<IFulfilmentModel>()
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
      await agent.CollectionCenter.details(CollectionCenterId).then((response) => {
        setCollectionCenterDetails(response)
        setLoadingData(false)
        setLoadingData(false)
      })
    }
    if (loadingData) {
      callFunc()
    }
  }, [collectioncenterdetails])

  const handleEdit = (event: React.MouseEvent) => {
    handleSelectValue(collectioncenterdetails!)
  }

  return (
    <div className='row g-5 g-xxl-8'>
      <div className='col-xl-12'>
        <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
          <div className='card-header cursor-pointer'>
            <div className='card-title m-0'>
              <h3 className='fw-bolder m-0'>Collection Center Details</h3>
            </div>
            <a
              href='#_b'
              title='Edit'
              id='#kt_modal_editcollectioncenter'
              data-bs-toggle='modal'
              data-bs-target='#kt_modal_editcollectioncenter'
              className='btn btn-primary align-self-center'
              onClick={handleEdit}
            >
              Edit Collection Center
            </a>
          </div>

          <div className='card-body p-9'>
            {collectioncenterdetails && (
            <>
            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Shipment Id</label>

              <div className='col-lg-8'>
                <span className='fw-bolder fs-6 text-dark'>
                  {collectioncenterdetails?.shipmentId}
                </span>
              </div>
            </div>

            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Shipment</label>

              <div className='col-lg-8'>
                <span className='fw-bolder fs-6 text-dark'>
                  {collectioncenterdetails?.shipment}
                </span>
              </div>
            </div>

            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Shipment Id</label>

              <div className='col-lg-8'>
                <span className='fw-bolder fs-6 text-dark'>
                  {collectioncenterdetails?.shipmentId}
                </span>
              </div>
            </div>

            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>User Id</label>

              <div className='col-lg-8'>
                <span className='fw-bolder fs-6 text-dark'>
                  {collectioncenterdetails?.userId}
                </span>
              </div>
            </div>
            </>
            )}

            {!collectioncenterdetails && <><h4>Sorry, Collection Center Log does not exit!</h4></>}

          </div>
        </div>
      </div>
    </div>
  )
}
