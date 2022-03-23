import React, {FC} from 'react'
import {KTSVG} from '../../../../../_iris/helpers'
import {Link} from 'react-router-dom'

interface Props {
  waybill?: string
  invoice?: string
}

const Step6: FC<Props> = ({waybill, invoice}: Props) => {
  return (
    <div className='w-100'>
      <div className='pb-8 pb-lg-10'>
        <h2 className='fw-bolder text-dark'>Shipment Order Confirmation!</h2>
      </div>

      <div className='mb-0'>
        <div className='fs-4 text-gray-600 mb-5 alert alert-success'>
          <h4 className='fw-bolder text-dark'>Thank you for shipping with us!</h4>
          <p>
            Your order has been received, and we will begin processing and shipping it within the
            hour. Please use the tracking code supplied to trace your shipment. We value your
            business and look forward to working with you again!
          </p>

          <div className='row mb-12'>
            <div className='col-lg-12'>
              <div className='card' style={{width: '99%'}}>
                <div className='container'>
                  <div className='mb-3'>
                    <h3>Shipment Items</h3>
                  </div>
                  <hr className='bg-success border-1 border-top border-danger'></hr>
                  <div>
                    <div className='row'>
                      <div className='col'>
                        <strong>Shipment Waybill Reference</strong>
                      </div>
                      <div className='col'>{waybill}</div>
                    </div>
                    <div className='row'>
                      <div className='col'>
                        <strong>Invoice Number</strong>
                      </div>
                      <div className='col'>{invoice}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export {Step6}
