import { RendererModel, unstable_RendererModel } from '../types/table'

export function unstableToStable<RowData>(
  model: RendererModel<RowData> | unstable_RendererModel<RowData>,
): RendererModel<RowData> {
  if (!isUnstableRenderer(model)) {
    return model
  }

  return model.map(x => {
    return {
      label: x.header.label,
      header: x.header.render,
      cell: x.cell.render,
      footer: x.footer?.render,
      accessor: Array.isArray(x.accessor) ? unstableToStable(x.accessor) : x.accessor,
      rules: {
        mergeRow: x.cell.mergeRow,
        colSpanAs: x.cell.colSpanAs,
      },
    }
  })
}

function isUnstableRenderer<RowData>(
  model: RendererModel<RowData> | unstable_RendererModel<RowData>,
): model is unstable_RendererModel<RowData> {
  return (model as RendererModel<RowData>)?.[0].label == null
}
