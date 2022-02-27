import {useEffect, useState} from 'react'
import agent from '../../../../../setup/axios/AxiosAgent'
import {IrisTablesWidget} from '../../../layout/tables/IrisTablesWidget'
import {madalprops} from '../../../layout/tables/IrisTableTitle'
import PriceData from '../../PriceData.json'
import {IPriceModel} from '../../ShipmentModels/ShipmentInterfaces'
// import {format} from 'date-fns'

export function ViewPriceSettings() {
  const [loading, setLoading] = useState(true)
  const [modalTarger, setModalTarget] = useState<madalprops[]>([])
  const [pricemodel, setPriceModel] = useState<IPriceModel[]>([])

  //all the data for the table
  const tableProvider = {
    columns: [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Category List',
        accessor: 'Category',
      },
      {
        Header: 'Route Identification',
        accessor: 'RouteId',
      },
      {
        Header: 'Route',
        accessor: 'Route',
      },
      {
        Header: 'Unit Weight',
        accessor: 'UnitWeight',
      },
      {
        Header: 'Price Per-Unit',
        accessor: 'PricePErUnit',
      },
    ],
    DetailsPath: '/shipment/pricesettingdetail/',
    EditPath: '#kt_modal_addprice',
    DeletePath: '/adminSettings/userDetails/',
    FakeData: PriceData,
  }

  //Buttons on the table page
  const ModalTarget = [
    {
      linkTitle: 'Add Price',
      linkTarget: '#kt_modal_addprice',
    }
  ]

  // //USE EFFECT HOOK
  useEffect(() => {
    agent.Price.list().then((response) => {
      setPriceModel(response)
      setModalTarget(ModalTarget)
      setLoading(false)
    })
  }, [])

  // if (loading) return <LoadingComponent content='Loading...' />

  return (
    <div className='row g-5 g-xxl-8'>
      <div className='col-xl-12'>
        <IrisTablesWidget
          tableData={pricemodel}
          className='mb-5 mb-xl-8'
          columnsMap={tableProvider.columns}
          DetailsPath={tableProvider.DetailsPath}
          EditPath={tableProvider.EditPath}
          DeletePath={tableProvider.DeletePath}
          UseFakeData={true}
          FakeData={tableProvider.FakeData}
          TableTitle={'Price Profile'}
          Count={'Over 300 Users'}
          ModalTarget={modalTarger}
        />
      </div>
    </div>
  )
}
