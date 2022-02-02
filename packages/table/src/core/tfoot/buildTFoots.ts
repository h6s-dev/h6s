import { RendererModel, TFoot } from '../../types/table'
import { popUntil, shiftUntil } from '../../utils/array'
import { generateTableID } from '../../utils/generateTableID'
import { flattenRendererModel } from '../renderer/flattenRendererModel'

interface Options<CellRenderer> {
  cellRenderer?: CellRenderer;
}

export function buildTFoots<Row, CellRenderer>(
  rendererModel: RendererModel<Row>,
  options?: Options<CellRenderer>,
) {
  const parsed = prepare(rendererModel)

  if (parsed == null) {
    return { tfoots: null }
  }
  const {
    result: { head, middle, tail },
    colSpanQueue,
  } = parsed

  const tfoots = _build(middle, { ...options, colSpanQueue })

  if (head.length > 0) {
    tfoots.unshift({ ...getDefaultTFootCell(), colSpan: head.length })
  }
  if (tail.length > 0) {
    tfoots.push({ ...getDefaultTFootCell(), colSpan: tail.length })
  }

  return { tfoots: tfoots.length === 0 ? null : tfoots }
}

interface BuildOptions<CellRenderer> extends Options<CellRenderer> {
  colSpanQueue: Array<number | null>;
}

function _build<Row, CellRenderer>(
  rendererModel: RendererModel<Row>,
  { cellRenderer, colSpanQueue }: BuildOptions<CellRenderer>,
) {
  const tfoots: Array<TFoot<Row>> = []

  for (const model of rendererModel) {
    const { label, accessor, foot } = model
    const hasChild = Array.isArray(accessor)

    if (hasChild) {
      tfoots.push(..._build(accessor, { cellRenderer, colSpanQueue }))
    } else {
      if (foot != null) {
        tfoots.push({
          ...getDefaultTFootCell(),
          accessor,
          colSpan: colSpanQueue.shift() ?? 1,
          value: label,
          render:
            typeof cellRenderer === 'function'
              ? cellRenderer(foot)
              : ({ cellProps }) => cellProps.value,
        })
      } else {
        const colSpan = colSpanQueue.shift()

        if (colSpan == null) {
          tfoots.push({
            ...getDefaultTFootCell(),
            accessor,
            colSpan: 1,
          })
        } else {
          colSpanQueue.unshift(colSpan)
        }
      }
    }
  }

  return tfoots
}

function buildColSpanQueue<Row>(rendererModel: RendererModel<Row>): Array<{ value: number | null, extends: boolean } | null> {
  const queue: Array<{ value: number | null, extends: boolean } | null> = []

  for (const model of rendererModel) {
    const { accessor, foot, rules } = model
    const hasChild = Array.isArray(accessor)

    if (hasChild) {
      queue.push(...buildColSpanQueue(accessor))
    } else {
      if (foot != null) {
        queue.push({
          value: 1,
          extends: rules?.extendsFoot ?? true,
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

function prepare<Row>(rendererModel: RendererModel<Row>) {
  const model = flattenRendererModel(rendererModel)

  if (model.every(x => x.foot == null)) {
    return null
  }

  const colSpanQueue = buildColSpanQueue(rendererModel).map(x => x?.value ?? null)
  const head = shiftUntil(model, x => x.foot == null)
  const tail = popUntil(model, x => x.foot == null)
  const middle = model

  if (tail.length > 0) {
    const lastColSpan = colSpanQueue.pop() ?? 1

    colSpanQueue.push(lastColSpan - tail.length)
  }

  return {
    colSpanQueue,
    result: {
      head,
      tail,
      middle,
    },
  }
}

function getDefaultTFootCell() {
  return {
    id: generateTableID(),
    accessor: null,
    rowSpan: 1,
    value: null,
    render: () => null,
  }
}
