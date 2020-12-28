import resetTimeOfDate from './resetTimeOfDate'

describe('resetTimeOfDate function', () => {
  it('return reset date object', () => {
    // Given
    const date = new Date(2020, 11, 27, 12, 30, 13, 30)
    // When
    const result = resetTimeOfDate(date)
    // Then
    expect(result).toEqual(new Date(2020, 11, 27, 0, 0, 0, 0))
  })
})
