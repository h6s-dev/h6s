import { RendererModel } from '../..'
import { buildFooters } from './buildFooters'

interface Model {
  coding: number;
  communication: number;
  design: number;
  impact: number;
  lead: number;
}

describe('buildFooters', () => {
  test('All Column has footer', () => {
    const model: RendererModel<Model> = [
      {
        accessor: 'coding',
        label: 'Coding',
        footer: () => 'coding',
      },
      {
        accessor: 'communication',
        label: 'Communication',
        footer: () => 'communication',
      },
      {
        accessor: 'design',
        label: 'Design',
        footer: () => 'design',
      },
      {
        accessor: 'impact',
        label: 'Impact',
        footer: () => 'impact',
      },
      {
        accessor: 'lead',
        label: 'Lead',
        footer: () => 'lead',
      },
    ]
    const { footers } = buildFooters(model)

    expect(footers!.length).toBe(5)
    footers!.forEach(footer => {
      expect(footer.colSpan).toBe(1)
    })

    const [CODING, COMMUNICATION, DESIGN, IMPACT, LEAD] = footers!

    expect(CODING.value).toBe('Coding')
    expect(COMMUNICATION.value).toBe('Communication')
    expect(DESIGN.value).toBe('Design')
    expect(IMPACT.value).toBe('Impact')
    expect(LEAD.value).toBe('Lead')
  })

  test('First column have no footer, so we need to fill one head', () => {
    const model: RendererModel<Model> = [
      {
        accessor: 'coding',
        label: 'Coding',
      },
      {
        accessor: 'communication',
        label: 'Communication',
        footer: () => 'communication',
      },
      {
        accessor: 'design',
        label: 'Design',
        footer: () => 'design',
      },
      {
        accessor: 'impact',
        label: 'Impact',
        footer: () => 'impact',
      },
      {
        accessor: 'lead',
        label: 'Lead',
        footer: () => 'lead',
      },
    ]
    const { footers } = buildFooters(model)

    expect(footers!.length).toBe(5)

    const [first, ...rest] = footers!

    expect(first.colSpan).toBe(1)
    rest!.forEach(footer => {
      expect(footer.colSpan).toBe(1)
    })

    const [COMMUNICATION, DESIGN, IMPACT, LEAD] = rest

    expect(first.value).toBeNull()
    expect(COMMUNICATION.value).toBe('Communication')
    expect(DESIGN.value).toBe('Design')
    expect(IMPACT.value).toBe('Impact')
    expect(LEAD.value).toBe('Lead')
  })

  test('First and Second column have no footer, so we need to fill two head', () => {
    const model: RendererModel<Model> = [
      {
        accessor: 'coding',
        label: 'Coding',
      },
      {
        accessor: 'communication',
        label: 'Communication',
      },
      {
        accessor: 'design',
        label: 'Design',
        footer: () => 'design',
      },
      {
        accessor: 'impact',
        label: 'Impact',
        footer: () => 'impact',
      },
      {
        accessor: 'lead',
        label: 'Lead',
        footer: () => 'lead',
      },
    ]
    const { footers } = buildFooters(model)

    expect(footers!.length).toBe(4)

    const [first, ...rest] = footers!

    expect(first.colSpan).toBe(2)

    rest.forEach(footer => {
      expect(footer.colSpan).toBe(1)
    })

    const [DESIGN, IMPACT, LEAD] = rest

    expect(first.value).toBeNull()
    expect(DESIGN.value).toBe('Design')
    expect(IMPACT.value).toBe('Impact')
    expect(LEAD.value).toBe('Lead')
  })

  test('Last column have no footer, so we need to fill one tail', () => {
    const model: RendererModel<Model> = [
      {
        accessor: 'coding',
        label: 'Coding',
        footer: () => 'coding',
      },
      {
        accessor: 'communication',
        label: 'Communication',
        footer: () => 'communication',
      },
      {
        accessor: 'design',
        label: 'Design',
        footer: () => 'design',
      },
      {
        accessor: 'impact',
        label: 'Impact',
        footer: () => 'impact',
      },
      {
        accessor: 'lead',
        label: 'Lead',
      },
    ]
    const { footers } = buildFooters(model)

    expect(footers!.length).toBe(5)

    const [CODING, COMMUNICATION, DESIGN, IMPACT, last] = footers!

    ;[CODING, COMMUNICATION, DESIGN, IMPACT].forEach(target => {
      expect(target.colSpan).toBe(1)
    })
    expect(last.colSpan).toBe(1)

    expect(CODING.value).toBe('Coding')
    expect(COMMUNICATION.value).toBe('Communication')
    expect(DESIGN.value).toBe('Design')
    expect(IMPACT.value).toBe('Impact')
    expect(last.value).toBeNull()
  })

  test('Last two column have no footer, so we need to fill two tail', () => {
    const model: RendererModel<Model> = [
      {
        accessor: 'coding',
        label: 'Coding',
        footer: () => 'coding',
      },
      {
        accessor: 'communication',
        label: 'Communication',
        footer: () => 'communication',
      },
      {
        accessor: 'design',
        label: 'Design',
        footer: () => 'design',
      },
      {
        accessor: 'impact',
        label: 'Impact',
      },
      {
        accessor: 'lead',
        label: 'Lead',
      },
    ]
    const { footers } = buildFooters(model)

    expect(footers!.length).toBe(4)

    const [CODING, COMMUNICATION, DESIGN, last] = footers!

    ;[CODING, COMMUNICATION, DESIGN].forEach(target => {
      expect(target.colSpan).toBe(1)
    })
    expect(last.colSpan).toBe(2)

    expect(CODING.value).toBe('Coding')
    expect(COMMUNICATION.value).toBe('Communication')
    expect(DESIGN.value).toBe('Design')
    expect(last.value).toBeNull()
  })

  test('First and Last column have no footer, so we need to fill one head, one tail', () => {
    const model: RendererModel<Model> = [
      {
        accessor: 'coding',
        label: 'Coding',
      },
      {
        accessor: 'communication',
        label: 'Communication',
        footer: () => 'communication',
      },
      {
        accessor: 'design',
        label: 'Design',
        footer: () => 'design',
      },
      {
        accessor: 'impact',
        label: 'Impact',
        footer: () => 'impact',
      },
      {
        accessor: 'lead',
        label: 'Lead',
      },
    ]
    const { footers } = buildFooters(model)

    expect(footers!.length).toBe(5)

    const [first, COMMUNICATION, DESIGN, IMPACT, last] = footers!

    ;[COMMUNICATION, DESIGN, IMPACT].forEach(target => {
      expect(target.colSpan).toBe(1)
    })
    expect(first.colSpan).toBe(1)
    expect(last.colSpan).toBe(1)

    expect(first.value).toBeNull()
    expect(COMMUNICATION.value).toBe('Communication')
    expect(DESIGN.value).toBe('Design')
    expect(IMPACT.value).toBe('Impact')
    expect(last.value).toBeNull()
  })

  test('The Middle Column have no footer, so check previous column config - extends', () => {
    const model: RendererModel<Model> = [
      {
        accessor: 'coding',
        label: 'Coding',
        footer: () => 'coding',
      },
      {
        accessor: 'communication',
        label: 'Communication',
        footer: () => 'communication',
        rules: {
          extendsFooter: true,
        },
      },
      {
        accessor: 'design',
        label: 'Design',
      },
      {
        accessor: 'impact',
        label: 'Impact',
        footer: () => 'impact',
      },
      {
        accessor: 'lead',
        label: 'Lead',
        footer: () => 'lead',
      },
    ]
    const { footers } = buildFooters(model)

    expect(footers!.length).toBe(4)

    const [CODING, COMMUNICATION, IMPACT, LEAD] = footers!

    ;[CODING, IMPACT, LEAD].forEach(target => {
      expect(target.colSpan).toBe(1)
    })
    expect(COMMUNICATION.colSpan).toBe(2)

    expect(CODING.value).toBe('Coding')
    expect(COMMUNICATION.value).toBe('Communication')
    expect(IMPACT.value).toBe('Impact')
    expect(LEAD.value).toBe('Lead')
  })

  test('The Middle Column have no footer, so check previous column config - extends', () => {
    const model: RendererModel<Model> = [
      {
        accessor: 'coding',
        label: 'Coding',
        footer: () => 'coding',
      },
      {
        accessor: 'communication',
        label: 'Communication',
        footer: () => 'communication',
        rules: {
          extendsFooter: false,
        },
      },
      {
        accessor: 'design',
        label: 'Design',
      },
      {
        accessor: 'impact',
        label: 'Impact',
        footer: () => 'impact',
      },
      {
        accessor: 'lead',
        label: 'Lead',
        footer: () => 'lead',
      },
    ]
    const { footers } = buildFooters(model)

    expect(footers!.length).toBe(5)

    const [CODING, COMMUNICATION, empty, IMPACT, LEAD] = footers!

    ;[CODING, COMMUNICATION, IMPACT, LEAD].forEach(target => {
      expect(target.colSpan).toBe(1)
    })
    expect(empty.colSpan).toBe(1)

    expect(CODING.value).toBe('Coding')
    expect(COMMUNICATION.value).toBe('Communication')
    expect(empty.value).toBeNull()
    expect(IMPACT.value).toBe('Impact')
    expect(LEAD.value).toBe('Lead')
  })
})
