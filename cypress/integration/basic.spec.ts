const BASIC_EXAMPLES_URL =
  'https://veccu-react-calendar-examples-basic.netlify.app'

describe('@veccu/reactl-calendar basic examples e2e test', () => {
  beforeEach(() => {
    cy.visit(BASIC_EXAMPLES_URL)
  })

  it('run', () => {
    cy.log(`[E2E] Run on ${Date.now()}`)
  })
})
