/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC} from 'react'
import {KTSVG, toAbsoluteUrl} from '../../../../_iris/helpers'

const AddUserModal: FC = () => {
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
    <div className='modal fade' id='kt_modal_adduser' aria-hidden='true'>
      <div className='modal-dialog mw-650px'>
        <div className='modal-content'>
          <div className='modal-header pb-0 border-0 justify-content-end'>
            <div className='btn btn-sm btn-icon btn-active-color-primary' data-bs-dismiss='modal'>
              <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
            </div>
          </div>

          <div className='modal-body scroll-y mx-5 mx-xl-18 pt-0 pb-15'>
            <div className='text-center mb-13'>
              <h1 className='mb-3'>Create User</h1>

              <div className='text-muted fw-bold fs-5'>
                If you need more info, please check out
                <a href='#' className='link-primary fw-bolder'>
                  {' '}
                  FAQ Page
                </a>
                .
              </div>
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
                <label htmlFor="exampleInputEmail1">UserId</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="UserId"/>
                  <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">FirstName</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="FirstName"/>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">LastName</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="LastName" />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Age</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Age" />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Designation</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Designation" />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Department</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Department" />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">PictureUrl</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="PictureUrl" />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">IsActive</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="IsActive" />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Organisation</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Organisation" />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Status</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Status" />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">DateCreated</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="DateCreated" />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">DateModified</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="DateModified" />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">IsDeleted</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="IsDeleted"/>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">SystemUserId</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="SystemUserId" />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">SystemUserRole</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="SystemUserRole" />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">PasswordExpireDate</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="PasswordExpireDate" />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">IdentificationImage</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="IdentificationImage" />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">WalletNumber</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="WalletNumber" />
              </div>
              {/* <div className="form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
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

export { AddUserModal}
