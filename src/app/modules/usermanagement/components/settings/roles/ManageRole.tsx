import React, {useState} from 'react'
import {IRoleModel} from '../../../../auth/models/AuthInterfaces'

const ManageRole: React.FC = () => {
  const [data, setData] = useState<IRoleModel>()

  const updateData = (fieldsToUpdate: Partial<IRoleModel>) => {
    const updatedData = {...data, ...fieldsToUpdate}
    // setData(updatedData)
  }

  const [loading, setLoading] = useState(false)

  const click = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  return (
    <div className='card mb-5 mb-xl-10'>
      <div
        className='card-header border-0 cursor-pointer'
        role='button'
        data-bs-toggle='collapse'
        data-bs-target='#kt_account_email_preferences'
        aria-expanded='true'
        aria-controls='kt_account_email_preferences'
      >
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>Manage Role</h3>
        </div>
      </div>

      <div id='kt_account_email_preferences' className='collapse show'>
        <form className='form'>
          <div className='card-body border-top px-9 py-9'>
            <label className='form-check form-check-custom form-check-solid align-items-start'>
              <input className='form-check-input me-3' type='checkbox' defaultChecked={true} name='email-preferences[]' />

              <span className='form-check-label d-flex flex-column align-items-start'>
                <span className='fw-bolder fs-5 mb-0'>Iris Administrator</span>
                <span className='text-muted fs-6'>
                  The role allow you to have access to preferebces management.
                </span>
              </span>
            </label>

            <div className='separator separator-dashed my-6'></div>

            <label className='form-check form-check-custom form-check-solid align-items-start'>
              <input className='form-check-input me-3' type='checkbox' name='email-preferences[]' />

              <span className='form-check-label d-flex flex-column align-items-start'>
                <span className='fw-bolder fs-5 mb-0'>Fleet Officer</span>
                <span className='text-muted fs-6'>
                  The manages the fleet officers on the platform
                </span>
              </span>
            </label>

            <div className='separator separator-dashed my-6'></div>

            <label className='form-check form-check-custom form-check-solid align-items-start'>
              <input className='form-check-input me-3' type='checkbox' name='email-preferences[]' />

              <span className='form-check-label d-flex flex-column align-items-start'>
                <span className='fw-bolder fs-5 mb-0'>The Ceo</span>
                <span className='text-muted fs-6'>
                  Allow overview of all services and account information
                </span>
              </span>
            </label>

            <div className='separator separator-dashed my-6'></div>

            <label className='form-check form-check-custom form-check-solid align-items-start'>
              <input className='form-check-input me-3' type='checkbox' name='email-preferences[]' />

              <span className='form-check-label d-flex flex-column align-items-start'>
                <span className='fw-bolder fs-5 mb-0'>Corportate Customer</span>
                <span className='text-muted fs-6'>Role for corporate clients.</span>
              </span>
            </label>

            <div className='separator separator-dashed my-6'></div>

            <label className='form-check form-check-custom form-check-solid align-items-start'>
              <input
                className='form-check-input me-3'
                type='checkbox'
                name='email-preferences[]'
                defaultChecked={true}
              />

              <span className='form-check-label d-flex flex-column align-items-start'>
                <span className='fw-bolder fs-5 mb-0'>Individual Customer</span>
                <span className='text-muted fs-6'>Role for customers</span>
              </span>
            </label>

            <div className='separator separator-dashed my-6'></div>

            <label className='form-check form-check-custom form-check-solid align-items-start'>
              <input
                className='form-check-input me-3'
                type='checkbox'
                name='email-preferences[]'
                defaultChecked={true}
              />

              <span className='form-check-label d-flex flex-column align-items-start'>
                <span className='fw-bolder fs-5 mb-0'>Iris Freight Partner</span>
                <span className='text-muted fs-6'>
                  Role for freight forwarding partners.
                </span>
              </span>
            </label>

            <div className='separator separator-dashed my-6'></div>

            <label className='form-check form-check-custom form-check-solid align-items-start'>
              <input className='form-check-input me-3' type='checkbox' name='email-preferences[]' />

              <span className='form-check-label d-flex flex-column align-items-start'>
                <span className='fw-bolder fs-5 mb-0'>Human Resource Manager</span>
                <span className='text-muted fs-6'>
                  Role for the HR
                </span>
              </span>
            </label>
          </div>

          <div className='card-footer d-flex justify-content-end py-6 px-9'>
            <button className='btn btn-white btn-active-light-primary me-2'>Discard</button>
            <button type='button' onClick={click} className='btn btn-primary'>
              {!loading && 'Save Changes'}
              {loading && (
                <span className='indicator-progress' style={{display: 'block'}}>
                  Please wait...{' '}
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export {ManageRole}
