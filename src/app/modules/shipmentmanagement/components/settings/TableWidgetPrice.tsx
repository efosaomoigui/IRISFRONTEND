import {useEffect, useState} from 'react'
import agent from '../../../../../setup/axios/AxiosAgent'
import { IrisTablesWidget } from '../../../layout/tables/IrisTablesWidget'
import { madalprops } from '../../../layout/tables/IrisTableTitle'
import PriceData from '../../RouteData.json'
import { IPriceModel } from '../../ShipmentModels/ShipmentInterfaces'
// import {format} from 'date-fns' 

export function PriceSettings() {
  const [loading, setLoading] = useState(true)
  const [modalTarger, setModalTarget] = useState<madalprops[]>([]);
  const [pricemodel, setPriceModel] = useState<IPriceModel[]>([])

  //all the data for the table
  const tableProvider = {
    columns: [
        {
            Header: 'Id',
            accessor: 'id',
          },
          {
            Header: 'Way_Bill_Price',
            accessor: 'Way_Bill_Price',
          },
          {
            Header: 'Route Price',
            accessor: 'Route_Price',
          },
          {
            Header: 'currency',
            accessor: 'Currency',
          },
        ],
    DetailsPath: '/adminSettings/userDetails/',
    EditPath: '/adminSettings/userDetails/',
    DeletePath: '/adminSettings/userDetails/',
    FakeData: PriceData,
  }

  //Buttons on the table page
  const ModalTarget = [
    {
      linkTitle:'Add Price',
      linkTarget : '#kt_modal_addprice'
    },
    {
      linkTitle:'View Price',
      linkTarget : '#kt_modal_addprice'
    }
  ]

  // //USE EFFECT HOOK
  useEffect(() => {
    agent.Price.list().then((response) => {
      setPriceModel(response)
      setModalTarget(ModalTarget);
      setLoading(false) 
    })
  }, [])

  // console.log(usersmodel);

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
          ModalTarget={
            modalTarger
          }
        />
      </div>
    </div>
  )
}
