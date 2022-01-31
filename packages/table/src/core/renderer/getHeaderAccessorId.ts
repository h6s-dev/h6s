import { RendererModel } from '../../types/tabler'

export function getHeaderAccessorId<RowData>(model: RendererModel<RowData>[number]): string {
  return Array.isArray(model.accessor)
    ? model.accessor.map(model => getHeaderAccessorId(model)).join('+')
    : model.accessor
}
