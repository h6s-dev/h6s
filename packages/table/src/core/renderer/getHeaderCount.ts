import { getChildrenCount } from '../../core/renderer/getChildrenCount'
import { RendererModel } from '../../types/tabler'

export function getHeaderCount<RowData>(model: RendererModel<RowData>): number {
  return model.reduce((acc, result) => {
    return acc + getChildrenCount(result)
  }, 0)
}
