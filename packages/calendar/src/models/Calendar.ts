export interface DateCell extends Record<string, unknown> {
  value: Date
}

export interface WeekRow extends Record<string, unknown> {
  value: DateCell[]
}

export interface MonthMatrix extends Record<string, unknown> {
  value: WeekRow[]
}
