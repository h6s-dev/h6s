import { useState } from 'react'

import { paymentDataset, paymentDatasetWithSum } from '../mocks/payments.mock'
import { paymentsTableModel } from '../mocks/paymentsTableModel.mock'
import { TableInstance } from '../types/table'
import { objectEntries } from '../utils/object'
import { useTable } from './useTable'

export default {
  title: 'table/useTable',
  component: useTable,
}

export function Basic() {
  const [instance, controls] = useTable({
    model: paymentsTableModel,
    source: paymentDataset,
  })
  const [headers, setHeaders] = useState(() => instance.visibleHeadIds)

  return (
    <>
      <TableUI instance={instance} />
      <ul>
        {objectEntries(instance.headMeta).map(([id, { label, show, countOfChild }]) => {
          return (
            <label key={id}>
              <input
                type="checkbox"
                defaultChecked={show}
                disabled={countOfChild > 0}
                onChange={({ target: { checked } }) => {
                  // FIXME: infer type
                  checked ? setHeaders(x => x.concat(id as any)) : setHeaders(x => x.filter(y => y !== id))
                }} />
              {label}
            </label>
          )
        })}
      </ul>
      <button onClick={() => controls.updateHeader(headers)}>Apply</button>
      <button onClick={() => controls.updateHeader(instance.selectableHeadIds)}>Show All</button>
    </>
  )
}

export function ComposeDataset() {
  const [instance] = useTable({
    model: paymentsTableModel,
    source: paymentDatasetWithSum,
  })

  return <TableUI instance={instance} />
}

interface TableUIProps<RowData> {
  instance: TableInstance<RowData>
}

function TableUI<RowData>({ instance }: TableUIProps<RowData>) {
  return (
    <table style={{ border: '1px solid grey' }}>
      <thead>
        {instance.theadGroups.map(({ theads, getRowProps }) => {
          const props = getRowProps()

          return (
            <tr key={props.id} {...props}>
              {theads.map(header => {
                return (
                  <th key={header.id} rowSpan={header.rowSpan} colSpan={header.colSpan} style={{ border: '1px solid grey' }}>
                    {header.render({ cellProps: header })}
                  </th>
                )
              })}
            </tr>
          )
        })}
      </thead>
      <tbody>
        {instance.rows.map(({ cells, getRowProps }) => {
          const props = getRowProps()

          return (
            <tr key={props.id} {...props}>
              {cells.map(cell => {
                if (cell.colSpan === 0) {
                  return null
                }

                return (
                  <td key={cell.id} rowSpan={cell.rowSpan} colSpan={cell.colSpan} style={{ border: '1px solid grey' }}>
                    {cell.render({ cellProps: cell })}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
      <tfoot>
        <tr>
          {instance.tfoots?.map(cell => {
            return (
              <th key={cell.id} rowSpan={cell.rowSpan} colSpan={cell.colSpan} style={{ border: '1px solid grey' }}>
                {cell.render({ cellProps: cell })}
              </th>
            )
          })}
        </tr>
      </tfoot>
    </table>
  )
}
