import { isEqual } from 'date-fns'

import resetTimeOfDate from './resetTimeOfDate'

export default function isSameDate(baseDate: Date, targetDate: Date) {
  const base = resetTimeOfDate(baseDate)
  const target = resetTimeOfDate(targetDate)

  return isEqual(base, target)
}
