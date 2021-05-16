import isWeekend from './isWeekend'

describe('isWeekend function', () => {
  it('return true', () => {
    // Given
    const targetDate1 = new Date(2021, 4, 15)
    const targetDate2 = new Date(2021, 4, 16)
    // When
    const result1 = isWeekend(targetDate1)
    const result2 = isWeekend(targetDate2)
    // Then
    expect(result1).toBeTruthy()
    expect(result2).toBeTruthy()
  })

  it('return false', () => {
    // Given
    const targetDate1 = new Date(2021, 4, 17)
    const targetDate2 = new Date(2020, 4, 18)
    const targetDate3 = new Date(2021, 4, 19)
    // When
    const result1 = isWeekend(targetDate1)
    const result2 = isWeekend(targetDate2)
    const result3 = isWeekend(targetDate3)

    // Then
    expect(result1).toBeFalsy()
    expect(result2).toBeFalsy()
    expect(result3).toBeFalsy()
  })
})
