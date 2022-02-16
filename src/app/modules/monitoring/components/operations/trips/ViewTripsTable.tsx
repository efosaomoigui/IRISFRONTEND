import React, {useMemo} from 'react'
import ViewTrips_Data from './ViewTrips_Data.json'
import {useTable, useSortBy} from 'react-table'
import './CustomTable.css'
import TableActionLinks from '../../../../layout/tables/TableActionLinks'
import { ITripModel } from '../../../Monitor models/MonitorInterface'

interface Props{
  TripData: ITripModel | any ;
}

const ViewTripsTable = ({ TripData} : Props) => {

  const tableInstance = useTable({
    columns : useMemo(
      () => [
        {
          Header: 'Trip Id',
          accessor: 'id',
        },
        {
          Header: 'Trip Reference',
          accessor: 'TripReference',
        },
        {
          Header: 'Route Code',
          accessor: 'RouteCode',
        },
        {
          Header: 'Fleet Id',
          accessor: 'fleetid',
        },
        {
          Header: 'Manifest Id',
          accessor: 'ManifestId',
        },
        {
          Header: 'Driver',
          accessor: 'Driver',
        },
        {
          Header: 'Dispatcher',
          accessor: 'Dispatcher',
        },
        {
          Header: 'Driver Dispatch Fee ',
          accessor: 'DriverDispatchFee',
        },
       
        {
          Header: 'Start Time',
          accessor: 'StartTime',
        },
        {
          Header: 'End Time',
          accessor: 'EndTime',
        },
      ],
      []
    ),
    data: useMemo(() => ViewTrips_Data, []),
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
              <th className='min-w-100px text-end'>Actions</th>
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
              <td>
                <TableActionLinks DetailsPath={'/adminSettings/userDetails'} EditPath={'#'} DeletePath={'#'} />
              </td>
            </tr>
          )
        })}
      </tbody>
      </table>
    </div>
  )
}

export { ViewTripsTable };