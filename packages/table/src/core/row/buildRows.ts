import { Cell, PrivateAggregatedCell } from '../../types/table'
import { Primitive } from '../../types/utility'
import { generateTableID } from '../../utils/generateTableID'
import { get } from '../../utils/get'
import { invariant } from '../../utils/invariant'
import { CellSpanManager } from './CellSpanManager'

interface Options<Row> {
  cells: Array<PrivateAggregatedCell<Row>>;
}

export function buildRows<Row>(data: Row[], { cells }: Options<Row>) {
  const manager = new CellSpanManager<Row>()

  const candidateRows = data.map(Row => {
    return cells
      .map(cell => {
        const value = get(Row, String(cell.accessor))

        const dropCell = manager.saveRowSpan(Row, cell.rules)

        if (dropCell) {
          return null
        }

        return { value, Row, ...cell }
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

        const { Row, rules, value, ...rest } = aggregatedCell

        const cell: Cell<Row> = {
          rowSpan: manager.getRowSpan(Row, rules) ?? 1,
          colSpan: manager.getColSpan(Row, rules),
          rowValues: Row,
          value: value as Primitive,
          ...rest,
        }

        return cell
      }),
    }
  })

  return { rows }
}
