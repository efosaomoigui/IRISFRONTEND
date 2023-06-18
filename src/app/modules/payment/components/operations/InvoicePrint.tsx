import React from 'react'
import paid from './paid.png'
import unpaid from './unpaid.png'
import logo from './logo-1.png'
import './print.css'

import {numberFormat} from '../../../walletmanagement/Models/WalletInterfaces'
import {format} from 'date-fns'
import {product} from '../../../shipmentmanagement/ShipmentModels/ShipmentInterfaces'

interface Props {
  shipmentdetails: any
}
const InvoicePrint = ({shipmentdetails}: Props) => {
  var Barcode = require('react-barcode')

  const volume = (l: number, b: number, h: number) => {
    return l * b * h
  }

  const productLabel = (value: number) => {
    let productLabel = product.find((item) => item.optionValue === value)
    return productLabel!.optionLabel
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
          {/* <div className='d-flex flex-column flex-sm-row gap-7 gap-md-10 fw-bolder' style={{float: 'right'}}>
            <div className='flex-root d-flex flex-column'>
              <div className='fw-bolder fs-2'>
                Dear {shipmentdetails.customerName} <span className='fs-6'>(f.mit@kpmg.com)</span>,
                <br />
                <span className='text-muted fs-5'>Here are your order details. We thank you for your purchase.</span>
              </div>
            </div>
            <div className='flex-root d-flex flex-column text-end'>
              {shipmentdetails.paidStatus === 'Paid' && <img src={paid} width={80} alt='Logo' />}
              {shipmentdetails.paidStatus === 'Pending' && <img src={unpaid} alt='Logo' width={80} />}
            </div>
          </div> */}
          <div className='table-responsive'>
            <table className='table align-middle table-row-dashed fs-6 gy-5 mb-0'>
              <tbody>
                <tr>
                  <td colSpan={2}>
                    <div className='flex-root d-flex flex-column'>
                      <div className='fw-bolder fs-2'>
                        Dear {shipmentdetails.customerName} <span className='fs-6'></span>,
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

          {/* <div className='d-flex flex-column flex-sm-row gap-7 gap-md-10 fw-bolder'>
            <div className='flex-root d-flex flex-column'>
              <span className='text-muted'>Shipment Category</span>
              <span className='fs-5'>
                {shipmentdetails.shipmentCategory === '1' && 'Mail And Parcel'}
                {shipmentdetails.shipmentCategory === 'MailAndParcel' && 'Mail And Parcel'}
                {shipmentdetails.shipmentCategory === '0' && 'Mail And Parcel'}
                {shipmentdetails.shipmentCategory === '0' && 'Mail And Parcel'}
                {shipmentdetails.shipmentCategory === '3' && 'International Freight'}
                {shipmentdetails.shipmentCategory === 'InternationalFreight' && 'International Freight'}
                {shipmentdetails.shipmentCategory === '2' && 'Truck Load'}
                {shipmentdetails.shipmentCategory === 'TruckLoad' && 'Truck Load'}
              </span>
            </div>
            <div className='flex-root d-flex flex-column'>
              <span className='text-muted'>Date</span>
              <span className='fs-5'>{shipmentdetails.createdDate}</span>
            </div>
            <div className='flex-root d-flex flex-column'>
              <span className='text-muted'>Invoice ID</span>
              <span className='fs-5'>{shipmentdetails.invoice && <Barcode width={2} height={40} margin={0} fontSize={10} value={shipmentdetails.invoice} />}</span>
            </div>
            <div className='flex-root d-flex flex-column'>
              <span className='text-muted'>Shipment Waybill</span>
              <span className='fs-5'>{shipmentdetails.waybill && <Barcode width={2} height={40} margin={0} fontSize={10} value={shipmentdetails.waybill} />}</span>
            </div>
          </div> */}

          {/* <div className='d-flex flex-column flex-sm-row gap-7 gap-md-10 fw-bolder'>
            <div className='flex-root d-flex flex-column'>
              <span className='text-muted'>Billing Address</span>
              <span className='fs-6'>
                {shipmentdetails.customerName} <br />
                {shipmentdetails.customerAddress}
                <br />
                From: {shipmentdetails.departure}
                <br />
                Tel: {'+' + shipmentdetails.customerPhoneNumber}
              </span>
            </div>
            <div className='flex-root d-flex flex-column'>
              <span className='text-muted'>Shipping Address</span>
              <span className='fs-6'>
                {shipmentdetails.recieverName} <br />
                {shipmentdetails.recieverAddress}
                <br />
                To: {shipmentdetails.destination}
                <br />
                Tel: {'+' + shipmentdetails.recieverPhoneNumber}
              </span>
            </div>
          </div> */}

          <div className='table-responsive border-bottom mb-9'>
            <table className='table align-middle table-row-dashed fs-6 gy-5 mb-0'>
              <tbody>
                <tr>
                  <td>
                    <div className='flex-root d-flex flex-column'>
                      <span className='text-muted'>Shipment Category</span>
                      <span className='fs-5 font-weight-bold'>
                        <strong>
                          {shipmentdetails.shipmentCategory === '1' && 'Mail And Parcel'}
                          {shipmentdetails.shipmentCategory === 'MailAndParcel' &&
                            'Mail And Parcel'}
                          {shipmentdetails.shipmentCategory === '0' && 'Mail And Parcel'}
                          {shipmentdetails.shipmentCategory === '0' && 'Mail And Parcel'}
                          {shipmentdetails.shipmentCategory === '3' && 'International Freight'}
                          {shipmentdetails.shipmentCategory === 'InternationalFreight' &&
                            'International Freight'}
                          {shipmentdetails.shipmentCategory === '2' && 'Truck Load'}
                          {shipmentdetails.shipmentCategory === 'TruckLoad' && 'Truck Load'}
                        </strong>
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className='flex-root d-flex flex-column'>
                      <span className='text-muted'>Date</span>
                      <span className='fs-5'>
                        {format(new Date(shipmentdetails.createdDate), 'dd/mm/yyyy HH:mm:ss')}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className='flex-root d-flex flex-column'>
                      <span className='text-muted'>Invoice ID</span>
                      <span className='fs-5'>
                        {shipmentdetails.invoice && (
                          <Barcode
                            width={2}
                            height={40}
                            margin={0}
                            fontSize={10}
                            value={shipmentdetails.invoice}
                          />
                        )}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className='flex-root d-flex flex-column'>
                      <span className='text-muted'>Shipment Waybill</span>
                      <span className='fs-5'>
                        {shipmentdetails.waybill && (
                          <Barcode
                            width={2}
                            height={40}
                            margin={0}
                            fontSize={10}
                            value={shipmentdetails.waybill}
                          />
                        )}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className='flex-root d-flex flex-column text-end'>
                      {shipmentdetails.paidStatus === 'Paid' && (
                        <img src={paid} width={80} alt='Logo' />
                      )}
                      {shipmentdetails.paidStatus === 'Pending' && (
                        <img src={unpaid} alt='Logo' width={80} />
                      )}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <span className='text-muted'>Billing Address</span>
                    <br />
                    <span className='fs-6'>
                      <strong>
                        {shipmentdetails.customerName} <br />
                        {shipmentdetails.customerAddress}
                        <br />
                        Tel: {'+' + shipmentdetails.customerPhoneNumber}
                        <br />
                        From: {shipmentdetails.departure}
                      </strong>
                    </span>
                  </td>
                  <td colSpan={2}>
                    <span className='text-muted'>Shipping Address</span>
                    <br />
                    <span className='fs-6'>
                      {' '}
                      <strong>
                        {shipmentdetails.recieverName} <br />
                        {shipmentdetails.recieverAddress}
                        <br />
                        Tel: {'+' + shipmentdetails.recieverPhoneNumber}
                        <br />
                        To: {shipmentdetails.destination}
                      </strong>
                    </span>
                  </td>
                  <td>
                    <span className='text-muted'>Delivery Status</span>
                    <br />
                    <strong>{shipmentdetails.shipmentCategory}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className='d-flex justify-content-between flex-column'>
            {shipmentdetails.shipmentCategory === 'TruckLoad' && (
              <div className='table-responsive border-bottom mb-9'>
                <table className='table align-middle table-row-dashed fs-6 gy-5 mb-0'>
                  <thead>
                    <tr className='border-bottom fs-6 fw-bolder text-muted'>
                      <th className='min-w-175px pb-2'>Shipment Description</th>
                      <th className='min-w-70px text-end pb-2'>Product</th>
                      <th className='min-w-70px text-end pb-2'>Truck Capacity</th>
                      <th className='min-w-70px text-end pb-2'>Quantity</th>
                      <th className='min-w-100px text-end pb-2'>Total</th>
                    </tr>
                  </thead>
                  <tbody className='fw-bold text-gray-600'>
                    {shipmentdetails!.shipmentItems!.map((item: any, index: number) => (
                      <tr key={index}>
                        <td>
                          <div className='d-flex align-items-center'>
                            <div className='ms-5'>
                              <div className='fs-7 text-muted'>{item.shipmentDescription}</div>
                            </div>
                          </div>
                        </td>
                        <td className='text-end'>{productLabel(item.shipmentProduct)}</td>
                        <td className='text-end'>{item.weight}</td>
                        <td className='text-end'>{item.quantity}</td>
                        <td className='text-end'>{numberFormat(Number(item.lineTotal))}</td>
                      </tr>
                    ))}

                    <tr>
                      <td></td>
                      <td colSpan={3} className='text-end'>
                        Subtotal
                      </td>
                      <td className='text-end'>
                        {numberFormat(Number(shipmentdetails.grandTotal))}
                      </td>
                    </tr>

                    <tr>
                      <td></td>
                      <td colSpan={3} className='text-end'>
                        VAT (5%)
                      </td>
                      <td className='text-end'>
                        {numberFormat(vatValue(5, Number(shipmentdetails.grandTotal)))}
                      </td>
                    </tr>

                    {/* <tr>
                    <td colSpan={3} className='text-end'>
                      Shipping Rate
                    </td>
                    <td className='text-end'>$5.00</td>
                  </tr> */}

                    <tr>
                      <td></td>
                      <td colSpan={3} className='fs-3 text-dark fw-bolder text-end'>
                        Grand Total
                      </td>
                      <td className='text-dark fs-3 fw-boldest text-end'>
                        {numberFormat(
                          finalTotal(
                            Number(shipmentdetails.grandTotal),
                            vatValue(5, Number(shipmentdetails.grandTotal))
                          )
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
            {shipmentdetails.shipmentCategory === 'MailAndParcel' && (
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
                    {shipmentdetails!.shipmentItems!.map((item: any, index: number) => (
                      <tr key={index}>
                        <td>
                          <div className='d-flex align-items-center'>
                            <a
                              href='/metronic8/demo1/../demo1/apps/ecommerce/catalog/edit-product.html'
                              className='symbol symbol-50px'
                            >
                              <span className='symbol-label'></span>
                            </a>

                            <div className='ms-5'>
                              <div className='fw-bolder'>{item.shipmentDescription}</div>
                              <div className='fs-7 text-muted'>{item.shipmentDescription}</div>
                            </div>
                          </div>
                        </td>

                        <td className='text-end'>{item.weight}</td>

                        <td className='text-end'>
                          {volume(Number(item.length), Number(item.breadth), Number(item.height))}
                        </td>
                        <td className='text-end'>
                          {volumetricWeight(
                            volume(Number(item.length), Number(item.breadth), Number(item.height))
                          )}
                        </td>
                        <td className='text-end'>
                          {chargeableWeight(
                            volumetricWeight(
                              volume(
                                Number(item.length),
                                Number(item.breadth),
                                Number(item.breadth)
                              )
                            ),
                            item.weight
                          )}
                        </td>
                        <td className='text-end'>{item.quantity}</td>

                        <td className='text-end'>{numberFormat(Number(item.lineTotal))}</td>
                      </tr>
                    ))}

                    <tr>
                      <td colSpan={6} className='text-end'>
                        Subtotal
                      </td>
                      <td className='text-end'>
                        {numberFormat(Number(shipmentdetails.grandTotal))}
                      </td>
                    </tr>

                    <tr>
                      <td colSpan={6} className='text-end'>
                        VAT (5%)
                      </td>
                      <td className='text-end'>
                        {numberFormat(vatValue(5, Number(shipmentdetails.grandTotal)))}
                      </td>
                    </tr>

                    {/* <tr>
                    <td colSpan={3} className='text-end'>
                      Shipping Rate
                    </td>
                    <td className='text-end'>$5.00</td>
                  </tr> */}

                    <tr>
                      <td colSpan={6} className='fs-3 text-dark fw-bolder text-end'>
                        Grand Total
                      </td>
                      <td className='text-dark fs-3 fw-boldest text-end'>
                        {numberFormat(
                          finalTotal(
                            Number(shipmentdetails.grandTotal),
                            vatValue(5, Number(shipmentdetails.grandTotal))
                          )
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
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

export default InvoicePrint
function productLabel(arg0: number): React.ReactNode {
  throw new Error('Function not implemented.')
}
