/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useEffect, useState} from 'react'
import {Spinner} from 'react-bootstrap-v5'
import {useIntl} from 'react-intl'
import agent from '../../../setup/axios/AxiosAgent'
import {PageTitle} from '../../../_iris/layout/core'
import {
  ListsWidget3,
  ListsWidget4,
  ListsWidget5,
  ListsWidget6,
  MixedWidget10,
  MixedWidget11,
  MixedWidget2,
  MixedWidget8,
  TablesWidget10,
  TablesWidget5,
} from '../../../_iris/partials/widgets'
import {IDashBoardModel} from '../../modules/shipmentmanagement/ShipmentModels/ShipmentInterfaces'

export const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

const DashboardPage = () => {
  const [dashBoardmodel, setDashBoardModel] = useState<IDashBoardModel[]>([])
  const [loadingData, setLoadingData] = useState(true)
  const [month, setmonth] = useState<string[]>([])
  const [monthData, setMonthData] = useState<number[]>([])
  const [totalSales, settotalSales] = useState<number>(0)

  const [wmonth, setwmonth] = useState<string[]>([])
  const [wmonthData, setwMonthData] = useState<number[]>([])
  const [wtotalSales, setwtotalSales] = useState<number>(0)

  const callFunc = async () => {
    await agent.Shipment.dashboard().then((response) => {
      setDashBoardModel(response)

      let month: string[] = []
      let monthData: number[] = []
      let total = 0

      response.map((m) => {
        let mName = monthNames[Number(m.month) - 1]
        month.push(mName)
        monthData.push(Number(m.monthData))
        setmonth(month)
        setMonthData(monthData)
        total = total + Number(m.monthData)
        settotalSales(total)
      })

      console.log('Month DATA: ', monthData)
      console.log('Month: ', month)

      setLoadingData(false)
    })
  }

  const callFunc2 = async () => {
    await agent.WalletTransaction.dashboard().then((response) => {
      setDashBoardModel(response)

      let month: string[] = []
      let monthData: number[] = []
      let total = 0

      response.map((m) => {
        let mName = monthNames[Number(m.month) - 1]
        month.push(mName)
        monthData.push(Number(m.monthData))
        setwmonth(month)
        setwMonthData(monthData)
        total = total + Number(m.monthData)
        setwtotalSales(total)
      })

      // console.log('Month DATA: ', wmonthData)
      // console.log('Month: ', wmonth)

      setLoadingData(false)
    })
  }

  useEffect(() => {
    if (loadingData) {
      callFunc()
      callFunc2()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {/* begin::Row */}
      <div className='row gy-5 g-xl-8'>
        <div className='col-xxl-6'>
          <MixedWidget2
            className='card-xl-stretch mb-xl-8'
            chartColor='danger'
            chartHeight='200px'
            strokeColor='#cb1e46'
            monthData={monthData}
            month={month}
            totalSales={totalSales}
          />
        </div>
        {/* <div className='col-xxl-4'>
        <ListsWidget5 className='card-xxl-stretch' />
      </div> */}
        <div className='col-xxl-6'>
          {loadingData ? (
            <div>
              <Spinner animation='border' />
            </div>
          ) : (
            <>
              <MixedWidget10
                className='card-xxl-stretch-50 mb-5 mb-xl-8'
                chartColor='primary'
                chartHeight='150px'
                monthData={wmonthData}
                month={wmonth}
                totalSales={wtotalSales}
              />
              <MixedWidget11
                className='card-xxl-stretch-50 mb-5 mb-xl-8'
                chartColor='primary'
                chartHeight='175px'
                monthData={monthData}
                month={month}
                totalSales={totalSales}
              />
            </>
          )}
        </div>
      </div>
      {/* end::Row */}

      {/* begin::Row */}
      {/* <div className='row gy-5 gx-xl-8'>
        <div className='col-xxl-12'>
          <MixedWidget11
            className='card-xxl-stretch-100 mb-5 mb-xl-8'
            chartColor='primary'
            chartHeight='575px'
            monthData={monthData}
            month={month}
            totalSales={totalSales}
          />
        </div>
      </div> */}
      {/* end::Row */}

      {/* <div className='row gy-5 g-xl-12'>
      <div className='col-xl-6'>
        <ListsWidget6 className='card-xl-stretch mb-xl-8' />
      </div>
      <div className='col-xl-6'>
        <ListsWidget4 className='card-xl-stretch mb-5 mb-xl-8' items={5} />
      </div>
    </div> */}

      {/* begin::Row */}
      {/* <div className='row gy-5 g-xl-12'>
      <div className='col-xl-6'>
        <ListsWidget6 className='card-xl-stretch mb-xl-8' />
      </div>
      <div className='col-xl-6'>
        <ListsWidget4 className='card-xl-stretch mb-5 mb-xl-8' items={5} />
      </div>
    </div> */}
      {/* end::Row */}

      {/* <div className='row g-5 gx-xxl-8'>
      <div className='col-xxl-4'>
        <MixedWidget8
          className='card-xxl-stretch mb-xl-3'
          chartColor='success'
          chartHeight='150px'
        />
      </div>
      <div className='col-xxl-8'>
        <TablesWidget5 className='card-xxl-stretch mb-5 mb-xxl-8' />
      </div>
    </div> */}
    </>
  )
}

export default DashboardPage

const DashboardWrapper: FC = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
      <DashboardPage />
    </>
  )
}

export {DashboardWrapper}
