import {
  addDays,
  addMonths,
  addWeeks,
  subDays,
  subMonths,
  subWeeks,
} from 'date-fns'
import { useCallback, useMemo, useState } from 'react'

import { createCalendarInfo } from './core'
import { CalendarViewType, WeekDayType } from './models'
import { withKey } from './utils'

export interface UseCalendarOptions {
  defaultDate?: Date | number | string
  defaultWeekStart?: WeekDayType
  defaultViewType?: CalendarViewType
}

export default function useCalendar(options: UseCalendarOptions = {}) {
  const { defaultDate, defaultWeekStart = 0, defaultViewType = CalendarViewType.Month } = options
  const baseDate = useMemo(() => defaultDate ? new Date(defaultDate) : new Date(), [defaultDate])

  const [weekStartsOn, setWeekStartsOn] = useState(defaultWeekStart)
  const [currentDate, setCurrentDate] = useState(baseDate)
  const [viewType, setViewType] = useState(defaultViewType)

  const calendar = createCalendarInfo(currentDate, weekStartsOn)
  const { weekendDays, getWeek, getMonth } = calendar

  const getHeaders = useCallback((viewType: CalendarViewType) => {
    switch (viewType) {
      case 'month':
      case 'week':
        return {
          weekDays: withKey(weekendDays, 'weekdays'),
        }
      case 'day':
      default:
        return {
          weekDays: withKey([currentDate], 'weekdays'),
        }
    }
  }, [currentDate, weekendDays])

  const getBody = useCallback((viewType: CalendarViewType) => {
    const monthTypeWeeks = withKey(getMonth().map(week => withKey(week, 'days')), 'weeks')
    const weekTypeWeeks = withKey([withKey(getWeek(), 'days')], 'weeks')
    const dayTypeWeeks = withKey([withKey([currentDate], 'days')], 'weeks')

    switch (viewType) {
      case 'month':
        return {
          weeks: monthTypeWeeks,
        }
      case 'week':
        return {
          weeks: weekTypeWeeks,
        }
      case 'day':
      default:
        return {
          weeks: dayTypeWeeks,
        }
    }
  }, [currentDate, getMonth, getWeek])

  const setNext = useMemo(() => {
    switch(viewType) {
      case CalendarViewType.Month:
        return addMonths
      case CalendarViewType.Week:
        return addWeeks
      case CalendarViewType.Day:
        return addDays
    }
  }, [viewType])

  const setPrev = useMemo(() => {
    switch(viewType) {
      case CalendarViewType.Month:
        return subMonths
      case CalendarViewType.Week:
        return subWeeks
      case CalendarViewType.Day:
        return subDays
    }
  }, [viewType])

  return {
    calendar: {
      ...calendar,
      viewType,
    },
    headers: getHeaders(viewType),
    body: getBody(viewType),
    navigation: {
      toNext: () => setCurrentDate((date) => setNext(date, 1)),
      toPrev: () => setCurrentDate((date) => setPrev(date, 1)),
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
