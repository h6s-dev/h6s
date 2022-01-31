import { RendererModel } from '../../types/tabler'

export function getChildrenCount<RowData>(model: RendererModel<RowData>[number]): number {
  if (!Array.isArray(model.accessor)) {
    return 1
  }

  return model.accessor.reduce((acc, result) => {
    return acc + getChildrenCount(result)
  }, 0)
}
