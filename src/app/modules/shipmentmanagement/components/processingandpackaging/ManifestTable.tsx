import React, {useMemo} from 'react'
import Manifest_Data from './Manifest_Data.json'
import {useTable, useSortBy} from 'react-table'
import './CustomTable.css'
import { IManifestModel } from '../../ShipmentModels/ShipmentInterfaces'
import TableActionLinks from '../../../layout/tables/TableActionLinks'

interface Props{
  manifestData:IManifestModel | any ;
}

const ManifestTable = ({ manifestData} : Props) => {

  const tableInstance = useTable({
    columns : useMemo(
      () => [
        {
          Header: 'Id',
          accessor: 'Id',
          // cell:({ value }) => {return format(new Date(value), 'dd/MM/YYYY')}
        },
        {
          Header: 'Manifest Code',
          accessor: 'ManifestCode',
        },
        {
          Header: 'Group WayBillId',
          accessor: 'GroupWayBillId',
        },
        {
          Header: 'Group WayBill',
          accessor: 'GroupWayBill',
        },
        {
          Header: 'UserId',
          accessor: 'UserId',
        },
      ],
      []
    ),
    data: useMemo(() => Manifest_Data, []),
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

export { ManifestTable };