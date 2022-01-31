import { flattenRendererModel } from '../../core/renderer/flattenRendererModel'
import { Footer, RendererModel } from '../../types/tabler'
import { popUntil, shiftUntil } from '../../utils/array'
import { generateTableID } from '../../utils/generateTableID'

interface Options<CellRenderer> {
  cellRenderer?: CellRenderer;
}

export function buildFooters<RowData, CellRenderer>(
  rendererModel: RendererModel<RowData>,
  options?: Options<CellRenderer>,
) {
  const parsed = prepare(rendererModel)

  if (parsed == null) {
    return { footers: null }
  }
  const {
    footer: { head, middle, tail },
    colSpanQueue,
  } = parsed

  const footers = _build(middle, { ...options, colSpanQueue })

  if (head.length > 0) {
    footers.unshift({ ...getDefaultFooterCell(), colSpan: head.length })
  }
  if (tail.length > 0) {
    footers.push({ ...getDefaultFooterCell(), colSpan: tail.length })
  }

  return { footers: footers.length === 0 ? null : footers }
}

interface BuildOptions<CellRenderer> extends Options<CellRenderer> {
  colSpanQueue: Array<number | null>;
}

function _build<RowData, CellRenderer>(
  rendererModel: RendererModel<RowData>,
  { cellRenderer, colSpanQueue }: BuildOptions<CellRenderer>,
) {
  const footers: Array<Footer<RowData>> = []

  for (const model of rendererModel) {
    const { label, accessor, footer } = model
    const hasChild = Array.isArray(accessor)

    if (hasChild) {
      footers.push(..._build(accessor, { cellRenderer, colSpanQueue }))
      break
    }

    if (footer != null) {
      footers.push({
        ...getDefaultFooterCell(),
        accessor,
        colSpan: colSpanQueue.shift() ?? 1,
        value: label,
        render:
          typeof cellRenderer === 'function'
            ? cellRenderer(footer)
            : ({ cellProps }) => cellProps.value,
      })
    }
  }

  return footers
}

function buildColSpanQueue<RowData>(rendererModel: RendererModel<RowData>): Array<number | null> {
  const queue: Array<number | null> = []

  for (const model of rendererModel) {
    const { accessor, footer } = model
    const hasChild = Array.isArray(accessor)

    if (hasChild) {
      queue.push(...buildColSpanQueue(accessor))
    } else {
      if (footer != null) {
        queue.push(1)
      } else {
        const lastValue = queue.pop()

        queue.push(lastValue != null ? lastValue + 1 : null)
      }
    }
  }

  return queue
}

function prepare<RowData>(rendererModel: RendererModel<RowData>) {
  const model = flattenRendererModel(rendererModel)

  if (model.every(x => x.footer == null)) {
    return null
  }

  const colSpanQueue = buildColSpanQueue(rendererModel)
  const head = shiftUntil(model, x => x.footer == null)
  const tail = popUntil(model, x => x.footer == null)
  const middle = model

  return {
    colSpanQueue,
    footer: {
      head,
      tail,
      middle,
    },
  }
}

function getDefaultFooterCell() {
  return {
    id: generateTableID(),
    accessor: null,
    rowSpan: 1,
    value: null,
    render: () => null,
  }
}
