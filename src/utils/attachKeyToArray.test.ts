import attachKeyToArray from './attachKeyToArray'
import generateID from './generateID'

jest.mock('./generateID')

const mockGenerateId = generateID as jest.MockedFunction<typeof generateID>

mockGenerateId.mockImplementation(() => {
  return 'test-key'
})

describe('attachKeyToArray function', () => {
  it('return array with key property', () => {
    // Given
    const arr = [1,2]
    // When
    const result = attachKeyToArray(arr, 'test')
    // Then
    expect(result).toEqual([
      { key: 'test-key', value: 1 },
      { key: 'test-key', value: 2 },
    ])
  })
})
