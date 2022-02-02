import { RendererModel, unstable_RendererModel } from '../types/table'

export function transToInternalRendererModel<RowData>(
  model: unstable_RendererModel<RowData>,
): RendererModel<RowData> {

  return model.map(x => {
    return {
      label: x.label,
      header: x.head?.render,
      cell: x.cell?.render,
      footer: x.foot?.render,
      accessor: Array.isArray(x.accessor) ? transToInternalRendererModel(x.accessor) : x.accessor,
      rules: {
        mergeRow: x.cell?.mergeRow,
        colSpanAs: x.cell?.colSpanAs,
        extendsFooter: x.foot?.extends,
      },
    }
  })
}
