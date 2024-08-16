import type { Cell, PrivateAggregatedCell } from "../../types/table";
import type { Primitive } from "../../types/utility";
import { generateTableID } from "../../utils/generateTableID";
import { get } from "../../utils/get";
import { invariant } from "../../utils/invariant";
import { CellSpanManager } from "./CellSpanManager";

interface Options<Row> {
  cells: Array<PrivateAggregatedCell<Row>>;
}

export function buildRows<Row extends Record<string, any>>(data: Row[], { cells }: Options<Row>) {
  const manager = new CellSpanManager<Row>();

  const candidateRows = data.map((row) => {
    return cells
      .map((cell) => {
        const value = get(row, cell.accessor);

        const dropCell = manager.saveRowSpan(row, cell.rules);

        if (dropCell) {
          return null;
        }

        return { value, row, ...cell };
      })
      .filter((x) => x != null);
  });

  const rows = candidateRows.map((cells) => {
    return {
      getRowProps() {
        return {
          id: generateTableID(),
          rowSpan: manager.getMaxRowSpan(),
        };
      },
      cells: cells.map((aggregatedCell) => {
        invariant(aggregatedCell != null, "invalid cell");

        const { row, rules, value, ...rest } = aggregatedCell;

        const cell: Cell<Row> = {
          rowSpan: manager.getRowSpan(row, rules) ?? 1,
          colSpan: manager.getColSpan(row, rules),
          rowValues: row,
          value: value as Primitive,
          ...rest,
        };

        return cell;
      }),
    };
  });

  return { rows };
}
