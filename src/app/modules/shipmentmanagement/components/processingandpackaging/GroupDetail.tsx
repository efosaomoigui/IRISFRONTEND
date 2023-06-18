import {format} from 'date-fns'
import {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import agent from '../../../../../setup/axios/AxiosAgent'
import {usePageData} from '../../../../../_iris/layout/core'
import {IGroupWayBillModel, IManifestModel} from '../../ShipmentModels/ShipmentInterfaces'

export function GroupDetail() {
  let {groupCode} = useParams<{groupCode: string}>()
  const [groupdetails, setGroupDetails] = useState<IGroupWayBillModel[]>()
  const [loadingData, setLoadingData] = useState(true)
  const {
    selectValue,
    handleSelectValue,
    selectUrlParam,
    setSelectUrlParam,
    entityValues,
    setEntityValues,
  } = usePageData() //global data

  useEffect(() => {
    const callFunc = async () => {
      await agent.GroupWayBill.details(groupCode).then((response) => {
        setGroupDetails(response)
        setLoadingData(false)
        setLoadingData(false)
      })
    }
    if (loadingData) {
      callFunc()
    }
  }, [])

  const handleEdit = (event: React.MouseEvent) => {
    handleSelectValue(groupdetails!)
  }
  return (
    <div className='row g-5 g-xxl-8'>
      <div className='col-xl-12'>
        <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
          <div className='card-header cursor-pointer'>
            <div className='card-title m-0'>
              <h3 className='fw-bolder m-0'>Group Waybill Details</h3>
            </div>
          </div>

          <div className='card-body p-9'>
            {groupdetails && (
              <>
                <div className='row mb-7'>
                  <h3 className='col-lg-4 fw-bold text-muted'>Group Waybill Code</h3>

                  <div className='col-lg-8 mb-12'>
                    <span className='fw-bolder fs-6 text-dark'>{groupdetails[0].groupCode}</span>
                  </div>

                  <div className='row mb-3'>
                    <div className='col-lg-12'>
                      <div className='card' style={{width: '99%'}}>
                        <div className='container   table-responsive'>
                          <div className='mb-3'>
                            <h3>Shipments</h3>
                          </div>
                          <hr className='bg-success border-1 border-top border-danger'></hr>
                          <table className='table'>
                            <thead>
                              <tr>
                                <th scope='col'>#</th>
                                <th scope='col'>
                                  <strong>Waybill</strong>
                                </th>
                                <th scope='col'>
                                  <strong>Departure</strong>
                                </th>
                                <th scope='col'>
                                  <strong>Destination</strong>
                                </th>
                                <th scope='col'>
                                  <strong>Date</strong>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {groupdetails?.map((item, index) => (
                                <tr key={index}>
                                  <th scope='row'>{index + 1}</th>
                                  <th scope='row'>
                                    <Link to={'/shipment/shipmentDetail/' + item.waybill}>
                                      {item.waybill}
                                    </Link>
                                  </th>
                                  <td>{item.departure}</td>
                                  <td>{item.destination}</td>
                                  <td>
                                    {format(new Date(item.createdDate!), 'dd/MM/yyyy HH:mm:ss')}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {!groupdetails && (
              <>
                <h4>Sorry, Group Waybill does not exit!</h4>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
