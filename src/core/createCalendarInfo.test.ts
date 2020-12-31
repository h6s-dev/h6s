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

  it('getCurrentDateIndex return current week (number)', () => {
    // Given
    // When
    const info1 = createCalendarInfo(new Date(2020, 11, 27), 0)
    const info2 = createCalendarInfo(new Date(2020, 10, 2), 0)
    const info3 = createCalendarInfo(new Date(2020, 11, 8), 0)
    // Then
    expect(info1.getCurrentDateIndex()).toBe(0)
    expect(info2.getCurrentDateIndex()).toBe(1)
    expect(info3.getCurrentDateIndex()).toBe(2)
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
})
