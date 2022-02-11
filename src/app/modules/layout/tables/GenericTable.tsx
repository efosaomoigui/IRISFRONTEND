import React, {useMemo} from 'react'
import MOCK_DATA from './MOCK_DATA.json'
import './CustomTable.css'
import { useSortBy, useTable } from 'react-table'

const GenericTable = () => {

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
    data : useMemo(() => MOCK_DATA, []),
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

export { GenericTable };