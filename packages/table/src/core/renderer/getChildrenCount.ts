import { RendererModel } from '../../types/table'

export function getChildrenCount<Row>(model: RendererModel<Row>[number]): number {
  if (!Array.isArray(model.accessor)) {
    return 1
  }

  return model.accessor.reduce((acc, result) => {
    return acc + getChildrenCount(result)
  }, 0)
}
