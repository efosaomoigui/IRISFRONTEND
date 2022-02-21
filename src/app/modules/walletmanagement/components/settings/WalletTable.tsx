import React, {useMemo} from 'react'
import Wallet_Data from './Wallet_Data.json'
import {useTable, useSortBy} from 'react-table'
import './CustomTable.css'
import { IWalletModel } from '../../Models/WalletInterfaces'

interface Props{
  walletData:IWalletModel | any ;
}

const WalletTable = ({walletData} : Props) => {

  const tableInstance = useTable({
    columns : useMemo(
      () => [
        {
          Header: 'WalletId',
          accessor: 'WalletId',
        },
        {
          Header: 'Wallet Number',
          accessor: 'WalletNumber',
        },
        {
          Header: 'User Id',
          accessor: 'UserId',
        },
        {
          Header: 'Active',
          accessor: 'IsActive',
        },
      ],
      []
    ),
    data: useMemo(() => Wallet_Data, []),
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

export { WalletTable };