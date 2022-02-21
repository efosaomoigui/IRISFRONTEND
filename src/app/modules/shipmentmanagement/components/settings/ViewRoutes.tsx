import {useEffect, useState} from 'react'
import agent from '../../../../../setup/axios/AxiosAgent'
import { IrisTablesWidget } from '../../../layout/tables/IrisTablesWidget'
import { madalprops } from '../../../layout/tables/IrisTableTitle'
import RouteData from '../../RouteData.json'
import { IRouteModel } from '../../ShipmentModels/ShipmentInterfaces'
// import {format} from 'date-fns' 

export function ViewRoutes() {
  const [loading, setLoading] = useState(true)
  const [modalTarger, setModalTarget] = useState<madalprops[]>([]);
  const [routemodel, setRouteModel] = useState<IRouteModel[]>([])

  //all the data for the table
  const tableProvider = {
    columns: [
        {
            Header: 'route Id',
            accessor: 'route_Id',
          },
          {
            Header: 'route Name',
            accessor: 'route_Name',
          },
          {
            Header: 'depature',
            accessor: 'depature',
          },
          {
            Header: 'destination',
            accessor: 'destination',
          },
          // {
          //   Header: 'is Sub Route',
          //   accessor: 'is_Sub_Route',
          // },
          {
            Header: 'dispatch Fee',
            accessor: 'dispatchFee',
          },
          {
              Header: 'loader Fee',
              accessor: 'loaderFee',
          },
          {
              Header: 'captain Fee',
              accessor: 'captainFee',
          },
          {
              Header: 'main Route Id',
              accessor: 'main_Route_Id',
          },
          // {
          //     Header: 'available At Terminal',
          //     accessor: 'availabale_At_Terminal',
          // },
          // {
          //     Header: 'available Online',
          //     accessor: 'availabale_Online',
          // },
          // {
          //     Header: 'Route Type',
          //     accessor: 'route_Type',
          // },
        ],
    DetailsPath: '/shipment/routedetail/:routId',
    EditPath: '/adminSettings/userDetails/',
    DeletePath: '/adminSettings/userDetails/',
    FakeData: RouteData,
  }

  //Buttons on the table page
  const ModalTarget = [
    {
      linkTitle:'Add Route',
      linkTarget : '#kt_modal_addroute'
    }
  ]

  // //USE EFFECT HOOK
  useEffect(() => {
    agent.Route.list().then((response) => {
      setRouteModel(response)
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
          tableData={routemodel}
          className='mb-5 mb-xl-8'
          columnsMap={tableProvider.columns}
          DetailsPath={tableProvider.DetailsPath}
          EditPath={tableProvider.EditPath}
          DeletePath={tableProvider.DeletePath}
          UseFakeData={true}
          FakeData={tableProvider.FakeData}
          TableTitle={'Route Profile'}
          Count={'Over 300 Users'}
          ModalTarget={
            modalTarger
          }
        />
      </div>
    </div>
  )
}
