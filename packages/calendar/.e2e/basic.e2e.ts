import { expect, test } from '@playwright/test'
import {
  addMonths,
  format,
  getDate,
  getWeeksInMonth,
  subMonths,
} from 'date-fns'

const BASIC_EXAMPLES_URL =
  'http://localhost:6006/iframe.html?id=calendar-with-table-element--default&args=&viewMode=story'

const SELECTOR = {
  CURSOR_DATE: 'data-testid=cursor-date',
  WEEKDAYS: 'data-testid=calendar-weekdays',
  WEEKS: 'data-testid=calendar-weeks',
  CELL_TODAY: 'data-testid=calendar-cell--today',
}

const baseDate = new Date()
const baseDay = getDate(baseDate)
const baseCalendarInfo = {
  weeksLength: getWeeksInMonth(baseDate),
}

function dateFormat(date: Date) {
  return format(date, 'yyyy. MM')
}

test.beforeEach(async ({ page }) => {
  await page.goto(BASIC_EXAMPLES_URL)
})

test('render calendar successfully', async ({ page }) => {
  // render today in title
  const pageTitle = page.locator(SELECTOR.CURSOR_DATE)
  await expect(pageTitle).toHaveText(dateFormat(baseDate))

  // render weekdays in calendar
  const weekdaysCount = await page.locator(SELECTOR.WEEKDAYS).count()
  expect(weekdaysCount).toBe(7)

  // render calendar cells
  const weeksCount = await page.locator(SELECTOR.WEEKS).count()
  expect(weeksCount).toBe(baseCalendarInfo.weeksLength)

  // render today
  const today = page.locator(SELECTOR.CELL_TODAY)
  await expect(today).toHaveText(baseDay.toString())
})

test('run navigate successfully', async ({ page }) => {
  // once prev
  await page.click('[aria-label="button for navigating to prev calendar"]')
  const prevTitle = page.locator(SELECTOR.CURSOR_DATE)
  await expect(prevTitle).toHaveText(dateFormat(subMonths(baseDate, 1)))

  // reset
  await page.click('[aria-label="button for navigating to today calendar"]')
  const resetTitle = page.locator(SELECTOR.CURSOR_DATE)
  await expect(resetTitle).toHaveText(dateFormat(baseDate))

  // once next
  await page.click('[aria-label="button for navigating to next calendar"]')
  const nextTitle = page.locator(SELECTOR.CURSOR_DATE)
  await expect(nextTitle).toHaveText(dateFormat(addMonths(baseDate, 1)))

  // reset again
  // reset
  await page.click('[aria-label="button for navigating to today calendar"]')
  const resetTitle2 = page.locator(SELECTOR.CURSOR_DATE)
  await expect(resetTitle2).toHaveText(dateFormat(baseDate))
})

test('run change view type successfully', async ({ page }) => {
  await page.click('[aria-label="button for changing view type to month"]')

  await page.click('[aria-label="button for changing view type to week"]')
  const weeksCountWhenViewWeekType = await page.locator(SELECTOR.WEEKS).count()
  expect(weeksCountWhenViewWeekType).toBe(1)

  await page.click('[aria-label="button for changing view type to day"]')
  const weeksCountWhenViewDayType = await page.locator(SELECTOR.WEEKS).count()
  expect(weeksCountWhenViewDayType).toBe(1)

  const today = page.locator(SELECTOR.CELL_TODAY)
  await expect(today).toHaveText(baseDay.toString())
})
