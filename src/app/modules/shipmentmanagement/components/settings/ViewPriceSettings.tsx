import {useEffect, useState} from 'react'
import {Spinner} from 'react-bootstrap-v5'
import agent from '../../../../../setup/axios/AxiosAgent'
import {IrisTablesWidget} from '../../../layout/tables/IrisTablesWidget'
import {modalprops} from '../../../layout/tables/IrisTableTitle'
import PriceData from '../../PriceData.json'
import {IPriceModel} from '../../ShipmentModels/ShipmentInterfaces'
// import {format} from 'date-fns'

export function ViewPriceSettings() {
  const [loading, setLoading] = useState(true)
  const [modalTarger, setModalTarget] = useState<modalprops[]>([])
  const [pricemodel, setPriceModel] = useState<IPriceModel[]>([])
  const [loadingData, setLoadingData] = useState(true)

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
    },
  ]

  // //USE EFFECT HOOK
  useEffect(() => {
    const callFunc = async () => {
      await agent.Price.list().then((response) => {
        setPriceModel(response)
        setModalTarget(ModalTarget)
        setLoadingData(false)
      })
    }
    if (loadingData) {
      callFunc()
    }
  }, [])

  return (
    <div className='row g-5 g-xxl-8'>
      <div className='col-xl-12'>
        {loadingData ? (
          <div>
            <Spinner animation='border' />
          </div>
        ) : (
          <IrisTablesWidget
            tableData={pricemodel}
            className='mb-5 mb-xl-8'
            columnsMap={tableProvider.columns}
            DetailsPath={tableProvider.DetailsPath}
            EditPath={tableProvider.EditPath}
            DeletePath={tableProvider.DeletePath}
            UseFakeData={false}
            FakeData={tableProvider.FakeData}
            TableTitle={'Price Profile'}
            Count={'Over 300 Users'}
            ModalTarget={modalTarger}
          />
        )}
      </div>
    </div>
  )
}
