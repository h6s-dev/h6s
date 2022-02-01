import { HeaderTreeNode, RendererModel } from '../../types/table'

export function buildHeaderTree<RowData>(rendererModel: RendererModel<RowData>) {
  const headerTree = _build(rendererModel)

  return { headerTree }
}

function _build<RowData>(rendererModel: RendererModel<RowData>) {
  const headerTree: Array<HeaderTreeNode<RowData>> = []

  for (const model of rendererModel) {
    const { label, accessor } = model

    headerTree.push({
      label,
      accessor: Array.isArray(accessor) ? _build(accessor) : accessor,
    })
  }

  return headerTree
}
