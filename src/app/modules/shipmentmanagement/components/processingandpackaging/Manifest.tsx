import {useEffect, useState} from 'react'
import {Form, Modal, Spinner} from 'react-bootstrap-v5'
import {Button, Grid} from 'semantic-ui-react'
import agent from '../../../../../setup/axios/AxiosAgent'
import {KTSVG} from '../../../../../_iris/helpers'
import {usePageData} from '../../../../../_iris/layout/core'
import {ListsWidget3, TablesWidget10} from '../../../../../_iris/partials/widgets'
import { ListItems } from './ListItems'
import LoadingComponent from '../../../../LoadingComponent'
import useStyles from '../../../layout/formstyles/FormStyle'
import {IrisTablesWidget} from '../../../layout/tables/IrisTablesWidget'
import {modalprops} from '../../../layout/tables/IrisTableTitle'
import {IManifestModel, IRouteModel} from '../../ShipmentModels/ShipmentInterfaces'
import Manifest_Data from './Manifest_Data.json'
import listdata from './listdata.json'
import { IShipmentModel } from '../../ShipmentModels/ShipmentInterfaces'
// import {format} from 'date-fns'

export function Manifest() {
  const [loading, setLoading] = useState(true)
  const [modalTarger, setModalTarget] = useState<modalprops[]>([])
  const [manifestmodel, setUsersModel] = useState<IManifestModel[]>([])
  const [loadingData, setLoadingData] = useState(true)
  const {selectValue, handleSelectValue, selectUrlParam, setSelectUrlParam} = usePageData() //global data
  const [routemodel, setRouteModel] = useState<IRouteModel[]>([])
  const [listDataValue, setListDataVal] = useState<IShipmentModel[]>([])

  //all the data for the table
  const tableProvider = {
    columns: [
      {
        Header: 'Manifest Code',
        accessor: 'manifestCode',
      },
      {
        Header: 'Group WayBillId',
        accessor: 'groupWayBillId',
      },
      {
        Header: 'Service CenterId',
        accessor: 'serviceCenterId',
      },
    ],
    DetailsPath: '/shipment/manifestdetail/',
    EditPath: '#kt_modal_editmanifest',
    DeletePath: '/adminSettings/userDetails/',
    FakeData: Manifest_Data,
  }

  //Buttons on the table page
  const ModalTarget = [
    {
      linkTitle: 'Add Manifest',
      linkTarget: '#kt_modal_addmanifest',
    },
  ]

  const listDataVal:IShipmentModel[]  = []

  const fillListItems = () =>{
    // eslint-disable-next-line array-callback-return
    listdata.map((item)=>{
      let itemObj:IShipmentModel = {
        waybill: item.waybill,
        destination:item.destination
      }
      listDataVal.push(itemObj)
    })
    setListDataVal(listDataVal)
    console.log("AAR: ", listDataValue)
  }

  // fillListItems()

  const handleEdit = (event: React.MouseEvent) => {
    const urlParm = event.currentTarget.getAttribute('id')
    const val = manifestmodel.find((x) => x.manifestCode === urlParm)
    handleSelectValue(val!)
    return val
  }
  const classes = useStyles()

  return (
    // <div className='row col-xl-12'>
      <div className='row gy-2 gx-xl-8'>
        <ListItems className='card-xxl-stretch mb-xl-3' listItems={listDataVal} />
      </div>
    // </div>
  )
}
