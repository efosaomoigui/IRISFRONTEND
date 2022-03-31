import { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap-v5'
import agent from '../../../../setup/axios/AxiosAgent';
import { usePageData } from '../../../../_iris/layout/core';
import { IrisTablesWidget } from '../../layout/tables/IrisTablesWidget';
import { modalprops } from '../../layout/tables/IrisTableTitle';
import { IShipmentRequestModel } from '../models/ShipmentRequestInterface'
import Shipmentrequest_Data from '../ShipmentRequestData.json'
// import {format} from 'date-fns' 

export function ShipmentRequest() {
    const [loading, setLoading] = useState(true)
    const [modalTarger, setModalTarget] = useState<modalprops[]>([]);
    const [shipmentrequestmodel, setShipmentRequestModel] = useState<IShipmentRequestModel[]>([])
    const [loadingData, setLoadingData] = useState(true)
    const { selectValue, handleSelectValue, selectUrlParam, setSelectUrlParam } = usePageData() //global data


    //all the data for the table
    const tableProvider = {
        columns: [
            {
                Header: 'ownerId',
                accessor: 'ownerId',
            },
            {
                Header: 'First Name',
                accessor: 'FirstName',
            },
            {
                Header: 'Last Name',
                accessor: 'LastName',
            },
            {
                Header: 'email',
                accessor: 'email',
            },
            {
                Header: 'Phone Number',
                accessor: 'PhoneNumber',
            },
            {
                Header: 'Description',
                accessor: 'Description',
            },
            {
                Header: 'Waybill',
                accessor: 'Waybill',
            },
            {
                Header: 'Customer',
                accessor: 'Customer',
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
                Header: 'Pick Up Options',
                accessor: 'pickUpOptions',
            },
        ],
        DetailsPath: '/shipmentrequest/shipmentrequestdetail/',
        EditPath: '#kt_modal_editshipmentrequest',
        DeletePath: '/adminSettings/userDetails/',
        FakeData: Shipmentrequest_Data,
    }

    //Buttons on the table page
    const ModalTarget = [
        {
            linkTitle: 'Add Shipment Request',
            linkTarget: '#kt_modal_addshipmentrequest'
        },
    ]

    const handleEdit = (event: React.MouseEvent) => {
        const urlParm = event.currentTarget.getAttribute('id')
        const val = shipmentrequestmodel.find((x) => x.ownerId === urlParm)
        handleSelectValue(val!)
        return val
    }

    // //USE EFFECT HOOK
    useEffect(() => {
        const callFunc = async () => {
            await agent.ShipmentRequest.list().then((response) => {
                setShipmentRequestModel(response)
                setModalTarget(ModalTarget);
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
                        tableData={shipmentrequestmodel}
                        className='mb-5 mb-xl-8'
                        columnsMap={tableProvider.columns}
                        DetailsPath={tableProvider.DetailsPath}
                        EditPath={tableProvider.EditPath}
                        DeletePath={tableProvider.DeletePath}
                        UseFakeData={false}
                        FakeData={tableProvider.FakeData}
                        TableTitle={'Shipment Request'}
                        Count={'Over 300 Users'}
                        ModalTarget={
                            modalTarger
                        }
                        handleEdit={handleEdit}
                    />
                )}
            </div>
        </div>
    )
}
