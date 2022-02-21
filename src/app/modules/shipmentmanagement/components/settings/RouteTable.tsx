import React, {useMemo} from 'react'
import RouteData from '../../RouteData.json'
import './CustomTable.css'
import { useSortBy, useTable } from 'react-table'
import { IRouteModel } from '../../ShipmentModels/ShipmentInterfaces'

interface Props{
  routeData:IRouteModel | any ;
}

const RouteTable = ({routeData} : Props) => {

  const tableInstance = useTable({
    columns : useMemo(
      () => [
        {
          Header: 'route Id',
          accessor: 'RouteId',
        },
        {
          Header: 'route Name',
          accessor: 'RouteName',
        },
        {
          Header: 'depature',
          accessor: 'Departure',
        },
        {
          Header: 'destination',
          accessor: 'Destination',
        },
        {
          Header: 'is Sub Route',
          accessor: 'IsSubRoute',
        },
        {
          Header: 'dispatch Fee',
          accessor: 'DispatchFee',
        },
        {
            Header: 'loader Fee',
            accessor: 'LoaderFee',
        },
        {
            Header: 'captain Fee',
            accessor: 'CaptainFee',
        },
        {
            Header: 'main Route Id',
            accessor: 'MainRouteId',
        },
        {
            Header: 'available At Terminal',
            accessor: 'AvailableAtTerminal',
        },
        {
            Header: 'available Online',
            accessor: 'AvailableOnline',
        },
        {
            Header: 'Route Type',
            accessor: 'RouteType',
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