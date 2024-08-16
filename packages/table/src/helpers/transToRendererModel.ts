import { type RendererModel, type TableModel, isRenderer } from "../types/table";

export function transToRendererModel<Row>(model: TableModel<Row>): RendererModel<Row> {
  return model.map((x) => {
    return {
      ...x,
      accessor: Array.isArray(x.accessor) ? transToRendererModel(x.accessor) : x.accessor,
      head: isRenderer(x.head) ? x.head : x.head?.render,
      cell: isRenderer(x.cell) ? x.cell : x.cell?.render,
      foot: isRenderer(x.foot) ? x.foot : x.foot?.render,
      rules: {
        mergeRow: isRenderer(x.cell) ? undefined : x.cell?.mergeRow,
        colSpanAs: isRenderer(x.cell) ? undefined : x.cell?.colSpanAs,
        extendsFoot: isRenderer(x.foot) ? undefined : x.foot?.extends,
      },
    };
  });
}
