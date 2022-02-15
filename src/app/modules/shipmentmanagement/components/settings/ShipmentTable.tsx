import React, {useMemo} from 'react'
import ShipmentData from '../../ShipmentData.json'
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
          Header: 'id',
          accessor: 'id',
        },
        {
          Header: 'wayBill Number',
          accessor: 'WayBillNumber',
        },
        {
            Header: 'last_name',
            accessor: 'last_name',
        },
        {
            Header: 'first_name',
            accessor: 'first_name',
        },
          
        
      ],
      []
    ),
    data : useMemo(() => ShipmentData, []),
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