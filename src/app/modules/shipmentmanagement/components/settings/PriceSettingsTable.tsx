import React, { useMemo } from 'react'
import { useSortBy, useTable } from 'react-table'
import PriceData from '../../PriceData.json'
import { IPriceModel } from '../../ShipmentModels/ShipmentInterfaces'
import './CustomTable.css'

interface Props {
    priceData: IPriceModel | any;
}

const RouteTable = ({ priceData }: Props) => {

    const tableInstance = useTable({
        columns: useMemo(
            () => [
                {
                    Header: 'Id',
                    accessor: 'id',
                },
                {
                    Header: 'Category List',
                    accessor: 'Category',
                },
                {
                    Header: 'Route Identification',
                    accessor: 'RouteId',
                },
                {
                    Header: 'Route',
                    accessor: 'Route', 
                },
                {
                    Header: 'Unit Weight',
                    accessor: 'UnitWeight',
                },
                {
                    Header: 'Price Per-Unit',
                    accessor: 'pricePerUnit',
                },
            ],
            []
        ),
        data: useMemo(() => PriceData, []),
    }, useSortBy) 

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance

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

export { RouteTable }
