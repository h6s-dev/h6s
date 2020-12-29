import { getDate } from 'date-fns'

import { MonthMatrix } from '../models'
import { isSameDate, isSameMonth } from '../utils'

export default function withDatePropsMonth(baseDate: Date, cursorDate: Date) {
  return function (month: MonthMatrix) {
    return {
      ...month,
      value: month.value.map((week) => {
        return {
          ...week,
          value: week.value.map(({ value: targetDate, ...restDayProps }) => {
            const isCurrentMonth = isSameMonth(cursorDate, targetDate)
            const isCurrentDate = isSameDate(baseDate, targetDate)

            return {
              ...restDayProps,
              value: targetDate,
              date: getDate(targetDate),
              isCurrentMonth,
              isCurrentDate,
            }
          }),
        }
      }),
    }
  }
}
