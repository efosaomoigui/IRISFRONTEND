/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC} from 'react'
import {KTSVG, toAbsoluteUrl} from '../../../helpers'

const AddRouteModal: FC = () => {
  const users = [
    {
      avatar: '/media/avatars/150-1.jpg',
      name: 'Emma Smith',
      email: 'e.smith@kpmg.com.au',
      access: '1',
    },
    {
      state: 'danger',
      name: 'Melody Macy',
      email: 'melody@altbox.com',
      access: '1',
    },
  ]

  return (
    <div className='modal fade' id='kt_modal_addroute' aria-hidden='true'>
      <div className='modal-dialog mw-650px'>
        <div className='modal-content'>
          <div className='modal-header pb-0 border-0 justify-content-end'>
            <div className='btn btn-sm btn-icon btn-active-color-primary' data-bs-dismiss='modal'>
              <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
            </div>
          </div>

          <div className='modal-body scroll-y mx-5 mx-xl-18 pt-0 pb-15'>
            <div className='text-center mb-13'>
              <h1 className='mb-3'>Add Route</h1>

              <div className='text-muted fw-bold fs-5'>
                If you need more info, please check out
                <a href='#' className='link-primary fw-bolder'>
                  {' '}
                  FAQ Page
                </a>
                .
              </div>
            </div>

            <div className='btn btn-light-primary fw-bolder w-100 mb-8'>
              <img
                alt='Logo'
                src={toAbsoluteUrl('/media/svg/brand-logos/google-icon.svg')}
                className='h-20px me-3'
              />
              Invite Gmail Contacts
            </div>

            {/* form starts from here */}
            <div className='separator d-flex flex-center mb-8'>
              <span className='text-uppercase bg-body fs-7 fw-bold text-muted px-3'>or</span>
            </div>

            <textarea
              className='form-control form-control-solid mb-8'
              rows={3}
              placeholder='Type or paste emails here'
            ></textarea>

            <form>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">RouteId</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="RouteId" />
                {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">RouteName</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="RouteName" />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">DepartureCentreId</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="DepartureCentreId" />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">DepartureCenter</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="DepartureCenter" />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">DestinationCentreId</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="DestinationCentreId" />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">DestinationCenter</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="DestinationCenter" />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">IsSubRoute</label>
                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">DispatchFee</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="DispatchFee" />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">LoaderFee</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="LoaderFee" />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">CaptainFee</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="CaptainFee" />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">MainRouteId</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="MainRouteId" />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">AvailableAtTerminal</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="AvailableAtTerminal" />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">AvailableOnline</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="AvailableOnline" />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">RouteType</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="RouteType" />
              </div>
              {/* <div className="form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
              </div> */}
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>

          </div>
        </div>
      </div>
    </div>
  )
}

export { AddRouteModal}
