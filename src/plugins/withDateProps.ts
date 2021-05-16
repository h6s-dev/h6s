import { getDate } from 'date-fns'

import { DateCell } from '../models'
import { isSameDate, isSameYearAndMonth } from '../utils'

export default function withDateProps(baseDate: Date, cursorDate: Date) {
  return function <T extends DateCell>(cell: T) {
    const { value: targetDate } = cell
    const isCurrentMonth = isSameYearAndMonth(cursorDate, targetDate)
    const isCurrentDate = isSameDate(baseDate, targetDate)

    return {
      ...cell,
      date: getDate(targetDate),
      isCurrentMonth,
      isCurrentDate,
    }
  }
}
