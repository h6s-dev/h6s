import { RendererRules } from '../../types/table'
import { get } from '../../utils/get'

export class CellSpanManager<RowData> {
  private rowSpanMap: Map<string, number>

  constructor() {
    this.rowSpanMap = new Map<string, number>()
  }

  getColSpan(rowData: RowData, rules?: RendererRules<RowData>) {
    const { colSpanRule } = this.parseRules(rules)

    return typeof colSpanRule === 'function' ? colSpanRule(rowData) : colSpanRule ?? 1
  }

  getRowSpan(rowData: RowData, rules?: RendererRules<RowData>) {
    const key = this.getRowSpanMapKey(rowData, rules)

    if (key == null) {
      return 1
    }

    return this.rowSpanMap.get(key)
  }

  saveRowSpan(rowData: RowData, rules?: RendererRules<RowData>) {
    const key = this.getRowSpanMapKey(rowData, rules)

    if (key != null) {
      const savedRowSpan = this.rowSpanMap.get(key)

      if (savedRowSpan != null) {
        this.rowSpanMap.set(key, savedRowSpan + 1)

        return true
      }
      this.rowSpanMap.set(key, 1)
    }

    return false
  }

  getMaxRowSpan() {
    return Math.max(...this.rowSpanMap.values())
  }

  private parseRules(rules?: RendererRules<RowData>) {
    const { mergeRow, colSpanAs: colSpanRule } = rules ?? {}

    return { mergeRow, colSpanRule }
  }

  private getRowSpanMapKey(rowData: RowData, rules?: RendererRules<RowData>) {
    const { mergeRow } = this.parseRules(rules)

    if (mergeRow == null) {
      return
    }

    if (typeof mergeRow === 'function') {
      return mergeRow(rowData)
    }

    if (Array.isArray(mergeRow)) {
      return mergeRow.map(accessor => get(rowData, accessor as string)).join('+')
    }

    return JSON.stringify(get(rowData, mergeRow))
  }
}
