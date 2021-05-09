import {
  format,
  getDate,
  getDaysInMonth,
  getMonth,
  getWeeksInMonth,
  getYear,
} from 'date-fns'

const BASIC_EXAMPLES_URL =
  'https://veccu-react-calendar-examples-basic.netlify.app'

const baseDate = new Date()
const baseYear = getYear(baseDate)
const baseMonth = getMonth(baseDate) + 1
const baseDay = getDate(baseDate)
const baseDays = getDaysInMonth(baseDate)
const baseCalendarInfo = {
  weeksLength: getWeeksInMonth(baseDate),
}

describe('@veccu/reactl-calendar - basic examples e2e test with default options', () => {
  beforeEach(() => {
    cy.visit(BASIC_EXAMPLES_URL)
    cy.log(`[E2E] Run on ${format(baseDate, 'yyyy-MM-dd (E) HH:mm')}`)
  })

  it('render calendar successfully', () => {
    // render today in title
    cy.findByTestId('cursor-date')
      .should('include.text', baseYear)
      .should('include.text', baseMonth)
    // render weekends in calendar
    cy.findAllByTestId('calendar-weekends').should('have.length', 7)
    // render weeks in calendar
    cy.findAllByTestId('calendar-weeks').should(
      'have.length',
      baseCalendarInfo.weeksLength,
    )
    // render calendar cells
    cy.findAllByTestId('calendar-cell').should(
      'have.length.at.least',
      baseDays - 1, // sub today
    )
    // render today
    cy.findByTestId('calendar-cell--today').should('include.text', baseDay)
  })

  it('run navigate successfully', () => {
    cy.findByLabelText('button for navigating to prev calendar').click()
    cy.findByTestId('cursor-date')
      .should('include.text', baseMonth === 1 ? baseYear - 1 : baseYear)
      .should('include.text', baseMonth - 1)

    cy.findByLabelText('button for navigating to prev calendar').click()
    cy.findByTestId('cursor-date')
      .should('include.text', baseMonth === 1 ? baseYear - 1 : baseYear)
      .should('include.text', baseMonth - 2)

    cy.findByLabelText('button for navigating to today calendar').click()
    cy.findByTestId('cursor-date')
      .should('include.text', baseYear)
      .should('include.text', baseMonth)

    cy.findByLabelText('button for navigating to next calendar').click()
    cy.findByTestId('cursor-date')
      .should('include.text', baseMonth === 12 ? baseYear + 1 : baseYear)
      .should('include.text', baseMonth + 1)

    cy.findByLabelText('button for navigating to next calendar').click()
    cy.findByTestId('cursor-date')
      .should('include.text', baseMonth === 12 ? baseYear + 1 : baseYear)
      .should('include.text', baseMonth + 2)

    cy.findByLabelText('button for navigating to today calendar').click()
    cy.findByTestId('cursor-date')
      .should('include.text', baseYear)
      .should('include.text', baseMonth)
  })

  it('run change view type successfully', () => {
    cy.findByLabelText('button for changing view type to month').click()

    cy.findByLabelText('button for changing view type to week').click()
    cy.findAllByTestId('calendar-weeks').should('have.length', 1)

    cy.findByLabelText('button for changing view type to day').click()
    cy.findAllByTestId('calendar-weeks').should('have.length', 1)
    cy.findByTestId('calendar-cell--today').should('include.text', baseDay)
  })
})
