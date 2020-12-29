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
import { withDatePropsMonth, withKeysMonth } from './plugins'
import { pipeWith, withKey } from './utils'

export interface UseCalendarOptions {
  defaultDate?: Date | number | string
  defaultWeekStart?: WeekDayType
  defaultViewType?: CalendarViewType
}

export default function useCalendar(options: UseCalendarOptions = {}) {
  const {
    defaultDate,
    defaultWeekStart = 0,
    defaultViewType = CalendarViewType.Month,
  } = options
  const baseDate = useMemo(
    () => (defaultDate ? new Date(defaultDate) : new Date()),
    [defaultDate],
  )

  const [weekStartsOn, setWeekStartsOn] = useState(defaultWeekStart)
  const [cursorDate, setCursorDate] = useState(baseDate)
  const [viewType, setViewType] = useState(defaultViewType)

  const calendar = createCalendarInfo(cursorDate, weekStartsOn)
  const { weekendDays, getWeekRow, getMonth } = calendar

  const getHeaders = useCallback(
    (viewType: CalendarViewType) => {
      switch (viewType) {
        case CalendarViewType.Month:
        case CalendarViewType.Week:
          return {
            weekDays: withKey(weekendDays, 'weekdays'),
          }
        case CalendarViewType.Day:
        default:
          return {
            weekDays: withKey([{ value: cursorDate }], 'weekdays'),
          }
      }
    },
    [cursorDate, weekendDays],
  )

  const getBody = useCallback(
    (viewType: CalendarViewType) => {
      const month = {
        [CalendarViewType.Month]: getMonth(),
        [CalendarViewType.Week]: { value: [getWeekRow()] },
        [CalendarViewType.Day]: { value: [{ value: [{ value: cursorDate }] }] },
      }[viewType]

      return pipeWith(
        month,
        withDatePropsMonth(baseDate, cursorDate),
        withKeysMonth(),
      )
    },
    [baseDate, cursorDate, getMonth, getWeekRow],
  )

  const setNext = useMemo(() => {
    switch (viewType) {
      case CalendarViewType.Month:
        return addMonths
      case CalendarViewType.Week:
        return addWeeks
      case CalendarViewType.Day:
        return addDays
    }
  }, [viewType])

  const setPrev = useMemo(() => {
    switch (viewType) {
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
      toNext: () => setCursorDate((date) => setNext(date, 1)),
      toPrev: () => setCursorDate((date) => setPrev(date, 1)),
      setToday: () => setCursorDate(new Date()),
      setDate: (date: Date) => setCursorDate(date),
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
