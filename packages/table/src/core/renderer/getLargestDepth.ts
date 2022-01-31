import { RendererModel } from '../../types/tabler'

export function getLargestDepth<RowData>(rendererModel: RendererModel<RowData>): number {
  return rendererModel.reduce((acc, { accessor }) => {
    return Array.isArray(accessor) ? getLargestDepth(accessor) + 1 : acc
  }, 1)
}
