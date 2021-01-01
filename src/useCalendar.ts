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
import { CalendarViewType, DateCell, WeekDayType } from './models'
import { withDateProps } from './plugins'
import withKeyProps from './plugins/withKeyProps'
import { arrayOf, generateID, pipeWith, withKey } from './utils'

export type CalendarPlugin<OriginType> = <PropsType>(
  data: OriginType,
) => OriginType & PropsType
export interface UseCalendarOptions {
  defaultDate?: Date | number | string
  defaultWeekStart?: WeekDayType
  defaultViewType?: CalendarViewType
  plugins?: Array<CalendarPlugin<DateCell>>
}

export default function useCalendar({
  defaultDate,
  defaultWeekStart = 0,
  defaultViewType = CalendarViewType.Month,
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
      const matrix = createMatrix(weeksInMonth)
      const currentWeekIndex = getCurrentWeekIndex()
      const currentDateIndex = getCurrentDateIndex()

      return {
        [CalendarViewType.Month]: matrix,
        [CalendarViewType.Week]: {
          value: [matrix.value[currentWeekIndex]],
        },
        [CalendarViewType.Day]: {
          value: [
            {
              key: 'week-day-type',
              value: [matrix.value[currentWeekIndex].value[currentDateIndex]],
            },
          ],
        },
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
