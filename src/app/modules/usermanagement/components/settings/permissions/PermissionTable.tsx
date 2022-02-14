import React, {useMemo} from 'react'
import Permission_Data from './Permission_Data.json'
import {useTable, useSortBy} from 'react-table'
import './CustomTable.css'

const PermissionTable = () => {

  const tableInstance = useTable({
    columns : useMemo(
      () => [
        {
          Header: 'Permission Id',
          accessor: 'PermissionId',
        },
        {
          Header: 'Role Id',
          accessor: 'roleId',
        },
        {
          Header: 'Claim Type',
          accessor: 'claimType',
        },
        {
          Header: 'Claim Value',
          accessor: 'claimValue',
        },
        // {
        //   Header: 'Email',
        //   accessor: 'email',
        // },
        // {
        //   Header: 'Phone Number',
        //   accessor: 'phoneNumber',
        // },
      ],
      []
    ),
    data : useMemo(() => Permission_Data, []),
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

export { PermissionTable };