import { RendererModel } from '../../types/table'

export function getHeaderAccessorId<RowData>(model: RendererModel<RowData>[number]): string {
  return Array.isArray(model.accessor)
    ? model.accessor.map(model => getHeaderAccessorId(model)).join('+')
    : model.accessor
}
