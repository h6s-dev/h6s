import { getHeaderAccessorId } from '../../core/renderer/getHeaderAccessorId'
import { getLargestDepth } from '../../core/renderer/getLargestDepth'
import { HeaderId, HeaderMap, RendererModel } from '../../types/table'
import { arrayIncludes } from '../../utils/array'

interface Options<RowData> {
  visibleHeaderIds?: Array<HeaderId<RowData>>;
}

export function buildHeaderMap<RowData>(
  rendererModel: RendererModel<RowData>,
  options?: Options<RowData>,
) {
  const headerMap = _build(rendererModel, { ...options, depth: 0 })

  return { headerMap }
}

interface BuildOptions<RowData> extends Options<RowData> {
  depth: number;
}

function _build<RowData>(rendererModel: RendererModel<RowData>, options: BuildOptions<RowData>) {
  const headerMap: HeaderMap = {}
  const { visibleHeaderIds, depth } = options

  for (const model of rendererModel) {
    const { label, accessor } = model
    const hasChild = Array.isArray(accessor)

    const base = hasChild ? accessor : [{ accessor }]
    const show =
      visibleHeaderIds != null ? base.some(x => arrayIncludes(visibleHeaderIds, x.accessor)) : true

    headerMap[getHeaderAccessorId(model)] = {
      label,
      show,
      countOfChild: hasChild ? getLargestDepth(accessor) : 0,
      countOfParent: depth,
    }

    if (hasChild) {
      Object.assign(headerMap, _build(accessor, { ...options, depth: depth + 1 }))
    }
  }

  return headerMap
}
