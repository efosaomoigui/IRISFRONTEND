import React, {useMemo} from 'react'
import FleetData from '../../FleetData.json'
import './CustomTable.css'
import { useSortBy, useTable } from 'react-table'
import { IFleetModel } from '../../ShipmentModels/ShipmentInterfaces'

interface Props{
  fleetData:IFleetModel | any ;
}

const FleetTable = ({fleetData} : Props) => {

  const tableInstance = useTable({
    columns : useMemo(
      () => [
        {
          Header: 'FleetId',
          accessor: 'FleetId',
        },
        {
          Header: 'registration Number',
          accessor: 'RegistrationNumber',
        },
        {
          Header: 'chasis Number',
          accessor: 'ChasisNumber',
        },
        {
          Header: 'engine Number',
          accessor: 'EngineNumber',
        },
        {
          Header: 'Status',
          accessor: 'Status',
        },
        {
          Header: 'FleetType',
          accessor: 'FleetType',
        },
        {
            Header: 'Capacity',
            accessor: 'Capacity',
        },
        {
            Header: 'Description',
            accessor: 'Description',
        },
        {
            Header: 'FleetModel',
            accessor: 'FleetModel',
        },
        {
            Header: 'FleetMake',
            accessor: 'FleetMake',
        },
        {
            Header: 'Owner Id',
            accessor: 'OwnerId',
        },
      ],
      []
    ),
    data : useMemo(() => FleetData, []),
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

export { FleetTable };