import { DateCell } from '../models'
import { generateID } from '../utils'

export default function withKeyProps<T extends DateCell>(keyPrefix: string) {
  return function (data: T) {
    return {
      ...data,
      key: generateID(keyPrefix),
    }
  }
}
