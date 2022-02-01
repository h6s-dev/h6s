import { RendererModel } from '../../types/table'

export function flattenRendererModel<RowData>(
  rendererModel: RendererModel<RowData>,
): RendererModel<RowData> {
  const models: RendererModel<RowData> = []

  for (const model of rendererModel) {
    const { accessor } = model
    const hasChild = Array.isArray(accessor)

    if (hasChild) {
      models.push(...flattenRendererModel(accessor))
    } else {
      models.push(model)
    }
  }

  return models
}
