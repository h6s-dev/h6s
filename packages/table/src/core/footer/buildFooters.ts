import { flattenRendererModel } from '../../core/renderer/flattenRendererModel'
import { Footer, RendererModel } from '../../types/table'
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
    } else {
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
      } else {
        const colSpan = colSpanQueue.shift()

        if (colSpan == null) {
          footers.push({
            ...getDefaultFooterCell(),
            accessor,
            colSpan: 1,
          })
        } else {
          colSpanQueue.unshift(colSpan)
        }
      }
    }
  }

  return footers
}

function buildColSpanQueue<RowData>(rendererModel: RendererModel<RowData>): Array<{ value: number | null, extends: boolean } | null> {
  const queue: Array<{ value: number | null, extends: boolean } | null> = []

  for (const model of rendererModel) {
    const { accessor, footer, rules } = model
    const hasChild = Array.isArray(accessor)

    if (hasChild) {
      queue.push(...buildColSpanQueue(accessor))
    } else {
      if (footer != null) {
        queue.push({
          value: 1,
          extends: rules?.extendsFooter ?? true,
        })
      } else {
        const lastValue = queue.pop()

        if (lastValue != null) {
          if (lastValue.extends) {
            queue.push({ value: (lastValue.value ?? 1) + 1, extends: lastValue.extends })
          } else {
            queue.push(lastValue)
            queue.push({ value:null, extends: lastValue.extends })
          }
        } else {
          queue.push(null)
        }
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

  const colSpanQueue = buildColSpanQueue(rendererModel).map(x => x?.value ?? null)
  const head = shiftUntil(model, x => x.footer == null)
  const tail = popUntil(model, x => x.footer == null)
  const middle = model

  if (tail.length > 0) {
    const lastColSpan = colSpanQueue.pop() ?? 1

    colSpanQueue.push(lastColSpan - tail.length)
  }

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
