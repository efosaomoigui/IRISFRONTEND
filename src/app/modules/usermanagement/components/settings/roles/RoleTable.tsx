import React, {useMemo} from 'react'
import Role_Data from './Role_Data.json'
import {useTable, useSortBy} from 'react-table'
import './CustomTable.css'

const RoleTable = () => {

  const tableInstance = useTable({
    columns : useMemo(
      () => [
        {
          Header: 'Role Id',
          accessor: 'RoleId',
        },
        {
          Header: 'User Name',
          accessor: 'RoleName',
        },
        // {
        //   Header: 'First Name',
        //   accessor: 'firstName',
        // },
        // {
        //   Header: 'Last Name',
        //   accessor: 'lastName',
        // },
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
    data : useMemo(() => Role_Data, []),
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

export { RoleTable };