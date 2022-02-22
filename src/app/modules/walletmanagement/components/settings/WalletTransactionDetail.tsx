import {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import agent from '../../../../../setup/axios/AxiosAgent'
import { IWalletModel, IWalletTransactionModel } from '../../Models/WalletInterfaces'


export function WalletTransactionDetail() {
  let { wallettransactionId } = useParams<{ wallettransactionId: string}>()
  const [wallettranscationdetails, setRoleDetails] = useState<IWalletTransactionModel>()

  function getRole(wallettransactionid: string) {
    agent.WalletTransaction.details(wallettransactionid).then((response) => {
      setRoleDetails(response)
    })
  }

  useEffect(() => {
    getRole(wallettransactionId)
  }, [wallettransactionId])

  return (
    <div className='row g-5 g-xxl-8'>
      <div className='col-xl-12'>
        <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
          <div className='card-header cursor-pointer'>
            <div className='card-title m-0'>
              <h3 className='fw-bolder m-0'>Wallet Transaction Details</h3>
            </div>

            <Link to='/adminSettings/settings' className='btn btn-primary align-self-center'>
              Edit Wallet Transaction
            </Link>
          </div>

          <div className='card-body p-9'>
            {wallettranscationdetails && <>
            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Wallet Transaction Name</label>

              <div className='col-lg-8'>
                <span className='fw-bolder fs-6 text-dark'>
                    {wallettranscationdetails?.WalletTransactionId}
                </span>
              </div>
            </div>
              <div className='row mb-7'>
                <label className='col-lg-4 fw-bold text-muted'>Wallet Transaction Name</label>

                <div className='col-lg-8'>
                  <span className='fw-bolder fs-6 text-dark'>
                    {wallettranscationdetails?.WalletTransactionId}
                  </span>
                </div>
              </div>
              <div className='row mb-7'>
                <label className='col-lg-4 fw-bold text-muted'>Amount</label>

                <div className='col-lg-8'>
                  <span className='fw-bolder fs-6 text-dark'>
                    {wallettranscationdetails?.Amount}
                  </span>
                </div>
              </div>
              <div className='row mb-7'>
                <label className='col-lg-4 fw-bold text-muted'>Transaction Type</label>

                <div className='col-lg-8'>
                  <span className='fw-bolder fs-6 text-dark'>
                    {wallettranscationdetails?.TransactionType}
                  </span>
                </div>
              </div>
              <div className='row mb-7'>
                <label className='col-lg-4 fw-bold text-muted'>Description</label>

                <div className='col-lg-8'>
                  <span className='fw-bolder fs-6 text-dark'>
                    {wallettranscationdetails?.Description}
                  </span>
                </div>
              </div>
              <div className='row mb-7'>
                <label className='col-lg-4 fw-bold text-muted'>Wallet Number</label>

                <div className='col-lg-8'>
                  <span className='fw-bolder fs-6 text-dark'>
                    {wallettranscationdetails?.WalletNumber}
                  </span>
                </div>
              </div>
              <div className='row mb-7'>
                <label className='col-lg-4 fw-bold text-muted'>Date Created</label>

                <div className='col-lg-8'>
                  <span className='fw-bolder fs-6 text-dark'>
                    {wallettranscationdetails?.DateCreated}
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

            {!wallettranscationdetails && <><h4>Sorry, Wallet Transaction does not exit!</h4></>}

          </div>
        </div>
      </div>
    </div>
  )
}
