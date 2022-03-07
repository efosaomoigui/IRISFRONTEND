import React, {useEffect, useMemo} from 'react'
import {useTable, useSortBy, useGlobalFilter, usePagination, useRowSelect} from 'react-table'
import {usePageData} from '../../../../_iris/layout/core'
import {IUserModel} from '../../auth/models/AuthInterfaces'
import './CustomTable.css'
// import 'bootstrap/dist/css/bootstrap.min.css';
import GlobalFilter from './GlobalFilter'
import TableActionLinks from './TableActionLinks'

interface colAcc {
  Header: string
  accessor: string
}

interface Props {
  irisData: IUserModel | any
  columnsMap: colAcc[]
  DetailsPath: string
  EditPath: string
  DeletePath: string
  handleEdit?: (event: React.MouseEvent) => void
}

const GenericTable = ({irisData, columnsMap, DetailsPath, EditPath, DeletePath, handleEdit}: Props) => {

  // console.log("realdata==>", irisData)
  const tableInstance = useTable(
    {
      columns: useMemo(() => columnsMap, []),
      data: useMemo(() => irisData, []),
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
    selectedFlatRows,
    state,
    setGlobalFilter,
  } = tableInstance

  const {globalFilter, pageIndex, pageSize} = state
  const {entityDetailValues, setEntityDetailValues, selectUrlParam, setSelectUrlParam} =
    usePageData()

  useEffect(() => {
    setEntityDetailValues!(irisData)
  },[entityDetailValues])

  return (
    <div>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getFooterGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  {/* Add a sort direction indicator */}
                  <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                </th>
              ))}
              <th className='min-w-100px text-end'>Actions</th>
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            // {console.log("Row: ",row.index, row.cells[0])}
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}

                <td>
                  <TableActionLinks
                    DetailsPath={`${DetailsPath + row.cells[0].value}`}
                    EditPath={`${[EditPath,row.cells[0].value]}`} 
                    DeletePath={'#'}
                    handleEdit={handleEdit}
                  />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <br />
      <div>
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type='number'
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pagenumber = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(pagenumber)
            }}
            style={{width: '50px'}}
            // className='form-control'
          />
        </span>
        <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
          {[10, 25, 50, 100].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>
        <button className='' onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>{' '}
        <button className='' onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>
      </div>
    </div>
  )
}

export {GenericTable}
