import createCalendarInfo from './createCalendarInfo'

describe('createCalendarInfo function', () => {
  it('return startWeekdayInMonth 2 / weeksInMonth 5', () => {
    // Given
    const date = new Date(2020, 11, 27) // sunday
    const weekStartsOn = 0 // start Sunday
    // When
    const result = createCalendarInfo(date, { weekStartsOn })
    // Then
    expect(result.startWeekdayInMonth).toBe(2)
    expect(result.weeksInMonth).toBe(5)
  })

  it('return startWeekdayInMonth 2 / weeksInMonth 5', () => {
    // Given
    const date = new Date(2020, 11, 27) // sunday
    const weekStartsOn = 3 // start Thursday
    // When
    const result = createCalendarInfo(date, { weekStartsOn })
    // Then
    expect(result.startWeekdayInMonth).toBe(6)
    expect(result.weeksInMonth).toBe(5)
  })

  it('today.weekIndex return current week (number)', () => {
    // Given
    // When
    const info1 = createCalendarInfo(new Date(2020, 11, 27), {
      weekStartsOn: 0,
    })
    const info2 = createCalendarInfo(new Date(2020, 10, 1), { weekStartsOn: 0 })
    const info3 = createCalendarInfo(new Date(2020, 11, 7), { weekStartsOn: 0 })
    // Then
    expect(info1.today.weekIndex).toBe(4)
    expect(info2.today.weekIndex).toBe(0)
    expect(info3.today.weekIndex).toBe(1)
  })

  it('today.dateIndex return current week (number)', () => {
    // Given
    // When
    const info1 = createCalendarInfo(new Date(2020, 11, 27), {
      weekStartsOn: 0,
    })
    const info2 = createCalendarInfo(new Date(2020, 10, 2), { weekStartsOn: 0 })
    const info3 = createCalendarInfo(new Date(2020, 11, 8), { weekStartsOn: 0 })
    // Then
    expect(info1.today.dateIndex).toBe(0)
    expect(info2.today.dateIndex).toBe(1)
    expect(info3.today.dateIndex).toBe(2)
  })

  it('getDateCellByIndex return Date value', () => {
    // Given
    const date = new Date(2020, 11, 27)
    const weekStartsOn = 0 // start Sunday
    // When
    const result = createCalendarInfo(date, {
      weekStartsOn,
    }).getDateCellByIndex(1, 1)
    // Then
    expect(result.value).toStrictEqual(new Date(2020, 11, 7))
  })
})
