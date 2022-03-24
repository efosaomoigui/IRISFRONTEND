/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../../setup';
import { KTSVG } from '../../../_iris/helpers';
import { IUserModel } from '../auth/models/AuthInterfaces';


const UserHeader: React.FC = () => {
  // const location = useLocation()

  const user: IUserModel = useSelector<RootState>(({auth}) => auth.user, shallowEqual) as IUserModel

  // const dispatch = useDispatch()

  return (
    <div className='card mb-5 mb-xl-10'>
      <div className='card-body pt-9 pb-0'>
        <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>

          <div className='flex-grow-1'>
            <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
              <div className='d-flex flex-column'>
                <div className='d-flex align-items-center mb-2'>
                  <a href='#' className='text-gray-800 text-hover-primary fs-2 fw-bolder me-1'>
                    {user.firstName} {user.lastName}
                  </a>
                  {/* <a href='#'>
                    <KTSVG
                      path='/media/icons/duotune/general/gen026.svg'
                      className='svg-icon-1 svg-icon-primary'
                    />
                  </a> */}
                </div>

                <div className='d-flex flex-wrap fw-bold fs-6 mb-4 pe-2'>
                  <a
                    href='#'
                    className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'
                  >
                    <KTSVG
                      path='/media/icons/duotune/communication/com006.svg'
                      className='svg-icon-4 me-1'
                    />
                    {user.roles![0]}
                  </a>
                  <a
                    href='#'
                    className='d-flex align-items-center text-gray-400 text-hover-primary mb-2'
                  >
                    <KTSVG
                      path='/media/icons/duotune/communication/com011.svg'
                      className='svg-icon-4 me-1'
                    />
                    {user.email}
                  </a>
                </div>
              </div>

              <div className='d-flex my-4'>
                {/* <Link className='btn btn-sm btn-light me-2' id='kt_user_follow_button' to={`/wallet/wtransactions/${user.userId}`}>
                  <KTSVG
                    path='/media/icons/duotune/arrows/arr012.svg'
                    className='svg-icon-3 d-none'
                  />

                  <span className='indicator-label'>My Wallet</span>
                  <span className='indicator-progress'>
                    Please wait...
                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                  </span>
                </Link> */}
                <Link
                  href='src/app/modules/pageheader/MyIris'
                  className='btn btn-sm btn-primary me-3'
                  data-bs-toggle='modal'
                  data-bs-target='#kt_modal_offer_a_deal' 
                  to={`/wallet/wtransactions/${user.userId}`}                >
                  My Wallet
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export { UserHeader };

