import {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import agent from '../../../../../setup/axios/AxiosAgent'
import { IWalletModel } from '../../Models/WalletInterfaces'


export function WalletDetail() {
  let { walletId } = useParams<{ walletId: string}>()
  const [walletdetails, setWalletDetails] = useState<IWalletModel>() 

  function getWallet(walletid: string) {
    agent.Wallet.details(walletid).then((response) => {
      setWalletDetails(response)
    })
  }

  useEffect(() => {
    getWallet(walletId)
  }, [walletId])

  return (
    <div className='row g-5 g-xxl-8'>
      <div className='col-xl-12'>
        <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
          <div className='card-header cursor-pointer'>
            <div className='card-title m-0'>
              <h3 className='fw-bolder m-0'>Wallet Details</h3>
            </div>

            <Link to='/adminSettings/settings' className='btn btn-primary align-self-center'>
              Edit Wallet
            </Link>
          </div>

          <div className='card-body p-9'>
            {walletdetails && <>
            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Wallet Name</label>

              <div className='col-lg-8'>
                <span className='fw-bolder fs-6 text-dark'>
                    {walletdetails!.id}
                </span>
              </div>
            </div>

              <div className='row mb-7'>
                <label className='col-lg-4 fw-bold text-muted'>Wallet Name</label>

                <div className='col-lg-8'>
                  <span className='fw-bolder fs-6 text-dark'>
                    {walletdetails?.id}
                  </span>
                </div>
              </div>
              <div className='row mb-7'>
                <label className='col-lg-4 fw-bold text-muted'>Wallet Number</label>

                <div className='col-lg-8'>
                  <span className='fw-bolder fs-6 text-dark'>
                    {walletdetails?.WalletNumber}
                  </span>
                </div>
              </div>
              <div className='row mb-7'>
                <label className='col-lg-4 fw-bold text-muted'>User Id</label>

                <div className='col-lg-8'>
                  <span className='fw-bolder fs-6 text-dark'>
                    {walletdetails?.UserId}
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

            {!walletdetails && <><h4>Sorry, Wallet does not exit!</h4></>} 

          </div>
        </div>
      </div>
    </div>
  )
}
