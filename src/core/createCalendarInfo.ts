import { getDaysInMonth, setDay, startOfMonth } from 'date-fns'

import { DateCell, MonthMatrix, WeekDayType, WeekRow } from '../models'
import { arrayOf, parseDate } from '../utils'

export default function createCalendarInfo(
  cursorDate: Date,
  weekStartsOn: WeekDayType,
) {
  const { year, month, day } = parseDate(cursorDate)
  const startWeekdayInMonth = getStartWeekdayInMonth(cursorDate, weekStartsOn)
  const weeksInMonth = getWeeksInMonth(cursorDate, weekStartsOn)
  const weekendDays = arrayOf(7).map((index) => ({
    value: setDay(cursorDate, (index + weekStartsOn) % 7),
  }))

  const getCurrentWeekIndex = () => {
    const control = (day - 1) % 7 > startWeekdayInMonth ? 0 : -1

    return Math.ceil(day / 7) + control
  }

  const getDateCellByIndex = (
    weekIndex: number,
    dayIndex: number,
  ): DateCell => {
    const day = weekIndex * 7 + dayIndex - startWeekdayInMonth + 1

    return { value: new Date(year, month, day) }
  }

  const getWeekRow = (weekIndex: number = getCurrentWeekIndex()): WeekRow => {
    return {
      value: arrayOf(7).map((dayIndex) =>
        getDateCellByIndex(weekIndex, dayIndex),
      ),
    }
  }

  const getMonth = (weeks = weeksInMonth): MonthMatrix => {
    return { value: arrayOf(weeks).map(getWeekRow) }
  }

  return {
    cursorDate,
    year,
    month,
    day,
    weekStartsOn,
    startWeekdayInMonth,
    weeksInMonth,
    weekendDays,
    getDateCellByIndex,
    getCurrentWeekIndex,
    getWeekRow,
    getMonth,
  }
}

function getStartWeekdayInMonth(date: Date, weekStartsOn: WeekDayType) {
  const monthStartsAt = (startOfMonth(date).getDay() - weekStartsOn) % 7

  return monthStartsAt < 0 ? monthStartsAt + 7 : monthStartsAt
}

function getWeeksInMonth(date: Date, weekStartsOn: WeekDayType) {
  const { month } = parseDate(date)
  const totalDaysOfMonth = getDaysInMonth(month)

  return Math.ceil((weekStartsOn + totalDaysOfMonth) / 7)
}
