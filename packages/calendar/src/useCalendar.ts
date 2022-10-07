import {
  addDays,
  addMonths,
  addWeeks,
  startOfMonth,
  startOfWeek,
  subDays,
  subMonths,
  subWeeks,
} from 'date-fns'
import { useCallback, useMemo, useState } from 'react'

import { createCalendarInfo } from './core'
import useIsMounted from './hooks/useIsMounted'
import { CalendarViewType, WeekDayType } from './models'
import { withDateProps } from './plugins'
import withKeyProps from './plugins/withKeyProps'
import { arrayOf, generateID, pipeWith, withKey } from './utils'

export interface UseCalendarOptions {
  defaultDate?: Date | number | string
  defaultWeekStart?: WeekDayType
  defaultViewType?: CalendarViewType
  minimumWeeksInMonth?: number;
}

export function useCalendar({
  defaultDate,
  defaultWeekStart = 0,
  defaultViewType = CalendarViewType.Month,
  minimumWeeksInMonth = 0,
}: UseCalendarOptions = {}) {
  const isMounted = useIsMounted()
  const baseDate = useMemo(() => {
    return defaultDate != null ? new Date(defaultDate) : new Date()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultDate, isMounted])

  const [weekStartsOn, setWeekStartsOn] = useState(defaultWeekStart)
  const [cursorDate, setCursorDate] = useState(baseDate)
  const [viewType, setViewType] = useState(defaultViewType)

  const calendar = createCalendarInfo(cursorDate, { weekStartsOn })
  const { weekendDays, weeksInMonth, today, getDateCellByIndex } = calendar

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

  const createMatrix = useCallback(
    (weeksInMonth: number) => ({
      value: arrayOf(weeksInMonth).map((weekIndex) => {
        return {
          key: generateID('weeks'),
          value: arrayOf(7).map((dayIndex) => {
            return pipeWith(
              getDateCellByIndex(weekIndex, dayIndex),
              withDateProps(baseDate, cursorDate),
              withKeyProps('days'),
            )
          }),
        }
      }),
    }),
    [baseDate, cursorDate, getDateCellByIndex],
  )

  const getBody = useCallback(
    (viewType: CalendarViewType) => {
      const matrix = createMatrix(Math.max(minimumWeeksInMonth, weeksInMonth))
      const { weekIndex, dateIndex } = today

      return {
        [CalendarViewType.Month]: matrix,
        [CalendarViewType.Week]: {
          value: [matrix.value[weekIndex]],
        },
        [CalendarViewType.Day]: {
          value: [
            {
              key: 'week-day-type',
              value: [matrix.value[weekIndex]?.value[dateIndex]],
            },
          ],
        },
      }[viewType]
    },
    [createMatrix, minimumWeeksInMonth, today, weeksInMonth],
  )

  const setNext = useMemo(() => {
    switch (viewType) {
      case CalendarViewType.Month:
        return (date: Date) => addMonths(startOfMonth(date), 1)
      case CalendarViewType.Week:
        return (date: Date) => addWeeks(startOfWeek(date, { weekStartsOn }), 1)
      case CalendarViewType.Day:
        return (date: Date) => addDays(date, 1)
    }
  }, [viewType, weekStartsOn])

  const setPrev = useMemo(() => {
    switch (viewType) {
      case CalendarViewType.Month:
        return (date: Date) => subMonths(startOfMonth(date), 1)
      case CalendarViewType.Week:
        return (date: Date) => subWeeks(startOfWeek(date, { weekStartsOn }), 1)
      case CalendarViewType.Day:
        return (date: Date) => subDays(date, 1)
    }
  }, [viewType, weekStartsOn])

  return useMemo(
    () => ({
      ...calendar,
      headers: getHeaders(viewType),
      body: getBody(viewType),
      navigation: {
        toNext: () => setCursorDate((date) => setNext(date)),
        toPrev: () => setCursorDate((date) => setPrev(date)),
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
    }),
    [calendar, getBody, getHeaders, setNext, setPrev, viewType],
  )
}
