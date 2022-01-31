import { Cell, PrivateAggregatedCell } from '../../types/tabler'
import { Primitive } from '../../types/utility'
import { generateTableID } from '../../utils/generateTableID'
import { get } from '../../utils/get'
import { invariant } from '../../utils/invariant'
import { CellSpanManager } from './CellSpanManager'

interface Options<RowData> {
  cells: Array<PrivateAggregatedCell<RowData>>;
}

export function buildRows<RowData>(data: RowData[], { cells }: Options<RowData>) {
  const manager = new CellSpanManager<RowData>()

  const candidateRows = data.map(rowData => {
    return cells
      .map(cell => {
        const value = get(rowData, String(cell.accessor))

        const dropCell = manager.saveRowSpan(rowData, cell.rules)

        if (dropCell) {
          return null
        }

        return { value, rowData, ...cell }
      })
      .filter(x => x != null)
  })

  const rows = candidateRows.map(cells => {
    return {
      getRowProps () {
        return {
          id: generateTableID(),
          rowSpan: manager.getMaxRowSpan(),
        }
      },
      cells: cells.map(aggregatedCell => {
        invariant(aggregatedCell != null, 'invalid cell')

        const { rowData, rules, value, ...rest } = aggregatedCell

        const cell: Cell<RowData> = {
          rowSpan: manager.getRowSpan(rowData, rules) ?? 1,
          colSpan: manager.getColSpan(rowData, rules),
          rowValues: rowData,
          value: value as Primitive,
          ...rest,
        }

        return cell
      }),
    }
  })

  return { rows }
}
