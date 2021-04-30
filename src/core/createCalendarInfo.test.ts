import createCalendarInfo from './createCalendarInfo'

describe('createCalendarInfo function', () => {
  it('bypass cursorDate', () => {
    // Given
    const cursorDate1 = new Date('2021-03-31')
    const cursorDate2 = new Date(2021, 3, 31)

    // When
    const result1 = createCalendarInfo(cursorDate1, { weekStartsOn: 0 })
    const result2 = createCalendarInfo(cursorDate2, { weekStartsOn: 0 })
    // Then
    expect(result1.cursorDate).toEqual(cursorDate1)
    expect(result2.cursorDate).toEqual(cursorDate2)
  })

  it('return year, month, day', () => {
    // Given
    const cursorDate = new Date('2021-03-31')
    // When
    const result = createCalendarInfo(cursorDate, { weekStartsOn: 0 })
    // Then
    expect(result.year).toEqual(2021)
    expect(result.month).toEqual(2)
    expect(result.day).toEqual(31)
  })

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
    expect(result.value).toStrictEqual(new Date('2020-12-7'))
  })

  it('2021.3.31 test case', () => {
    // Given
    const date = new Date('2021-3-31') // NOTE: wednesday
    // When
    const result = createCalendarInfo(date, { weekStartsOn: 0 })
    // Then
    expect(result.startWeekdayInMonth).toBe(1)
    expect(result.weeksInMonth).toBe(5)
    expect(result.today.weekIndex).toBe(4)
    expect(result.today.dateIndex).toBe(3)

    expect(result.getDateCellByIndex(0, 0).value).toEqual(new Date(2021, 1, 28))
    expect(result.getDateCellByIndex(0, 1).value).toEqual(new Date(2021, 2, 1))
    expect(result.getDateCellByIndex(1, 0).value).toEqual(new Date(2021, 2, 7))
    expect(result.getDateCellByIndex(1, 1).value).toEqual(new Date(2021, 2, 8))
  })
})
