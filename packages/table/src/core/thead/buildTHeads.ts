import { RendererModel, THead } from '../../types/table'
import { generateTableID } from '../../utils/generateTableID'
import { getChildrenCount } from '../renderer/getChildrenCount'
import { getLargestDepth } from '../renderer/getLargestDepth'

interface Options<CellRenderer> {
  cellRenderer?: CellRenderer;
}

export function buildTHeads<Row, CellRenderer>(
  rendererModel: RendererModel<Row>,
  options?: Options<CellRenderer>,
) {
  const largestDepth = getLargestDepth(rendererModel)

  return _build(rendererModel, { ...options, largestDepth, depth: 1, labelSequence: [] })
}

interface BuildOptions<CellRenderer> extends Options<CellRenderer> {
  largestDepth: number;
  depth: number;
  labelSequence: string[];
}

function _build<Row, CellRenderer>(
  rendererModel: RendererModel<Row>,
  { cellRenderer, largestDepth, depth, labelSequence }: BuildOptions<CellRenderer>,
) {
  const heads: Array<THead<Row>> = []

  for (const model of rendererModel) {
    const { label, accessor, head } = model
    const hasChild = Array.isArray(accessor)
    const sequence = labelSequence.concat(label)

    if (hasChild) {
      heads.push(
        ..._build(accessor, {
          largestDepth,
          depth: depth + 1,
          labelSequence: sequence,
          cellRenderer,
        }),
      )
    }
    heads.push({
      id: generateTableID(),
      accessor: hasChild ? null : accessor,
      rowSpan: hasChild ? 1 : depth > 1 ? largestDepth - depth + 1 : largestDepth,
      colSpan: getChildrenCount(model),
      label,
      value: label,
      labelSequence: sequence,
      render:
        typeof cellRenderer === 'function'
          ? cellRenderer(head)
          : ({ cellProps }) => cellProps.value,
      depth,
    })
  }

  return heads
}
