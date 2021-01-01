import withKeyProps from './withKeyProps'

describe('withKeyProps plugin', () => {
  it('return withKey value', () => {
    // Given
    const dateCell = { value: new Date(2020, 11, 27) }

    // When
    const result = withKeyProps('days')(dateCell)

    // Then
    expect(result).toEqual({ key: 'days-1', value: new Date(2020, 11, 27) })
  })
})
