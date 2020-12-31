import { renderHook } from '@testing-library/react-hooks'

import { DecemberFirstWeekData, DecemberMonthMatrix } from './mocks/mockDate'
import { DateCell } from './models'
import CalendarViewtype from './models/CalendarViewType'
import useCalendar from './useCalendar'

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
        date: [],
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
      expect(result.current.body).toEqual(DecemberMonthMatrix)
    })

    it('reutrn pure week data / no plugins, Week viewType', () => {
      // Given
      const defaultDate = new Date(2020, 11, 1)
      const defaultWeekStart = 0
      const defaultViewType = CalendarViewtype.Week
      const plugins = {
        month: [],
        week: [],
        date: [],
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
      expect(result.current.body).toEqual(DecemberFirstWeekData)
    })

    it('reutrn pure date data / no plugins, Day viewType', () => {
      // Given
      const defaultDate = new Date(2020, 11, 1)
      const defaultWeekStart = 0
      const defaultViewType = CalendarViewtype.Day
      const plugins = {
        month: [],
        week: [],
        date: [],
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
      expect(result.current.body).toEqual({
        value: [{ value: [{ value: defaultDate }] }],
      })
    })

    // it('reutrn date data / with key plugins, Day viewType', () => {
    //   // Given
    //   const withKeyPlugin = (v: DateCell) => {
    //     const key = 'test'

    //     return {
    //       key,
    //       ...v,
    //     }
    //   }
    //   const defaultDate = new Date(2020, 11, 1)
    //   const defaultWeekStart = 0
    //   const defaultViewType = CalendarViewtype.Day
    //   const plugins = {
    //     month: [],
    //     week: [],
    //     date: [withKeyPlugin],
    //   }

    //   // When
    //   const { result } = renderHook(() =>
    //     useCalendar({
    //       defaultDate,
    //       defaultWeekStart,
    //       defaultViewType,
    //       plugins,
    //     }),
    //   )

    //   // Then
    //   expect(result.current.body).toEqual({
    //     value: [{ value: [{ key: 'test', value: defaultDate }] }],
    //   })
    // })
  })
})
