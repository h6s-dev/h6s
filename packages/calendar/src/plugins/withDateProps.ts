import { isWeekend as _isWeekend, getDate } from "date-fns";

import type { DateCell } from "../models";
import { isSameDate, isSameYearAndMonth } from "../utils";

export default function withDateProps(baseDate: Date, cursorDate: Date) {
  return <T extends DateCell>(cell: T) => {
    const { value: targetDate } = cell;
    const isCurrentMonth = isSameYearAndMonth(cursorDate, targetDate);
    const isCurrentDate = isSameDate(baseDate, targetDate);
    const isWeekend = _isWeekend(targetDate);

    return {
      ...cell,
      date: getDate(targetDate),
      isCurrentMonth,
      isCurrentDate,
      isWeekend,
    };
  };
}
