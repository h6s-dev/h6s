import { paymentDataset } from '../mocks/payments.mock'
import { paymentsTableRendererModel } from '../mocks/paymentsTableRendererModel.mock'
import { useTable } from './useTable'

export default {
  title: 'Table/basic',
  component: Example,
}

export function Example() {
  const [instance] = useTable({
    model: paymentsTableRendererModel,
    source: paymentDataset,
  })

  return (
    <table style={{ border: '1px solid grey' }}>
      <thead>
        {instance.headerGroups.map(({ headers, getRowProps }) => {
          const props = getRowProps()

          return (
            <tr key={props.id} {...props}>
              {headers.map(header => {
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
          {instance.footers?.map(cell => {
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
