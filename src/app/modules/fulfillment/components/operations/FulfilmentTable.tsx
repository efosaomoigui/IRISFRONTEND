import React, {useMemo} from 'react'
import Fulfilment_Data from './Fulfilment_Data.json'
import {useTable, useSortBy} from 'react-table'
import './CustomTable.css'
import { IUserModel } from '../../../auth/models/AuthInterfaces'
import { IFulfilmentModel } from '../../models/FulfilmentInterface'
import TableActionLinks from '../../../layout/tables/TableActionLinks'


interface Props{
  fulfilmentData:IFulfilmentModel | any ;
}

const FulfilmentTable = ({ fulfilmentData} : Props) => {

  const tableInstance = useTable({
    columns : useMemo(
      () => [
        {
          Header: 'Wallet Number Id',
          accessor: 'walletNumberId',
        },
        {
          Header: 'Number',
          accessor: 'number',
        },
        {
          Header: 'Active',
          accessor: 'isActive',
        },
        {
          Header: 'User Id',
          accessor: 'userId',
        }
      ],
      []
    ),
    data: useMemo(() => Fulfilment_Data, []),
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

export { FulfilmentTable };