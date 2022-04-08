import React, {ChangeEvent, FC, useEffect, useState} from 'react'
import {Field, ErrorMessage, FieldArray} from 'formik'
import {Label} from 'semantic-ui-react'
import {number} from 'yup/lib/locale'
import agent, {axiosPrice} from '../../../../../setup/axios/AxiosAgent'
import {ILinePriceModel, IShipmentWayBillAndInvoiceModel} from '../../../shipmentmanagement/ShipmentModels/ShipmentInterfaces'
import axios from 'axios'

interface Props {
  radioState?: string
  values?: any
  handleChange?: (event: ChangeEvent<HTMLInputElement>) => void
  grandTotal?: number
}


const Step3: FC<Props> = ({radioState, values, handleChange, grandTotal}: Props) => {
  const [hideAndShowMailAndParcel, setHideAndShowMailAndParcel] = useState('')
  const [hideTruck, setHideTruck] = useState(false)
  const [loadingData, setLoadingData] = useState(true)
  const [total, setTotal] = useState(0)
  const [lineTotal, setLineTotal] = useState<ILinePriceModel>()
  const [newWayBillAndInvoice, setNewWayBillAndInvoice] = useState<IShipmentWayBillAndInvoiceModel>() 

  const product = [
    {optionValue: '', optionLabel: 'Select Product Type'},
    {optionValue: 1, optionLabel: 'MailAndParcel'},
    {optionValue: 2, optionLabel: 'Tomatoes'},
    {optionValue: 3, optionLabel: 'Vedan'},
    {optionValue: 4, optionLabel: 'Noodles'},
    {optionValue: 5, optionLabel: 'Flour'},
    {optionValue: 6, optionLabel: 'Cowbell'},
    {optionValue: 7, optionLabel: 'Nestle'},
    {optionValue: 8, optionLabel: 'Bigi'},
  ]

  //USE EFFECT HOOK
  useEffect(() => {
    const callFunc = async () => {
      const val = await agent.Shipment.NewWayBillNumber().then((response) => {
        setLoadingData(false)
        values.waybillNumber = response.waybill
        values.invoiceNumber = response.invoice  
      })
    }
    if (loadingData) {
      callFunc()
    }
  }, [])

  // console.log('form values : ', values)
  const handleOnChange2 = (
    e: ChangeEvent<HTMLInputElement>,
    weight: any,
    length: any,
    breadth: any,
    height: any,
    id: any,
    route: any,
    ShimentCategory?: any
  ) => {
    const weightVal = !isNaN(parseInt(weight)) ? parseInt(weight) : 0
    const lengthVal = !isNaN(parseInt(length)) ? parseInt(length) : ShimentCategory === 2 ? 1 : 0
    const breadthVal = !isNaN(parseInt(breadth)) ? parseInt(breadth) : ShimentCategory === 2 ? 1 : 0
    const heightVal = !isNaN(parseInt(height)) ? parseInt(height) : ShimentCategory === 2 ? 1 : 0

    const objPrice: ILinePriceModel = {
      weight: weightVal,
      length: lengthVal,
      breadth: breadthVal,
      height: heightVal,
      lineTotal: 0,
      ShimentCategory: Number(ShimentCategory),
      routeId: route,
    }

    if (objPrice.ShimentCategory === 1) {
      if (
        objPrice.weight > 0 &&
        objPrice.length > 0 &&
        objPrice.breadth > 0 &&
        objPrice.height > 0
      ) {
        axiosPrice(objPrice)
          .then((data) => {
            values.itemsB[id].LineTotal = Number(data.pricedData.lineTotal)
          })
          .catch((err) => console.log(err))
      }
    } else if (objPrice.ShimentCategory === 2) {
      axiosPrice(objPrice)
        .then((data) => {
          values.itemsA[id].LineTotal = Number(data.pricedData.lineTotal)
        })
        .catch((err) => console.log(err))
    }
  }

  function checkForDuplicate(param: Array<{}>, index: number) {
    for (let x = 0; x < param.length; x++) {
      if (index in param[x]) {
        return true
      }

      return false
    }
  }

  return (
    <div className='w-100'>
      <div className='pb-10 pb-lg-15'>
        <h2 className='fw-bolder text-dark'>Package/Shipment Items</h2>
        <input type='hidden' name='grandTotal' value={values.grandTotal} />
      </div>

      <div className='mb-10 fv-row'>
        <div className='container'>
          <div className='row'>
            <div className='col-12'>
              {radioState === 'TruckLoad' && (
                <div className='row mb-2' data-kt-buttons='true'>
                  <div className='col'>
                    <div className='mb-0 fv-row'>
                      <label className='d-flex align-items-center form-label mb-5'>
                        <h3>Truck Shipment</h3>
                        <i
                          className='fas fa-exclamation-circle ms-2 fs-7'
                          data-bs-toggle='tooltip'
                          title='Monthly billing will be based on your account plan'
                        ></i>
                      </label>
                      <FieldArray
                        name='itemsA'
                        render={(arrayHelpers) => (
                          <div>
                            {values.itemsA.map((item: {}, index: number) => (
                              <div key={index} className='mb-10'>
                                <hr className='bg-success border-2 border-top border-danger'></hr>
                                <div className='mb-10'>
                                  <div className='row mb-2' data-kt-buttons='true'>
                                    <div className='mb-0'>
                                      <div className='row mb-2' data-kt-buttons='true'>
                                        <label className='form-label'>Weight (Tons)</label>
                                        <div className='col'>
                                          <Field
                                            type='radio'
                                            className='btn-check'
                                            name={`itemsA.${index}.ton`}
                                            value='10'
                                            onClick={(e: React.ChangeEvent<HTMLInputElement>) =>
                                              handleOnChange2(
                                                e,
                                                values.itemsA[index].ton,
                                                values.itemsA[index].length,
                                                values.itemsA[index].breadth,
                                                values.itemsA[index].height,
                                                index,
                                                values.route,
                                                2
                                              )
                                            }
                                            id={`kt_tons_select_${index + 1}`}
                                          />
                                          <label
                                            className='btn btn-outline btn-outline-dashed btn-outline-default w-100 p-4'
                                            htmlFor={`kt_tons_select_${index + 1}`}
                                          >
                                            <span className='fw-bolder fs-3'>10 Tons</span>
                                          </label>
                                        </div>

                                        <div className='col'>
                                          <Field
                                            type='radio'
                                            className='btn-check'
                                            name={`itemsA.${index}.ton`}
                                            value='20'
                                            onClick={(e: React.ChangeEvent<HTMLInputElement>) =>
                                              handleOnChange2(
                                                e,
                                                values.itemsA[index].ton,
                                                values.itemsA[index].length,
                                                values.itemsA[index].breadth,
                                                values.itemsA[index].height,
                                                index,
                                                values.route,
                                                2
                                              )
                                            }
                                            id={`kt_tons_select_${index + 2}`}
                                          />
                                          <label
                                            className='btn btn-outline btn-outline-dashed btn-outline-default w-100 p-4'
                                            htmlFor={`kt_tons_select_${index + 2}`}
                                          >
                                            <span className='fw-bolder fs-3'>20 Tons</span>
                                          </label>
                                        </div>

                                        <div className='col mb-3'>
                                          <Field
                                            type='radio'
                                            className='btn-check'
                                            name={`itemsA.${index}.ton`}
                                            value='30'
                                            onClick={(e: React.ChangeEvent<HTMLInputElement>) =>
                                              handleOnChange2(
                                                e,
                                                values.itemsA[index].ton,
                                                values.itemsA[index].length,
                                                values.itemsA[index].breadth,
                                                values.itemsA[index].height,
                                                index,
                                                values.route,
                                                2
                                              )
                                            }
                                            id={`kt_tons_select_${index + 3}`}
                                          />
                                          <label
                                            className='btn btn-outline btn-outline-dashed btn-outline-default w-100 p-4'
                                            htmlFor={`kt_tons_select_${index + 3}`}
                                          >
                                            <span className='fw-bolder fs-3'>30 Tons</span>
                                          </label>
                                        </div>
                                        <div className='text-danger mt-1 mb-3'>
                                          <ErrorMessage name={`itemsA.${index}.ton`} />
                                        </div>
                                      </div>

                                      <div className='fv-row mb-10'>
                                        <label className='form-label'>Shipment Description</label>

                                        <Field
                                          name={`itemsA.${index}.t_shipmentDescription`}
                                          className='form-control form-control-lg form-control-solid'
                                          rows={3}
                                        ></Field>

                                        <div className='text-danger mt-2'>
                                          <ErrorMessage name='t_shipmentDescription' />
                                        </div>
                                      </div>

                                      <div className='col-11 mt-5'>
                                        <Field
                                          as='select'
                                          name={`itemsA.${index}.t_shipmentType`}
                                          className='form-select'
                                          label='Product'
                                        >
                                          {product.length &&
                                            product.map((unit, index) => {
                                              return (
                                                <option key={index} value={unit.optionValue}>
                                                  {unit.optionLabel}
                                                </option>
                                              )
                                            })}
                                        </Field>

                                        <div className='text-danger mt-2'>
                                          <ErrorMessage name={`itemsA.${index}.t_shipmentType`} />
                                        </div>
                                      </div>

                                      <div className='col mb-10 mt-10'>
                                        <Field
                                          type='hidden'
                                          name={`itemsA.${index}.LineTotal`}
                                          id={`itemsA.${index}.id`}
                                        ></Field>
                                        <label className='form-label' style={{fontWeight: 'bold'}}>
                                          Total
                                        </label>
                                        <div className='input-group mb-12'>
                                          <span className='input-group-text'>
                                            <strong>₦</strong>
                                          </span>
                                          <span className='input-group-text'>
                                            <strong>{values.itemsA[index].LineTotal}</strong>
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className='col mb-4'>
                                      <label className='form-label mb-12'></label>
                                      <div className='input-group mb-12 d-flex justify-content-end'>
                                        {/* <button
                                          type='button'
                                          className='float-end btn btn-lg btn-secondary me-3'
                                          style={{width: '60%', fontWeight: 'bold'}}
                                          onClick={() => arrayHelpers.remove(index)}
                                        >
                                          Remove Item
                                        </button> */}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                            <hr className='bg-success border-1 border-top border-danger'></hr>
                            {/* <button
                              type='button'
                              style={{width: '130px', fontWeight: 'bold'}}
                              className='float-start btn btn-lg btn-secondary'
                              onClick={() =>
                                arrayHelpers.push({
                                  ton: '',
                                  t_shipmentDescription: '',
                                  t_shipmentType: '',
                                  LineTotal: 0.0,
                                })
                              }
                            >
                              Add Item
                            </button> */}
                          </div>
                        )}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className='col-12'>
              {radioState === 'mailandparcel' && (
                <div className='row mb-2' data-kt-buttons='true'>
                  <div className='col'>
                    <div className='mb-0 fv-row'>
                      <label className='d-flex align-items-center form-label mb-5'>
                        <h3>Mail & Parcel/Freight</h3>
                        <i
                          className='fas fa-exclamation-circle ms-2 fs-7'
                          data-bs-toggle='tooltip'
                          title='Monthly billing will be based on your account plan'
                        ></i>
                      </label>
                      <FieldArray
                        name='itemsB'
                        render={(arrayHelpers) => (
                          <div>
                            {values.itemsB.map((item: any, index: number) => (
                              <div key={index} className='mb-10'>
                                <hr className='bg-success border-2 border-top border-danger'></hr>
                                <div className='mb-10'>
                                  <div className='row mb-2' data-kt-buttons='true'>
                                    <label className='form-label'>Weight (Kg)</label>
                                    <div className='col'>
                                      <Field
                                        name={`itemsB.${index}.weight`}
                                        className='form-control form-control-lg form-control-solid'
                                        rows={3}
                                        onKeyUp={(e: React.ChangeEvent<HTMLInputElement>) =>
                                          handleOnChange2(
                                            e,
                                            values.itemsB[index].weight,
                                            values.itemsB[index].length,
                                            values.itemsB[index].breadth,
                                            values.itemsB[index].height,
                                            index,
                                            values.route,
                                            1
                                          )
                                        }
                                      ></Field>

                                      <div className='text-danger mt-2'>
                                        <ErrorMessage name={`itemsB.${index}.weight`} />
                                      </div>
                                    </div>
                                  </div>

                                  <div className='row mt-5' data-kt-buttons='true'>
                                    <label className='form-label'>
                                      Volume (cm<sup>3</sup>)
                                    </label>
                                    <div className='col'>
                                      <Label>
                                        {' '}
                                        Length
                                        <Field
                                          name={`itemsB.${index}.length`}
                                          className='form-control form-control-lg form-control-solid'
                                          rows={3}
                                          onKeyUp={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            handleOnChange2(
                                              e,
                                              values.itemsB[index].weight,
                                              values.itemsB[index].length,
                                              values.itemsB[index].breadth,
                                              values.itemsB[index].height,
                                              index,
                                              values.route,
                                              1
                                            )
                                          }
                                        ></Field>
                                      </Label>

                                      <div className='text-danger mt-2'>
                                        <ErrorMessage name={`itemsB.${index}.length`} />
                                      </div>
                                    </div>

                                    <div className='col'>
                                      <Label>
                                        {' '}
                                        breadth
                                        <Field
                                          name={`itemsB.${index}.breadth`}
                                          className='form-control form-control-lg form-control-solid'
                                          rows={3}
                                          onKeyUp={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            handleOnChange2(
                                              e,
                                              values.itemsB[index].weight,
                                              values.itemsB[index].length,
                                              values.itemsB[index].breadth,
                                              values.itemsB[index].height,
                                              index,
                                              values.route,
                                              1
                                            )
                                          }
                                        ></Field>
                                      </Label>

                                      <div className='text-danger mt-2'>
                                        <ErrorMessage name={`itemsB.${index}.breadth`} />
                                      </div>
                                    </div>

                                    <div className='col mb-10'>
                                      <Label>
                                        {' '}
                                        Height
                                        <Field
                                          name={`itemsB.${index}.height`}
                                          className='form-control form-control-lg form-control-solid'
                                          rows={3}
                                          onKeyUp={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            handleOnChange2(
                                              e,
                                              values.itemsB[index].weight,
                                              values.itemsB[index].length,
                                              values.itemsB[index].breadth,
                                              values.itemsB[index].height,
                                              index,
                                              values.route,
                                              1
                                            )
                                          }
                                        ></Field>
                                      </Label>

                                      <div className='text-danger mt-2'>
                                        <ErrorMessage name={`itemsB.${index}.height`} />
                                      </div>
                                    </div>
                                  </div>

                                  <div className='fv-row mb-10'>
                                    <label className='form-label'>Shipment Description</label>
                                    <Field
                                      as='textarea'
                                      name={`itemsB.${index}.m_shipmentDescription`}
                                      className='form-control form-control-lg form-control-solid'
                                      rows={3}
                                    ></Field>

                                    <div className='text-danger mt-2'>
                                      <ErrorMessage
                                        name={`itemsB.${index}.m_shipmentDescription`}
                                      />
                                    </div>
                                  </div>

                                  <div className='row mb-10'>
                                    <div className='col mb-4'>
                                      <Field
                                        type='hidden'
                                        name={`itemsB.${index}.LineTotal`}
                                        id={`itemsB.${index}.id`}
                                      ></Field>
                                      <label className='form-label' style={{fontWeight: 'bold'}}>
                                        Total
                                      </label>
                                      <div className='input-group mb-12'>
                                        <span className='input-group-text'>
                                          <strong>₦</strong>
                                        </span>
                                        <span className='input-group-text'>
                                          <strong>{values.itemsB[index].LineTotal}</strong>
                                        </span>
                                      </div>
                                    </div>
                                    <div className='col mb-4'>
                                      <label className='form-label mb-12'></label>
                                      <div className='input-group mb-12 d-flex justify-content-end'>
                                        <button
                                          type='button'
                                          className='float-end btn btn-lg btn-secondary me-3'
                                          style={{width: '60%', fontWeight: 'bold'}}
                                          onClick={() => arrayHelpers.remove(index)}
                                        >
                                          Remove Item
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                            <hr className='bg-success border-1 border-top border-danger'></hr>
                            <button
                              type='button'
                              style={{width: '130px', fontWeight: 'bold'}}
                              className='float-start btn btn-lg btn-secondary'
                              onClick={() =>
                                arrayHelpers.push({
                                  weight: '',
                                  length: '',
                                  breadth: '',
                                  height: '',
                                  m_shipmentDescription: '',
                                  LineTotal: 0.0,
                                })
                              }
                            >
                              Add Item
                            </button>
                          </div>
                        )}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export {Step3}
