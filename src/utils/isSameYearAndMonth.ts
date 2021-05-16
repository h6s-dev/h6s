import { isSameMonth as _isSameMonth, isSameYear } from 'date-fns'

export default function isSameYearAndMonth(baseDate: Date, targetDate: Date) {
  return _isSameMonth(targetDate, baseDate) && isSameYear(targetDate, baseDate)
}
