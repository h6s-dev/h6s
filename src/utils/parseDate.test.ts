import parseDate from './parseDate'

describe('parseDate util function', () => {
  it('return correct year, month, day', () => {
    // Given
    const date = new Date('2020-12-27')
    // When
    const result = parseDate(date)
    // Then
    expect(result.year).toBe(2020)
    expect(result.month).toBe(11)
    expect(result.day).toBe(27)
  })
})
