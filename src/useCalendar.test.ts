import { cleanup, renderHook } from '@testing-library/react-hooks'

import { DecemberFirstWeekData, DecemberMonthMatrix } from './mocks/mockDate'
import CalendarViewtype from './models/CalendarViewType'
import useCalendar from './useCalendar'

beforeEach(() => {
  cleanup()
})

describe('useCalendar hooks test', () => {
  describe('result.body', () => {
    it('return pure month data / no plugins, Month viewType', () => {
      // Given
      const defaultDate = new Date(2020, 11, 27)
      const defaultWeekStart = 0
      const defaultViewType = CalendarViewtype.Month
      const plugins = {
        month: [],
        week: [],
        date: null,
      }

      // When
      const { result } = renderHook(() =>
        useCalendar({
          defaultDate,
          defaultWeekStart,
          defaultViewType,
          plugins,
        }),
      )
      const onlyDates = result.current.body.value.map((week) => {
        return {
          value: week.value.map((day) => {
            return { value: day.value }
          }),
        }
      })

      // Then
      expect({ value: onlyDates }).toEqual(DecemberMonthMatrix)
    })

    it('reutrn pure week data / no plugins, Week viewType', () => {
      // Given
      const defaultDate = new Date(2020, 11, 1)
      const defaultWeekStart = 0
      const defaultViewType = CalendarViewtype.Week
      const plugins = {
        month: [],
        week: [],
        date: null,
      }

      // When
      const { result } = renderHook(() =>
        useCalendar({
          defaultDate,
          defaultWeekStart,
          defaultViewType,
          plugins,
        }),
      )
      const weekRow = result.current.body.value[0]
      const onlyDates = weekRow.value.map(({ value }) => ({ value }))

      // Then
      expect({ value: [{ value: onlyDates }] }).toEqual(DecemberFirstWeekData)
    })

    it('reutrn pure date data / no plugins, Day viewType', () => {
      // Given
      const defaultDate = new Date(2020, 11, 1)
      const defaultWeekStart = 0
      const defaultViewType = CalendarViewtype.Day
      const plugins = {
        month: [],
        week: [],
        date: null,
      }

      // When
      const { result } = renderHook(() =>
        useCalendar({
          defaultDate,
          defaultWeekStart,
          defaultViewType,
          plugins,
        }),
      )

      // Then
      expect(result.current.body.value[0].key).toBe('week-day-type')
      expect(result.current.body.value[0].value[0].value).toEqual(defaultDate)
      expect(result.current.body.value[0].value[0].isCurrentDate).toBeTruthy()
      expect(result.current.body.value[0].value[0].isCurrentMonth).toBeTruthy()
      expect(result.current.body.value[0].value[0].key).toBeDefined()
    })
  })
})
