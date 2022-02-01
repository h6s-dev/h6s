import { RendererModel, unstable_RendererModel } from '../types/table'

export function unstableToStable<RowData>(
  model: RendererModel<RowData> | unstable_RendererModel<RowData>,
): RendererModel<RowData> {
  if (!isUnstableRenderer(model)) {
    return model
  }

  return model.map(x => {
    return {
      label: typeof x.header === 'string' ? x.header : x.header.label,
      header: typeof x.header === 'string' ? undefined : x.header.render,
      cell: x.cell?.render,
      footer: x.footer?.render,
      accessor: Array.isArray(x.accessor) ? unstableToStable(x.accessor) : x.accessor,
      rules: {
        mergeRow: x.cell?.mergeRow,
        colSpanAs: x.cell?.colSpanAs,
        extendsFooter: x.footer?.extends,
      },
    }
  })
}

function isUnstableRenderer<RowData>(
  model: RendererModel<RowData> | unstable_RendererModel<RowData>,
): model is unstable_RendererModel<RowData> {
  return (model as RendererModel<RowData>)?.[0].label == null
}
