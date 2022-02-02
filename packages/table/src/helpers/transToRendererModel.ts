import { RendererModel, TableModel } from '../types/table'

export function transToRendererModel<RowData>(
  model: TableModel<RowData>,
): RendererModel<RowData> {
  return model.map(x => {
    return {
      ...x,
      header: x.head?.render,
      cell: x.cell?.render,
      footer: x.foot?.render,
      accessor: Array.isArray(x.accessor) ? transToRendererModel(x.accessor) : x.accessor,
      rules: {
        mergeRow: x.cell?.mergeRow,
        colSpanAs: x.cell?.colSpanAs,
        extendsFooter: x.foot?.extends,
      },
    }
  })
}
