import generateID from './generateID'

export default function attachKeyToArray(arr: unknown[], keyPrefix: string) {
  return arr.map(value => {
    return {
      key: generateID(keyPrefix),
      value,
    }
  })
}
