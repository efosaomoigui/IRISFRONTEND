import React, {useMemo} from 'react'
import FleetData from '../../FleetData.json'
import './CustomTable.css'
import { useSortBy, useTable } from 'react-table'

const FleetTable = () => {

  const tableInstance = useTable({
    columns : useMemo(
      () => [
        {
          Header: 'Id',
          accessor: 'id',
        },
        {
          Header: 'registration Number',
          accessor: 'registration_Number',
        },
        {
          Header: 'chasis Number',
          accessor: 'chasis_Number',
        },
        {
          Header: 'engine Number',
          accessor: 'engine_Number',
        },
        {
          Header: 'fleet Type',
          accessor: 'fleet_Type',
        },
        {
          Header: 'capacity',
          accessor: 'capacity',
        },
        {
            Header: 'description',
            accessor: 'description',
        },
        {
            Header: 'fleet Model',
            accessor: 'fleet_Model',
        },
        {
            Header: 'fleet Make',
            accessor: 'fleet_Make',
        },
        {
            Header: 'Owner Id',
            accessor: 'owner_Id',
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