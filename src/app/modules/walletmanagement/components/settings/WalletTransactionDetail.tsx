import {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import agent from '../../../../../setup/axios/AxiosAgent'
import { usePageData } from '../../../../../_iris/layout/core'
import { IWalletTransactionModel } from '../../Models/WalletInterfaces'


export function WalletTransactionDetail() {
  let {id} = useParams<{id: string}>()
  const [wallettranscationdetails, setWalletTransactionDetails] = useState<IWalletTransactionModel>()
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
      await agent.WalletTransaction.details(id).then((response) => {
        setWalletTransactionDetails(response)
        setLoadingData(false)
        setLoadingData(false)
      })
    }
    if (loadingData) {
      callFunc()
    }
  }, [wallettranscationdetails])

  const handleEdit = (event: React.MouseEvent) => {
    handleSelectValue(wallettranscationdetails!)
  }
  return (
    <div className='row g-5 g-xxl-8'>
      <div className='col-xl-12'>
        <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
          <div className='card-header cursor-pointer'>
            <div className='card-title m-0'>
              <h3 className='fw-bolder m-0'>Wallet Transaction Details</h3>
            </div>
            <a
              href='#_b'
              title='Edit'
              id='#kt_modal_editwallettransaction'
              data-bs-toggle='modal'
              data-bs-target='#kt_modal_editwallettransaction'
              className='btn btn-primary align-self-center'
              onClick={handleEdit}
            >
              Edit Wallet Transaction
            </a>
          </div>

          <div className='card-body p-9'>
            {wallettranscationdetails && (
               <>
            {/* <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Transaction Id</label>
              <div className='col-lg-8'>
                <span className='fw-bolder fs-6 text-dark'>
                    {wallettranscationdetails?.id}
                </span>
              </div>
            </div> */}
              <div className='row mb-7'>
                <label className='col-lg-4 fw-bold text-muted'>User Id</label>

                <div className='col-lg-8'>
                  <span className='fw-bolder fs-6 text-dark'>
                    {wallettranscationdetails?.userId}
                  </span>
                </div>
              </div>
              <div className='row mb-7'>
                <label className='col-lg-4 fw-bold text-muted'>Amount</label>
                <div className='col-lg-8'>
                  <span className='fw-bolder fs-6 text-dark'>
                    {wallettranscationdetails?.amount}
                  </span>
                </div>
              </div>
              <div className='row mb-7'>
                <label className='col-lg-4 fw-bold text-muted'>Transaction type</label>

                <div className='col-lg-8'>
                  <span className='fw-bolder fs-6 text-dark'>
                    {wallettranscationdetails?.transactionType}
                  </span>
                </div>
              </div>
              <div className='row mb-7'>
                <label className='col-lg-4 fw-bold text-muted'>Description</label>
                <div className='col-lg-8'>
                  <span className='fw-bolder fs-6 text-dark'>
                    {wallettranscationdetails?.description}
                  </span>
                </div>
              </div>
              
            </>
            )}

            {!wallettranscationdetails && <><h4>Sorry, Wallet Transaction does not exit!</h4></>}

          </div>
        </div>
      </div>
    </div>
  )
}
