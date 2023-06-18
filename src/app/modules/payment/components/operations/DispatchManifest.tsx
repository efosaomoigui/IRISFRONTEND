import React from 'react'
import paid from './paid.png'
import unpaid from './unpaid.png'
import logo from './logo-1.png'
import './print.css'

import {numberFormat} from '../../../walletmanagement/Models/WalletInterfaces'
import {format} from 'date-fns'

interface Props {
  shipmentdetails: any
}
const DispatchManifest = ({shipmentdetails}: Props) => {
  var Barcode = require('react-barcode')

  const volume = (l: number, b: number, h: number) => {
    return l * b * h
  }

  const volumetricWeight = (volume: number) => {
    return Number((volume / 6000).toFixed(4))
  }

  const chargeableWeight = (volumetricWeight: number, w: number) => {
    return volumetricWeight > w ? volumetricWeight : w
  }

  const finalTotal = (grandTotal: number, vaTValue: number) => {
    const total = grandTotal + vaTValue
    return total
  }

  const vatValue = (vat: number, grandTotal: number) => {
    const vatValue = vat === 0 ? 0 : (1 / 100) * grandTotal
    return vatValue
  }

  return (
    <>
      <div className='pb-12'>
        <div className='d-flex flex-column gap-7 gap-md-10 section-to-print cell output_wrapper output'>
          <div className='table-responsive'>
            <table className='table align-middle table-row-dashed fs-6 gy-5 mb-0'>
              <tbody>
                <tr>
                  <td colSpan={2}>
                    <div className='flex-root d-flex flex-column'>
                      <div className='fw-bolder fs-2'>
                        Dear <span className='fs-6'></span>,
                        <br />
                        <span className='text-muted fs-5'>
                          Here are your order details. We thank you for your purchase.
                        </span>
                      </div>
                    </div>
                  </td>
                  <td style={{width: '260px'}}></td>
                  <td colSpan={3}>
                    <div className='flex-root d-flex flex-column text-end'>
                      <img src={logo} width={200} alt='Logo' />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className='separator'></div>

          <div className='d-flex justify-content-between flex-column'>
            <div className='table-responsive border-bottom mb-9'>
              <table className='table align-middle table-row-dashed fs-6 gy-5 mb-0'>
                <thead>
                  <tr className='border-bottom fs-6 fw-bolder text-muted'>
                    <th className='min-w-175px pb-2'>Description</th>
                    <th className='min-w-70px text-end pb-2'>Gross Weight(kg)</th>
                    <th className='min-w-70px text-end pb-2'>
                      Volume (cm<sup>3</sup>)
                    </th>
                    <th className='min-w-70px text-end pb-2'>
                      Volumetric Weight (kgcm<sup>3</sup>)
                    </th>
                    <th className='min-w-70px text-end pb-2'>Chargeable Weight (kg)</th>
                    <th className='min-w-80px text-end pb-2'>QTY</th>
                    <th className='min-w-100px text-end pb-2'>Total</th>
                  </tr>
                </thead>
                <tbody className='fw-bold text-gray-600'>
                    <tr>
                      <td>
                        <div className='d-flex align-items-center'>
                          <a
                            href='/metronic8/demo1/../demo1/apps/ecommerce/catalog/edit-product.html'
                            className='symbol symbol-50px'
                          >
                            <span className='symbol-label'></span>
                          </a>

                          <div className='ms-5'>
                          </div>
                        </div>
                      </td>

                      <td className='text-end'></td>

                      <td className='text-end'>
                      </td>
                      <td className='text-end'>
                      </td>
                      <td className='text-end'>
                      </td>
                      <td className='text-end'></td>
                      <td className='text-end'></td>
                    </tr>

                  <tr>
                    <td colSpan={6} className='text-end'>
                      Subtotal
                    </td>
                    <td className='text-end'></td>
                  </tr>

                  <tr>
                    <td colSpan={6} className='text-end'>
                      VAT (5%)
                    </td>
                    <td className='text-end'>
                    </td>
                  </tr>

                  <tr>
                    <td colSpan={6} className='fs-3 text-dark fw-bolder text-end'>
                      Grand Total
                    </td>
                    <td className='text-dark fs-3 fw-boldest text-end'>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className='foot' style={{position: 'absolute', bottom: '0px'}}>
          <span>
            <span className='text-muted fw-bold me-2'>Contact Us &copy;</span>
            <a href='#' className='text-gray-800 text-hover-primary'>
              Chisco Iris, 104, Funsho Williams Avenue, Iponri, Costain, Lagos, Nigeria, Tel:
              +2348189999960
            </a>
          </span>
        </div>
      </div>
    </>
  )
}

export default DispatchManifest
