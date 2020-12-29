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

  it('getTargetDate return Date value', () => {
    // Given
    const date = new Date(2020, 11, 27)
    const weekStartsOn = 0 // start Sunday
    // When
    const result = createCalendarInfo(date, weekStartsOn).getTargetDate(1, 1)
    // Then
    expect(result.getMonth()).toBe(11)
    expect(result.getDate()).toBe(7)
  })

  it('getCurrentWeek return current week (number)', () => {
    // Given
    // When
    const info1 = createCalendarInfo(new Date(2020, 11, 27), 0)
    const info2 = createCalendarInfo(new Date(2020, 10, 1), 0)
    const info3 = createCalendarInfo(new Date(2020, 11, 7), 0)
    // Then
    expect(info1.getCurrentWeek()).toBe(4)
    expect(info2.getCurrentWeek()).toBe(0)
    expect(info3.getCurrentWeek()).toBe(1)
  })

  it('getWeek return target week', () => {
    // Given
    const weekIndex = 4
    
    // When
    const calendar = createCalendarInfo(new Date(2020, 11, 27), 0)
    // Then
    const expected = [
      new Date(2020, 11, 27),
      new Date(2020, 11, 28),
      new Date(2020, 11, 29),
      new Date(2020, 11, 30),
      new Date(2020, 11, 31),
      new Date(2021, 0, 1),
      new Date(2021, 0, 2),
    ]
    expect(calendar.getWeek(weekIndex)).toEqual(expected)
  })
})
