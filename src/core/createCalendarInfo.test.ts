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
    expect(info1.getCurrentWeek()).toBe(5)
    expect(info2.getCurrentWeek()).toBe(1)
    expect(info3.getCurrentWeek()).toBe(2)
  })

  it('isCurrentMonth return true, isCurrentDate return false', () => {
    // Given
    const date = new Date(2020, 11, 27)
    const weekStartsOn = 0 // start Sunday
    const targetDate1 = new Date(2020, 11, 22)
    const targetDate2 = new Date(2020, 11, 27)
    // When
    const info = createCalendarInfo(date, weekStartsOn)
    // Then
    expect(info.isCurrentMonth(targetDate1)).toBeTruthy()
    expect(info.isCurrentDate(targetDate1)).toBeFalsy()
    expect(info.isCurrentMonth(targetDate2)).toBeTruthy()
    expect(info.isCurrentDate(targetDate2)).toBeTruthy()
  })
})
