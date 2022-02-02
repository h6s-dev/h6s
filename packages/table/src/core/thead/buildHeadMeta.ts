import { HeadIds, HeadMeta, RendererModel } from '../../types/table'
import { arrayIncludes } from '../../utils/array'
import { getHeaderAccessorId } from '../renderer/getHeaderAccessorId'
import { getLargestDepth } from '../renderer/getLargestDepth'

interface Options<RowData> {
  visibleHeadIds?: Array<HeadIds<RowData>>;
}

export function buildHeadMeta<RowData>(
  rendererModel: RendererModel<RowData>,
  options?: Options<RowData>,
) {
  const headMeta = _build(rendererModel, { ...options, depth: 0 })

  return { headMeta }
}

interface BuildOptions<RowData> extends Options<RowData> {
  depth: number;
}

function _build<RowData>(rendererModel: RendererModel<RowData>, options: BuildOptions<RowData>) {
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
