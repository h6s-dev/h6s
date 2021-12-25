import { setHours, setMilliseconds, setMinutes, setSeconds } from 'date-fns'

export default function resetTimeOfDate(date: Date) {
  return setHours(setMinutes(setSeconds(setMilliseconds(date, 0), 0), 0), 0)
}
