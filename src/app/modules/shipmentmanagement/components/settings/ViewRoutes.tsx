import {useEffect, useState} from 'react'
import {Spinner} from 'react-bootstrap-v5'
import agent from '../../../../../setup/axios/AxiosAgent'
import { usePageData } from '../../../../../_iris/layout/core'
import {IrisTablesWidget} from '../../../layout/tables/IrisTablesWidget'
import {modalprops} from '../../../layout/tables/IrisTableTitle'
import RouteData from '../../RouteData.json'
import {IRouteModel} from '../../ShipmentModels/ShipmentInterfaces'
// import {format} from 'date-fns'

export function ViewRoutes() {
  const [loading, setLoading] = useState(true)
  const [modalTarger, setModalTarget] = useState<modalprops[]>([])
  const [routemodel, setRouteModel] = useState<IRouteModel[]>([])
  const [loadingData, setLoadingData] = useState(true)
  const { selectValue, handleSelectValue, selectUrlParam, setSelectUrlParam } = usePageData() //global data


  //all the data for the table
  const tableProvider = {
    columns: [
      {
        Header: 'Route Id',
        accessor: 'routeId',
      },
      {
        Header: 'route Name',
        accessor: 'routeName',
      },
      {
        Header: 'depature',
        accessor: 'departure',
      },
      {
        Header: 'destination',
        accessor: 'destination',
      },
    ],
    DetailsPath: '/shipment/routedetail/',
    EditPath: '#kt_modal_editroute',
    DeletePath: '/adminSettings/userDetails/',
    FakeData: RouteData,
  }
  //Buttons on the table page
  const ModalTarget = [
    {
      linkTitle: 'Add Route',
      linkTarget: '#kt_modal_addroute',
    },
  ]

  const handleEdit = (event: React.MouseEvent) => {
    const urlParm = event.currentTarget.getAttribute('id')
    const val = routemodel.find((x) => x.routeId === urlParm)
    handleSelectValue(val!)
    return val
  }

  // //USE EFFECT HOOK
  useEffect(() => {
    const callFunc = async () => {
      await agent.Route.list().then((response) => {
        setRouteModel(response)
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
            tableData={routemodel}
            className='mb-5 mb-xl-8'
            columnsMap={tableProvider.columns}
            DetailsPath={tableProvider.DetailsPath}
            EditPath={tableProvider.EditPath}
            DeletePath={tableProvider.DeletePath}
            UseFakeData={false}
            FakeData={tableProvider.FakeData}
            TableTitle={'Route Profile'}
            Count={'Over 300 Users'}
            ModalTarget={modalTarger}
            handleEdit={handleEdit}
          />
        )}
      </div>
    </div>
  )
}
