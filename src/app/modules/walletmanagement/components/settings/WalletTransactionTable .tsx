import React, {useMemo} from 'react'
import WalletTransaction_Data from './Wallet_Data.json'
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
          Header: 'Wallet Number',
          accessor: 'walletNumberId',
        },
        {
          Header: 'Active',
          accessor: 'isActive',
        },
        // {
        //   Header: 'First Name',
        //   accessor: 'firstName',
        // },
        {
          Header: 'User Id',
          accessor: 'userId',
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