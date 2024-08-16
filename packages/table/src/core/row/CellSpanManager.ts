import type { RendererRules } from "../../types/table";
import { get } from "../../utils/get";

export class CellSpanManager<Row extends Record<string, any>> {
  private rowSpanMap: Map<string, number>;

  constructor() {
    this.rowSpanMap = new Map<string, number>();
  }

  getColSpan(Row: Row, rules?: RendererRules<Row>) {
    const { colSpanRule } = this.parseRules(rules);

    return typeof colSpanRule === "function" ? colSpanRule(Row) : colSpanRule ?? 1;
  }

  getRowSpan(Row: Row, rules?: RendererRules<Row>) {
    const key = this.getRowSpanMapKey(Row, rules);

    if (key == null) {
      return 1;
    }

    return this.rowSpanMap.get(key);
  }

  saveRowSpan(Row: Row, rules?: RendererRules<Row>) {
    const key = this.getRowSpanMapKey(Row, rules);

    if (key != null) {
      const savedRowSpan = this.rowSpanMap.get(key);

      if (savedRowSpan != null) {
        this.rowSpanMap.set(key, savedRowSpan + 1);

        return true;
      }
      this.rowSpanMap.set(key, 1);
    }

    return false;
  }

  getMaxRowSpan() {
    return Math.max(...this.rowSpanMap.values());
  }

  private parseRules(rules?: RendererRules<Row>) {
    const { mergeRow, colSpanAs: colSpanRule } = rules ?? {};

    return { mergeRow, colSpanRule };
  }

  private getRowSpanMapKey(row: Row, rules?: RendererRules<Row>) {
    const { mergeRow } = this.parseRules(rules);

    if (mergeRow == null) {
      return;
    }

    if (typeof mergeRow === "function") {
      return mergeRow(row);
    }

    if (Array.isArray(mergeRow)) {
      return mergeRow.map((accessor) => get(row, accessor)).join("+");
    }

    return JSON.stringify(get(row, mergeRow));
  }
}
