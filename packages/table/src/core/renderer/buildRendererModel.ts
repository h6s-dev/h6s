import { HeaderMap, RendererModel } from '../../types/tabler'
import { getHeaderAccessorId } from './getHeaderAccessorId'

export function buildRendererModel<RowData>(
  rendererModel: RendererModel<RowData>,
  headerMap: HeaderMap,
): RendererModel<RowData> {
  const result = []

  for (const model of rendererModel) {
    const id = Array.isArray(model.accessor) ? getHeaderAccessorId(model) : model.accessor

    if (headerMap[id].show) {
      const value = Array.isArray(model.accessor)
        ? { ...model, accessor: buildRendererModel(model.accessor, headerMap) }
        : model

      result.push(value)
    }
  }

  return result
}
