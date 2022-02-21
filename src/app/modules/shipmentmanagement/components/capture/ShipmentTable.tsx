import React, {useMemo} from 'react'
import Shipment_Data from './Shipment_Data.json'
import './CustomTable.css'
import { useSortBy, useTable } from 'react-table'
import { IShipmentModel } from '../../ShipmentModels/ShipmentInterfaces'

interface Props{
  shipmentData:IShipmentModel | any ;
}

const ShipmentTable = ({shipmentData} : Props) => {

  const tableInstance = useTable({
    columns : useMemo(
      () => [
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
      []
    ),
    data : useMemo(() => Shipment_Data, []),
  }, useSortBy)

  const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = tableInstance

  return (
    <div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getFooterGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
      </table>
    </div>
  )
}

export { ShipmentTable };