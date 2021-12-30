import { format } from 'date-fns'

import { useCalendar } from '../useCalendar'

export function Calendar() {
  const { cursorDate, headers, body, navigation, view } = useCalendar()

  return (
    <table>
      <caption>
        <nav>
          <div>
            <button onClick={view.showMonthView}>M</button>
            <button onClick={view.showWeekView}>W</button>
            <button onClick={view.showDayView}>D</button>
          </div>
          <p>{format(cursorDate, 'yyyy. MM')}</p>
          <div>
            <button onClick={navigation.toPrev}>{'>'}</button>
            <button onClick={navigation.setToday}>TODAY</button>
            <button onClick={navigation.toNext}>{'>'}</button>
          </div>
        </nav>
      </caption>
      <thead>
        <tr>
          {headers.weekDays.map(({ key, value }) => {
            return <th key={key}>{format(value, 'E')}</th>
          })}
        </tr>
      </thead>
      <tbody>
        {body.value.map((week) => {
          const { key, value: days } = week

          return (
            <tr key={key}>
              {days.map((day) => {
                const { key, date, isCurrentDate, isCurrentMonth } = day

                return (
                  <td style={{ opacity: isCurrentMonth ? 1 : 0.2 }} key={key}>
                    {isCurrentDate ? (
                      <p style={{ color: 'blue' }}>{date}</p>
                    ) : (
                      date
                    )}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
