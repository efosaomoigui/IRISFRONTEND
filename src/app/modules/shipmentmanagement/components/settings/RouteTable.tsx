import React, {useMemo} from 'react'
import RouteData from '../../RouteData.json'
import './CustomTable.css'
import { useSortBy, useTable } from 'react-table'

const RouteTable = () => {

  const tableInstance = useTable({
    columns : useMemo(
      () => [
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
        {
          Header: 'is Sub Route',
          accessor: 'is_Sub_Route',
        },
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
        {
            Header: 'available At Terminal',
            accessor: 'availabale_At_Terminal',
        },
        {
            Header: 'available Online',
            accessor: 'availabale_Online',
        },
        {
            Header: 'Route Type',
            accessor: 'route_Type',
        },
      ],
      []
    ),
    data : useMemo(() => RouteData, []),
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

export { RouteTable };