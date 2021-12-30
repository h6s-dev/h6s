import generateID from './generateID'
import withKey from './withKey'

jest.mock('./generateID')

const mockGenerateId = generateID as jest.MockedFunction<typeof generateID>

mockGenerateId.mockImplementation(() => {
  return 'test-key'
})

describe('withKey function', () => {
  it('return array with key property', () => {
    // Given
    const arr = [{ value: 1 }, { value: 2 }]
    // When
    const result = withKey(arr, 'test')
    // Then
    expect(result).toEqual([
      { key: 'test-key', value: 1 },
      { key: 'test-key', value: 2 },
    ])
  })
})
