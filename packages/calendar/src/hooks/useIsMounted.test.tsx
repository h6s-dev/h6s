import { renderHook } from '@testing-library/react-hooks'

import useIsMounted from './useIsMounted'

describe('useIsMounted hooks test', () => {
  it('return true after component mount', () => {
    // Given
    // When
    const { result } = renderHook(() => useIsMounted())
    // Then
    expect(result.current).toBeTruthy()
  })
})
