import React, {useMemo} from 'react'
import PaymentLog_Data from './PaymentLog_Data.json'
import {useTable, useSortBy} from 'react-table'
import './CustomTable.css'
import { IPaymentLogModel } from '../../PaymentModels/PaymentmentInterfaces'
import TableActionLinks from '../../../layout/tables/TableActionLinks'


interface Props{
  usersData:IPaymentLogModel | any ;
}

const PaymentLogTable = ({ usersData} : Props) => {

  const tableInstance = useTable({
    columns : useMemo(
      () => [
        {
          Header: 'Amount',
          accessor: 'Amount',
        },
        {
          Header: 'Payment Method',
          accessor: 'PaymentMethod',
        },
        {
          Header: 'User',
          accessor: 'User',
        },
        {
          Header: 'TransactionId',
          accessor: 'TransactionId',
        },
      ],
      []
    ),
    data: useMemo(() => PaymentLog_Data, []),
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

export { PaymentLogTable };