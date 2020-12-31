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
import { CalendarViewType, DateCell, MonthMatrix, WeekDayType } from './models'
import { CalendarPlugin } from './plugins/applyPlugins'
import { arrayOf, isEmpty, pipeWith, withKey } from './utils'

export interface UseCalendarPlugins {
  month?: any
  week?: any
  date?: Array<CalendarPlugin<DateCell>>
}

export interface UseCalendarOptions {
  defaultDate?: Date | number | string
  defaultWeekStart?: WeekDayType
  defaultViewType?: CalendarViewType
  plugins?: UseCalendarPlugins
}

export default function useCalendar({
  defaultDate,
  defaultWeekStart = 0,
  defaultViewType = CalendarViewType.Month,
  plugins: { date: datePlugins } = { month: [], week: [], date: [] },
}: UseCalendarOptions = {}) {
  const baseDate = useMemo(
    () => (defaultDate ? new Date(defaultDate) : new Date()),
    [defaultDate],
  )

  const [weekStartsOn, setWeekStartsOn] = useState(defaultWeekStart)
  const [cursorDate, setCursorDate] = useState(baseDate)
  const [viewType, setViewType] = useState(defaultViewType)

  const calendar = createCalendarInfo(cursorDate, weekStartsOn)
  const {
    weekendDays,
    weeksInMonth,
    getCurrentWeekIndex,
    getCurrentDateIndex,
    getDateCellByIndex,
  } = calendar

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
      value: arrayOf(weeksInMonth).map((weekIndex) => ({
        value: arrayOf(7).map((dayIndex) => {
          const cell = getDateCellByIndex(weekIndex, dayIndex)

          return cell
        }),
      })),
    }),
    [getDateCellByIndex],
  )

  const getMatrixItem = (
    matrix: MonthMatrix,
    { weekIndex, dateIndex }: { weekIndex?: number; dateIndex?: number } = {},
  ) => {
    if (weekIndex == null) {
      return matrix
    }
    if (dateIndex == null) {
      return { value: [matrix.value[weekIndex]] }
    }

    return {
      value: [{ value: [matrix.value[weekIndex].value[dateIndex]] }],
    }
  }

  const getBody = useCallback(
    (viewType: CalendarViewType) => {
      const matrix = createMatrix(weeksInMonth)
      const currentWeekIndex = getCurrentWeekIndex()
      const currentDateIndex = getCurrentDateIndex()

      return {
        [CalendarViewType.Month]: getMatrixItem(matrix),
        [CalendarViewType.Week]: getMatrixItem(matrix, {
          weekIndex: currentWeekIndex,
        }),
        [CalendarViewType.Day]: getMatrixItem(matrix, {
          weekIndex: currentWeekIndex,
          dateIndex: currentDateIndex,
        }),
      }[viewType]
    },
    [createMatrix, getCurrentDateIndex, getCurrentWeekIndex, weeksInMonth],
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
