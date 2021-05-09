import { format } from 'date-fns'

const BASIC_EXAMPLES_URL =
  'https://veccu-react-calendar-examples-basic.netlify.app'

describe('@veccu/reactl-calendar basic examples e2e test', () => {
  beforeEach(() => {
    cy.visit(BASIC_EXAMPLES_URL)
    cy.log(`[E2E] Run on ${format(new Date(), 'yyyy-MM-dd (E) HH:mm')}`)
  })

  it('run navigate successfully', () => {
    cy.findByLabelText('prev-button').click()
    cy.findByLabelText('next-button').click()
  })
})
