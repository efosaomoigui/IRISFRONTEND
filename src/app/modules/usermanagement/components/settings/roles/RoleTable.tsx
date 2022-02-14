import React, { useMemo } from 'react'
import { useSortBy, useTable } from 'react-table'
import { IRoleModel } from '../../../../auth/models/AuthInterfaces'
import TableActionLinks from '../../../../layout/tables/TableActionLinks'
import './CustomTable.css'

interface Props{
  roleData: IRoleModel | any ;
}

const RoleTable = ({roleData}: Props) => {

  const tableInstance = useTable({
    columns : useMemo(
      () => [
        {
          Header: 'Role Id',
          accessor: 'id',
        },
        {
          Header: 'User Name',
          accessor: 'name',
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
    data: useMemo(() => roleData, [roleData]),
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
              <TableActionLinks DetailsPath={'#'} EditPath={'#'} DeletePath={'#'} />
            </tr>
          )
        })}
      </tbody>
      </table>
    </div>
  )
}

export { RoleTable }
