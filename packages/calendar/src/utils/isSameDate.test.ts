import { describe, expect, it } from 'vitest'

import isSameDate from './isSameDate'

describe('isSameDate function', () => {
  it('return true when same month and same date', () => {
    // Given
    const baseDate = new Date(2020, 11, 27)
    const targetDate = baseDate
    // When
    const result = isSameDate(baseDate, targetDate)
    // Then
    expect(result).toBeTruthy()
  })

  it('return false when same month and different date', () => {
    // Given
    const baseDate = new Date(2020, 11, 27)
    const targetDate = new Date(2020, 11, 26)
    // When
    const result = isSameDate(baseDate, targetDate)
    // Then
    expect(result).toBeFalsy()
  })

  it('return false when different month and different date', () => {
    // Given
    const baseDate = new Date(2020, 11, 27)
    const targetDate = new Date(2020, 10, 26)
    // When
    const result = isSameDate(baseDate, targetDate)
    // Then
    expect(result).toBeFalsy()
  })
})
