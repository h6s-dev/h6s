import { PrivateAggregatedCell, RendererModel } from '../../types/tabler'
import { generateTableID } from '../../utils/generateTableID'

interface Options<CellRenderer> {
  cellRenderer?: CellRenderer;
}

export function buildCells<RowData, CellRenderer>(
  rendererModel: RendererModel<RowData>,
  options?: Options<CellRenderer>,
) {
  return _build(rendererModel, { ...options, labelSequence: [] })
}

interface BuildOptions<CellRenderer> extends Options<CellRenderer> {
  labelSequence: string[];
}

function _build<RowData, CellRenderer>(
  rendererModel: RendererModel<RowData>,
  { cellRenderer, labelSequence }: BuildOptions<CellRenderer>,
) {
  const cells: Array<PrivateAggregatedCell<RowData>> = []

  for (const model of rendererModel) {
    const { accessor, label, cell, rules } = model
    const hasChild = Array.isArray(accessor)
    const sequence = labelSequence.concat(label)

    if (hasChild) {
      cells.push(
        ..._build(accessor, {
          labelSequence: sequence,
          cellRenderer,
        }),
      )
    } else {
      cells.push({
        id: generateTableID(),
        accessor,
        label,
        labelSequence: sequence,
        render:
          typeof cellRenderer === 'function'
            ? cellRenderer(cell)
            : ({ cellProps }) => cellProps.value,
        rules,
      })
    }
  }

  return cells
}
