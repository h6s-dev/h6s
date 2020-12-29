import { MonthMatrix } from '../models'
import withKeysMonth from './withKeysMonth'

describe('withKeysMonth plugin', () => {
  it('return withKey value', () => {
    // Given
    const month: MonthMatrix = {
      value: [
        {
          value: [
            { value: new Date(2020, 11, 27) },
            { value: new Date(2020, 11, 28) },
          ],
        },
      ],
    }

    // When
    const func = withKeysMonth()
    const result = func(month)

    // Then
    const expected = {
      value: [
        {
          key: 'weeks-1',
          value: [
            { key: 'days-1', value: new Date(2020, 11, 27) },
            { key: 'days-2', value: new Date(2020, 11, 28) },
          ],
        },
      ],
    }
    expect(result).toEqual(expected)
  })
})
