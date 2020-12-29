import { MonthMatrix } from '../models'
import { withKey } from '../utils'

export default function withKeysMonth() {
  return function (month: MonthMatrix) {
    return {
      ...month,
      value: withKey(
        month.value.map((week) => {
          return {
            ...week,
            value: withKey(week.value, 'days'),
          }
        }),
        'weeks',
      ),
    }
  }
}
