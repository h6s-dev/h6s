import generateID from './generateID'

export default function withKey<T>(arr: T[], keyPrefix: string) {
  return arr.map(value => {
    return {
      key: generateID(keyPrefix),
      value,
    }
  })
}
