import createCalendarInfo from './createCalendarInfo'

describe('createCalendarInfo function', () => {
  it('return startWeekdayInMonth 2 / weeksInMonth 5', () => {
    // Given
    const date = new Date(2020, 11, 27) // sunday
    const weekStartsOn = 0 // start Sunday
    // When
    const result = createCalendarInfo(date, weekStartsOn)
    // Then
    expect(result.startWeekdayInMonth).toBe(2)
    expect(result.weeksInMonth).toBe(5)
  })

  it('return startWeekdayInMonth 2 / weeksInMonth 5', () => {
    // Given
    const date = new Date(2020, 11, 27) // sunday
    const weekStartsOn = 3 // start Thursday
    // When
    const result = createCalendarInfo(date, weekStartsOn)
    // Then
    expect(result.startWeekdayInMonth).toBe(6)
    expect(result.weeksInMonth).toBe(5)
  })

  it('getCurrentWeekIndex return current week (number)', () => {
    // Given
    // When
    const info1 = createCalendarInfo(new Date(2020, 11, 27), 0)
    const info2 = createCalendarInfo(new Date(2020, 10, 1), 0)
    const info3 = createCalendarInfo(new Date(2020, 11, 7), 0)
    // Then
    expect(info1.getCurrentWeekIndex()).toBe(4)
    expect(info2.getCurrentWeekIndex()).toBe(0)
    expect(info3.getCurrentWeekIndex()).toBe(1)
  })

  it('getDateCellByIndex return Date value', () => {
    // Given
    const date = new Date(2020, 11, 27)
    const weekStartsOn = 0 // start Sunday
    // When
    const result = createCalendarInfo(date, weekStartsOn).getDateCellByIndex(
      1,
      1,
    )
    // Then
    expect(result.value).toStrictEqual(new Date(2020, 11, 7))
  })

  it('getWeekRow return target week', () => {
    // Given
    const weekIndex = 4

    // When
    const calendar = createCalendarInfo(new Date(2020, 11, 27), 0)
    // Then
    const expected = [
      { value: new Date(2020, 11, 27) },
      { value: new Date(2020, 11, 28) },
      { value: new Date(2020, 11, 29) },
      { value: new Date(2020, 11, 30) },
      { value: new Date(2020, 11, 31) },
      { value: new Date(2021, 0, 1) },
      { value: new Date(2021, 0, 2) },
    ]
    expect(calendar.getWeekRow(weekIndex).value).toStrictEqual(expected)
  })

  it('getMonth return target month', () => {
    // Given
    const weeks = 2

    // When
    const result = createCalendarInfo(new Date(2020, 11, 27), 0).getMonth(weeks)

    // Then
    expect(result.value).toStrictEqual([
      {
        value: [
          { value: new Date(2020, 10, 29) },
          { value: new Date(2020, 10, 30) },
          { value: new Date(2020, 11, 1) },
          { value: new Date(2020, 11, 2) },
          { value: new Date(2020, 11, 3) },
          { value: new Date(2020, 11, 4) },
          { value: new Date(2020, 11, 5) },
        ],
      },
      {
        value: [
          { value: new Date(2020, 11, 6) },
          { value: new Date(2020, 11, 7) },
          { value: new Date(2020, 11, 8) },
          { value: new Date(2020, 11, 9) },
          { value: new Date(2020, 11, 10) },
          { value: new Date(2020, 11, 11) },
          { value: new Date(2020, 11, 12) },
        ],
      },
    ])
  })
})
