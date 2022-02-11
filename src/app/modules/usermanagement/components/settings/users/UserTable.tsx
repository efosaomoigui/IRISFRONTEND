import React, {useMemo} from 'react'
import User_Data from './User_Data.json'
import {useTable, useSortBy} from 'react-table'
import './CustomTable.css'

const UserTable = () => {

  const tableInstance = useTable({
    columns : useMemo(
      () => [
        {
          Header: 'User Id',
          accessor: 'userId',
        },
        {
          Header: 'User Name',
          accessor: 'userName',
        },
        {
          Header: 'First Name',
          accessor: 'firstName',
        },
        {
          Header: 'Last Name',
          accessor: 'lastName',
        },
        {
          Header: 'Email',
          accessor: 'email',
        },
        {
          Header: 'Phone Number',
          accessor: 'phoneNumber',
        },
      ],
      []
    ),
    data : useMemo(() => User_Data, []),
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

export { UserTable };