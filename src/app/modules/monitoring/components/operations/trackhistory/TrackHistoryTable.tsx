import React, {useMemo} from 'react'
import TrackHistory_Data from './TrackHistory_Data.json'
import {useTable, useSortBy} from 'react-table'
import './CustomTable.css'
import TableActionLinks from '../../../../layout/tables/TableActionLinks'
import { ITripModel } from '../../../Monitor models/MonitorInterface'


interface Props{
  TripData: ITripModel | any ;
}

const TrackHistoryTable = ({ TripData} : Props) => {

  const tableInstance = useTable({
    columns : useMemo(
      () => [
        {
          Header: 'Id',
          accessor: 'id',
        },
        {
          Header: 'TripId',
          accessor: 'TripId',
        },
        {
          Header: 'Trip',
          accessor: 'Trip',
        },
        {
          Header: 'Action',
          accessor: 'Action',
        },
        {
          Header: 'Locaton',
          accessor: 'Locaton',
        },
        {
          Header: 'TimeStamp',
          accessor: 'TimeStamp',
        },
        {
          Header: 'Status',
          accessor: 'Status',
        },
      ],
      []
    ),
    data: useMemo(() => TrackHistory_Data, []),
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

export { TrackHistoryTable };