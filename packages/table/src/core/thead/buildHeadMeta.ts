import { HeadId, HeadMeta, RendererModel } from '../../types/table'
import { arrayIncludes } from '../../utils/array'
import { getHeaderAccessorId } from '../renderer/getHeaderAccessorId'
import { getLargestDepth } from '../renderer/getLargestDepth'

interface Options<Row> {
  visibleHeadIds?: Array<HeadId<Row>>;
}

export function buildHeadMeta<Row>(
  rendererModel: RendererModel<Row>,
  options?: Options<Row>,
) {
  const headMeta = _build(rendererModel, { ...options, depth: 0 })

  return { headMeta }
}

interface BuildOptions<Row> extends Options<Row> {
  depth: number;
}

function _build<Row>(rendererModel: RendererModel<Row>, options: BuildOptions<Row>) {
  const headMeta: HeadMeta = {}
  const { visibleHeadIds, depth } = options

  for (const model of rendererModel) {
    const { label, accessor } = model
    const hasChild = Array.isArray(accessor)

    const base = hasChild ? accessor : [{ accessor }]
    const show =
      visibleHeadIds != null ? base.some(x => arrayIncludes(visibleHeadIds, x.accessor)) : true

    headMeta[getHeaderAccessorId(model)] = {
      label,
      show,
      countOfChild: hasChild ? getLargestDepth(accessor) : 0,
      countOfParent: depth,
    }

    if (hasChild) {
      Object.assign(headMeta, _build(accessor, { ...options, depth: depth + 1 }))
    }
  }

  return headMeta
}
