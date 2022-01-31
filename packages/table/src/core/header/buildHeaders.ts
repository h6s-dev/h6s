import { getChildrenCount } from '../../core/renderer/getChildrenCount'
import { getLargestDepth } from '../../core/renderer/getLargestDepth'
import { Header, RendererModel } from '../../types/tabler'
import { generateTableID } from '../../utils/generateTableID'

interface Options<CellRenderer> {
  cellRenderer?: CellRenderer;
}

export function buildHeaders<RowData, CellRenderer>(
  rendererModel: RendererModel<RowData>,
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

function _build<RowData, CellRenderer>(
  rendererModel: RendererModel<RowData>,
  { cellRenderer, largestDepth, depth, labelSequence }: BuildOptions<CellRenderer>,
) {
  const headers: Array<Header<RowData>> = []

  for (const model of rendererModel) {
    const { label, accessor, header } = model
    const hasChild = Array.isArray(accessor)
    const sequence = labelSequence.concat(label)

    if (hasChild) {
      headers.push(
        ..._build(accessor, {
          largestDepth,
          depth: depth + 1,
          labelSequence: sequence,
          cellRenderer,
        }),
      )
    }
    headers.push({
      id: generateTableID(),
      accessor: hasChild ? null : accessor,
      rowSpan: hasChild ? 1 : depth > 1 ? largestDepth - depth + 1 : largestDepth,
      colSpan: getChildrenCount(model),
      label,
      value: label,
      labelSequence: sequence,
      render:
        typeof cellRenderer === 'function'
          ? cellRenderer(header)
          : ({ cellProps }) => cellProps.value,
      depth,
    })
  }

  return headers
}
