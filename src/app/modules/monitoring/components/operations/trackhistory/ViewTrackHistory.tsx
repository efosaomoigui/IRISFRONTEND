import {useEffect, useState} from 'react'
import {Button, Form, Spinner} from 'react-bootstrap-v5'
import agent from '../../../../../../setup/axios/AxiosAgent'
import {usePageData} from '../../../../../../_iris/layout/core'
import {IUserModel} from '../../../../auth/models/AuthInterfaces'
import {IrisTablesWidget} from '../../../../layout/tables/IrisTablesWidget'
import {modalprops} from '../../../../layout/tables/IrisTableTitle'
import {AddTrackHistoryModal} from '../../../monitor modal/AddTrackHistoryModal'
import {EditTrackHistoryModal} from '../../../monitor modal/EditTrackHistoryModal'
import {ITrackHistoryModel, ITripModel} from '../../../Monitor models/MonitorInterface'
import TrackHistory_Data from './TrackHistory_Data.json'
// import {format} from 'date-fns'

export function ViewTrackHistory() {
  const [loading, setLoading] = useState(true)
  const [modalTarger, setModalTarget] = useState<modalprops[]>([])
  const [trackhistorymodel, setTrackhistorymodel] = useState<ITrackHistoryModel[]>([])
  const [loadingData, setLoadingData] = useState(true)
  const {selectValue, handleSelectValue, selectUrlParam, setSelectUrlParam} = usePageData() //global data
  const [waybill, setWaybill] = useState('')

  //all the data for the table
  const tableProvider = {
    columns: [
      {
        Header: 'Trip Reference',
        accessor: 'tripReference',
      },
      {
        Header: 'Date',
        accessor: 'createDate',
      },

      {
        Header: 'Action',
        accessor: 'action',
      },
      {
        Header: 'Location',
        accessor: 'location',
      },
      {
        Header: 'Waybill',
        accessor: 'waybill',
      },
      {
        Header: 'Manifest',
        accessor: 'manifestCode',
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
    ],
    DetailsPath: '/monitor/trackHistoryDetails/',
    EditPath: '#kt_modal_edittrackhistory',
    DeletePath: '/adminSettings/userDetails/',
    FakeData: TrackHistory_Data,
  }

  //Buttons on the table page
  const ModalTarget = [
    {
      linkTitle: 'Register Track Information',
      linkTarget: '#kt_modal_addtrackhistory',
    },
  ]

  const handleEdit = (event: React.MouseEvent) => {
    const urlParm = event.currentTarget.getAttribute('id')
    const val = trackhistorymodel.find((x) => x.id === urlParm)
    handleSelectValue(val!)
    return val
  }

  // //USE EFFECT HOOK
  useEffect(() => {
    const callFunc = async () => {
      await agent.TrackHistory.list().then((response) => {
        setTrackhistorymodel(response)
        setModalTarget(ModalTarget)
        setLoadingData(false)
      })
    }
    if (loadingData) {
      callFunc()
    }
  }, [])

  const handleTrackSearch = () => {
    setLoadingData(true)
    agent.TrackHistory.searrchTrack(waybill!).then((response) => {
      setTrackhistorymodel(response)
      setLoadingData(false)
    })
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    alert(event.target.value)
    setWaybill(event.target.value)
  }

  return (
    <div className='row g-5 g-xxl-8'>
      <div className='container'>
        <Form>
          <div className='row m-3'>
            <div className='col'>
              <Form.Control size='lg' placeholder='Wallet Number' style={{width: '100%'}} onChange={handleChange} />
            </div>
            <div className='col'>
              <Button
                variant='primary'
                onClick={handleTrackSearch}
                type='button'
                style={{width: '88%'}}
              >
                Search
              </Button>
            </div>
            <div className='col'></div>
          </div>
        </Form>
      </div>
      <div className='col-xl-12'>
        {loadingData ? (
          <div>
            <Spinner animation='border' />
          </div>
        ) : (
          <IrisTablesWidget
            tableData={trackhistorymodel}
            className='mb-5 mb-xl-8'
            columnsMap={tableProvider.columns}
            DetailsPath={tableProvider.DetailsPath}
            EditPath={tableProvider.EditPath}
            DeletePath={tableProvider.DeletePath}
            UseFakeData={false}
            FakeData={tableProvider.FakeData}
            TableTitle={'Track History'}
            Count={'Over 300 Users'}
            ModalTarget={modalTarger}
            handleEdit={handleEdit}
            showButton={true}
          />
        )}
      </div>
      <AddTrackHistoryModal />
      <EditTrackHistoryModal />
    </div>
  )
}
