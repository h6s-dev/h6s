import {
  getDaysInMonth,
  isSameDay,
  isSameMonth,
  isSameYear,
  setDay,
  startOfMonth,
} from 'date-fns'

import { WeekDayType } from '../models'
import { arrayOf, parseDate } from '../utils'

export default function createCalendarInfo(date: Date, weekStartsOn: WeekDayType) {
  const { year, month, day } = parseDate(date)
  const startWeekdayInMonth = getStartWeekdayInMonth(date, weekStartsOn)
  const weeksInMonth = getWeeksInMonth(date, weekStartsOn)
  const weekendDays = arrayOf(7).map(index => setDay(date, (index + weekStartsOn) % 7))

  const getTargetDate = (weekIndex: number, dayIndex: number) => {
    const day = weekIndex * 7 + dayIndex - startWeekdayInMonth + 1

    return new Date(year, month, day)
  }
  const getCurrentWeek = () => {
    const control = (day - 1) % 7 > startWeekdayInMonth ? 1 : 0

    return Math.ceil(day / 7) + control
  }

  const getMonth = () => {
    return arrayOf(weeksInMonth).map(weekIndex => getWeek(weekIndex))
  }
  const getWeek = (weekIndex: number) => {
    return arrayOf(7).map(dayIndex => {
      const date = getTargetDate(weekIndex, dayIndex)

      return {
        date,
        isCurrentMonth: isCurrentMonth(date),
        isCurrentDate: isCurrentDate(date),
      }
    })
  }
  const isCurrentMonth = (targetDate: Date) => {
    return isSameMonth(targetDate, date) && isSameYear(targetDate, date)
  }
  const isCurrentDate = (targetDate: Date) => {
    return isCurrentMonth(targetDate) && isSameDay(targetDate, date)
  }

  return {
    date,
    year,
    month,
    day,
    weekStartsOn,
    startWeekdayInMonth,
    weeksInMonth,
    weekendDays,
    getTargetDate,
    getCurrentWeek,
    getWeek,
    getMonth,
    isCurrentMonth,
    isCurrentDate,
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
