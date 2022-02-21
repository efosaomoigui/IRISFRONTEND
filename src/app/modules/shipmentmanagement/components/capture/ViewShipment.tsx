import { useEffect, useState } from 'react'
import agent from '../../../../../setup/axios/AxiosAgent'
import { IrisTablesWidget } from '../../../layout/tables/IrisTablesWidget'
import { madalprops } from '../../../layout/tables/IrisTableTitle'
import Shipment_Data from './Shipment_Data.json'
import { IShipmentModel } from '../../ShipmentModels/ShipmentInterfaces'
// import {format} from 'date-fns'

export function ViewShipment() {
    const [loading, setLoading] = useState(true)
    const [modalTarger, setModalTarget] = useState<madalprops[]>([])
    const [shipmentmodel, setPriceModel] = useState<IShipmentModel[]>([])

    //all the data for the table
    const tableProvider = {
        columns: [
            {
                Header: 'Waybill',
                accessor: 'Waybill',
            },
            {
                Header: 'Customer',
                accessor: 'Customer',
            },
            {
                Header: 'Address Id',
                accessor: 'AddressId',
            },
            {
                Header: 'GrandTotal',
                accessor: 'GrandTotal',
            },
            {
                Header: 'Reciever',
                accessor: 'Reciever',
            },
            {
                Header: 'Reciever Address',
                accessor: 'RecieverAddress',
            },
            {
                Header: 'Pick Up Options',
                accessor: 'PickUpOptions',
            },
            {
                Header: 'Shipment Items',
                accessor: 'ShipmentItems',
            },
        ],
        DetailsPath: '/shipment/shipmentdetail/:ShipmentId',
        EditPath: '/adminSettings/userDetails/',
        DeletePath: '/adminSettings/userDetails/',
        FakeData: Shipment_Data,
    }

    //Buttons on the table page
    const ModalTarget = [
        {
            linkTitle: 'View Shipment',
            linkTarget: '#kt_modal_viewshipment',
        }
    ]

    // //USE EFFECT HOOK
    useEffect(() => {
        agent.Shipment.list().then((response) => {
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
                    tableData={shipmentmodel}
                    className='mb-5 mb-xl-8'
                    columnsMap={tableProvider.columns}
                    DetailsPath={tableProvider.DetailsPath}
                    EditPath={tableProvider.EditPath}
                    DeletePath={tableProvider.DeletePath}
                    UseFakeData={true}
                    FakeData={tableProvider.FakeData}
                    TableTitle={'View Shipment'}
                    Count={'Over 300 Users'}
                    ModalTarget={modalTarger}
                />
            </div>
        </div>
    )
}
