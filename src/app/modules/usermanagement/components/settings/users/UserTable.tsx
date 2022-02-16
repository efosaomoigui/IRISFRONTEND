import React, {useMemo} from 'react'
import User_Data from './User_Data.json'
import {useTable, useSortBy} from 'react-table'
import './CustomTable.css'
import { IUserModel } from '../../../../auth/models/AuthInterfaces'
import { KTSVG } from '../../../../../../_iris/helpers'
import TableActionLinks from '../../../../layout/tables/TableActionLinks'

interface Props{
  usersData:IUserModel | any ;
}

const SearchTripTable = ({ usersData} : Props) => {

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
    data: useMemo(() => User_Data, []),
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

export { SearchTripTable };