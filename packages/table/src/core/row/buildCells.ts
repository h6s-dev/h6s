import type { PrivateAggregatedCell, RendererModel } from "../../types/table";
import { generateTableID } from "../../utils/generateTableID";

interface Options<CellRenderer> {
  cellRenderer?: CellRenderer;
}

export function buildCells<Row, CellRenderer>(rendererModel: RendererModel<Row>, options?: Options<CellRenderer>) {
  return _build(rendererModel, { ...options, labelSequence: [] });
}

interface BuildOptions<CellRenderer> extends Options<CellRenderer> {
  labelSequence: string[];
}

function _build<Row, CellRenderer>(
  rendererModel: RendererModel<Row>,
  { cellRenderer, labelSequence }: BuildOptions<CellRenderer>,
) {
  const cells: Array<PrivateAggregatedCell<Row>> = [];

  for (const model of rendererModel) {
    const { accessor, label, cell, rules } = model;
    const hasChild = Array.isArray(accessor);
    const sequence = labelSequence.concat(label);

    if (hasChild) {
      cells.push(
        ..._build(accessor, {
          labelSequence: sequence,
          cellRenderer,
        }),
      );
    } else {
      cells.push({
        id: generateTableID(),
        accessor,
        label,
        labelSequence: sequence,
        render: typeof cellRenderer === "function" ? cellRenderer(cell) : ({ cellProps }) => cellProps.value,
        rules,
      });
    }
  }

  return cells;
}
