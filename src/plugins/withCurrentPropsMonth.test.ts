import withCurrentPropsMonth from './withCurrentPropsMonth'

describe('withCurrentPropsMonth plugin', () => {
  it('return value with isCurrent Props', () => {
    // Given
    const month = {
      value: [
        {
          value: [
            { value: new Date(2020, 11, 13) },
            { value: new Date(2020, 11, 14) },
            { value: new Date(2020, 11, 15) },
            { value: new Date(2020, 11, 16) },
            { value: new Date(2020, 11, 17) },
            { value: new Date(2020, 11, 18) },
            { value: new Date(2020, 11, 19) },
          ],
        },
        {
          value: [
            { value: new Date(2020, 11, 20) },
            { value: new Date(2020, 11, 21) },
            { value: new Date(2020, 11, 22) },
            { value: new Date(2020, 11, 23) },
            { value: new Date(2020, 11, 24) },
            { value: new Date(2020, 11, 25) },
            { value: new Date(2020, 11, 26) },
          ],
        },
        {
          value: [
            { value: new Date(2020, 11, 27) },
            { value: new Date(2020, 11, 28) },
            { value: new Date(2020, 11, 29) },
            { value: new Date(2020, 11, 30) },
            { value: new Date(2020, 11, 31) },
            { value: new Date(2020, 12, 1) },
            { value: new Date(2020, 12, 2) },
          ],
        },
      ],
    }

    const baseDate = new Date(2020, 11, 13)
    const cursorDate = new Date(2020, 11, 17)
    // When
    const func = withCurrentPropsMonth(baseDate, cursorDate)
    const result = func(month)
    // Then
    const expected = {
      value: [
        {
          value: [
            {
              value: new Date(2020, 11, 13),
              isCurrentDate: true,
              isCurrentMonth: true,
            },
            {
              value: new Date(2020, 11, 14),
              isCurrentDate: false,
              isCurrentMonth: true,
            },
            {
              value: new Date(2020, 11, 15),
              isCurrentDate: false,
              isCurrentMonth: true,
            },
            {
              value: new Date(2020, 11, 16),
              isCurrentDate: false,
              isCurrentMonth: true,
            },
            {
              value: new Date(2020, 11, 17),
              isCurrentDate: false,
              isCurrentMonth: true,
            },
            {
              value: new Date(2020, 11, 18),
              isCurrentDate: false,
              isCurrentMonth: true,
            },
            {
              value: new Date(2020, 11, 19),
              isCurrentDate: false,
              isCurrentMonth: true,
            },
          ],
        },
        {
          value: [
            {
              value: new Date(2020, 11, 20),
              isCurrentDate: false,
              isCurrentMonth: true,
            },
            {
              value: new Date(2020, 11, 21),
              isCurrentDate: false,
              isCurrentMonth: true,
            },
            {
              value: new Date(2020, 11, 22),
              isCurrentDate: false,
              isCurrentMonth: true,
            },
            {
              value: new Date(2020, 11, 23),
              isCurrentDate: false,
              isCurrentMonth: true,
            },
            {
              value: new Date(2020, 11, 24),
              isCurrentDate: false,
              isCurrentMonth: true,
            },
            {
              value: new Date(2020, 11, 25),
              isCurrentDate: false,
              isCurrentMonth: true,
            },
            {
              value: new Date(2020, 11, 26),
              isCurrentDate: false,
              isCurrentMonth: true,
            },
          ],
        },
        {
          value: [
            {
              value: new Date(2020, 11, 27),
              isCurrentDate: false,
              isCurrentMonth: true,
            },
            {
              value: new Date(2020, 11, 28),
              isCurrentDate: false,
              isCurrentMonth: true,
            },
            {
              value: new Date(2020, 11, 29),
              isCurrentDate: false,
              isCurrentMonth: true,
            },
            {
              value: new Date(2020, 11, 30),
              isCurrentDate: false,
              isCurrentMonth: true,
            },
            {
              value: new Date(2020, 11, 31),
              isCurrentDate: false,
              isCurrentMonth: true,
            },
            {
              value: new Date(2020, 12, 1),
              isCurrentDate: false,
              isCurrentMonth: false,
            },
            {
              value: new Date(2020, 12, 2),
              isCurrentDate: false,
              isCurrentMonth: false,
            },
          ],
        },
      ],
    }
    expect(result).toEqual(expected)
  })
})
