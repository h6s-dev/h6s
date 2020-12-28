import {
  addMonths,
  subMonths,
} from 'date-fns'
import { useState } from 'react'

import { createCalendarInfo } from './core'
import { CalendarViewType, WeekDayType } from './models'
import { attachKeyToArray } from './utils'

export interface UseCalendarOptions {
  defaultDate?: Date | number | string
  defaultWeekStart?: WeekDayType
  defaultViewType?: CalendarViewType
}

export default function useCalendar(options: UseCalendarOptions = {}) {
  const { defaultDate, defaultWeekStart = 0, defaultViewType = CalendarViewType.Month } = options
  const baseDate = defaultDate ? new Date(defaultDate) : new Date()

  const [weekStartsOn, setWeekStartsOn] = useState(defaultWeekStart)
  const [currentDate, setCurrentDate] = useState(baseDate)
  const [viewType, setViewType] = useState(defaultViewType)

  const calendar = createCalendarInfo(currentDate, weekStartsOn)
  const { weekendDays, getCurrentWeek, getWeek, getMonth } = calendar

  const getHeaders = (viewType: CalendarViewType) => {
    switch (viewType) {
      case 'month':
      case 'week':
        return {
          weekDays: attachKeyToArray(weekendDays, 'weekdays'),
        }
      case 'day':
      default:
        return {
          weekDays: attachKeyToArray([baseDate], 'weekdays'),
        }
    }
  }

  const getBody = (viewType: CalendarViewType) => {
    const currentWeek = getCurrentWeek()
    const monthWeeks = attachKeyToArray(getMonth().map(week => attachKeyToArray(week, 'days')), 'weeks')
    const weekWeeks = attachKeyToArray([attachKeyToArray(getWeek(currentWeek), 'days')], 'weeks')

    switch (viewType) {
      case 'month':
        return {
          weeks: monthWeeks,
        }
      case 'week':
        return {
          weeks: weekWeeks,
        }
      case 'day':
      default:
        return {
          weeks: [],
        }
    }
  }

  return {
    calendar: {
      ...calendar,
      viewType,
    },
    headers: getHeaders(viewType),
    body: getBody(viewType),
    navigation: {
      setNextMonth: () => setCurrentDate((date) => addMonths(date, 1)),
      setPrevMonth: () => setCurrentDate((date) => subMonths(date, 1)),
      setToday: () => setCurrentDate(new Date()),
      setDate: (date: Date) => setCurrentDate(date),
    },
    view: {
      type: viewType,
      setViewType,
      setWeekStartsOn,
      isMonthView: viewType === CalendarViewType.Month,
      isWeekView: viewType === CalendarViewType.Week,
      isDayView: viewType === CalendarViewType.Day,
      showMonthView: () => setViewType(CalendarViewType.Month),
      showWeekView: () => setViewType(CalendarViewType.Week),
      showDayView: () => setViewType(CalendarViewType.Day),
    },
  }
}
