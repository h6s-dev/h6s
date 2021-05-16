import { isWeekend as _isWeekend } from 'date-fns'

export default function isWeekend(targetDate: Date) {
  return _isWeekend(targetDate)
}
