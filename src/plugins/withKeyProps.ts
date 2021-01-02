import { DateCell } from '../models'
import { generateID } from '../utils'

export default function withKeyProps(keyPrefix: string) {
  return function <T extends DateCell>(cell: T) {
    return {
      ...cell,
      key: generateID(keyPrefix),
    }
  }
}
