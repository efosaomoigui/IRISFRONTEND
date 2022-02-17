import React, {useMemo} from 'react'
import WalletTransaction_Data from './WalletTransaction_Data.json'
import {useTable, useSortBy} from 'react-table'
import './CustomTable.css'
import { IWalletTransactionModel } from '../../Models/WalletInterfaces'


interface Props{
  walletTransactionData:IWalletTransactionModel | any ;
}

const WalletTransactionTable = ({walletTransactionData} : Props) => {

  const tableInstance = useTable({
    columns : useMemo(
      () => [
        {
          Header: 'WalletTransaction Id',
          accessor: 'WalletTransactionId',
        },
        {
          Header: 'Amount',
          accessor: 'Amount',
        },
        {
          Header: 'Transaction Type',
          accessor: 'TransactionType',
        },
        {
          Header: 'Description',
          accessor: 'Description',
        },
        {
          Header: 'Wallet Number',
          accessor: 'WalletNumber',
        },
        {
          Header: 'Date Created',
          accessor: 'DateCreated',
        }
      ],
      []
    ),
    data: useMemo(() => WalletTransaction_Data, []),
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

export { WalletTransactionTable };