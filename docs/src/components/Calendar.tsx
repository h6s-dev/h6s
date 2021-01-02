import useCalendar from '@veccu/react-calendar'
import cx from 'classnames'
import { format, getDate } from 'date-fns'
import React from 'react'

export default function Calendar() {
  const { calendar, headers, body, view, navigation } = useCalendar()

  return (
    <>
      <table className="table-fixed border-collapse border border-gray-100 w-full rounded-sm">
        <caption>
          <div className="flex flex-row justify-between items-center pb-4">
            <div className="flex flex-row space space-x-2">
              <button
                onClick={() => view.showMonthView()}
                className={cx('btn bg-blue-50', {
                  'bg-blue-200': view.isMonthView,
                })}
              >
                M
              </button>
              <button
                onClick={() => view.showWeekView()}
                className={cx('btn bg-blue-50', {
                  'bg-blue-200': view.isWeekView,
                })}
              >
                W
              </button>
              <button
                onClick={() => view.showDayView()}
                className={cx('btn bg-blue-50', {
                  'bg-blue-200': view.isDayView,
                })}
              >
                D
              </button>
            </div>
            <div className="text-2xl font-black">
              {format(calendar.cursorDate, 'yyyy.MM')}
            </div>
            <div className="flex flex-row space space-x-2">
              <button
                onClick={() => navigation.toPrev()}
                className={cx('btn bg-blue-50')}
              >
                {'<'}
              </button>
              <button
                onClick={() => navigation.setToday()}
                className={cx('btn bg-blue-500 text-white')}
              >
                TODAY
              </button>
              <button
                onClick={() => navigation.toNext()}
                className={cx('btn bg-blue-50')}
              >
                {'>'}
              </button>
            </div>
          </div>
        </caption>
        <thead className="border-b-1">
          <tr>
            {headers.weekDays.map(({ key, value }) => {
              return (
                <th className="border border-gray-100 p-3" key={key}>
                  {format(value, 'E')}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {body.value.map((week) => {
            const { key, value: days } = week

            return (
              <tr key={key}>
                {days.map((day) => {
                  const { key, value, isCurrentDate, isCurrentMonth } = day

                  return (
                    <td
                      key={key}
                      className={cx(
                        'border border-gray-100 p-6 text-center text-xl',
                        {
                          'bg-blue-200 animate-pulse': isCurrentDate,
                          'opacity-20': !isCurrentMonth,
                        },
                      )}
                    >
                      {getDate(value)}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>

      <button
        onClick={() => {
          window.location.href = '/getting-started/overview'
        }}
        className="block mt-20 mx-auto p-4 rounded bg-gradient-to-r from-indigo-400 via-purple-500 to-blue-500 text-white"
      >
        Go to <span className="italic font-bold">Getting Started</span>
      </button>
    </>
  )
}
