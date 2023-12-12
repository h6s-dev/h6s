import { describe, expect, test } from 'vitest'

import { sum } from '../utils/sum'
import { composeDataset } from './composeDataset'

const date = new Date('2021-12-27').toISOString()
const stats = {
  금액: 100,
}

const 모든_넥스트상점_합계_ID = '#모든넥스트상점합계'
const 모든_리믹스상점_합계_ID = '#모든리믹스상점합계'
const 모든_상점아이디_합계_ID = '#모든상점아이디합계'

describe('composeDataset', () => {
  test('parse', () => {
    // Given, When, Then
    expect(
      composeDataset(byDate, {
        groupBy: 'date',
        compose: rows => {
          const appended = composeDataset(rows, {
            groupBy: 'mid',
            compose: (rows, mid) => {
              return rows.concat({
                payMethod: mid === '넥스트상점' ? 모든_넥스트상점_합계_ID : 모든_리믹스상점_합계_ID,
                stats: { 금액: sum(...rows.map(x => x.stats.금액)) },
              })
            },
          })

          return appended.concat({
            mid: 모든_상점아이디_합계_ID as any,
            payMethod: '',
            stats: {
              금액: sum(...rows.map(x => x.stats.금액)),
            },
          })
        },
      }),
    ).toEqual(result)
  })
})

const byDate = [
  {
    date,
    mid: '넥스트상점' as const,
    payMethod: 'CARD',
    stats,
  },
  {
    date,
    mid: '넥스트상점' as const,
    payMethod: 'VIRTUAL_ACCOUNT',
    stats,
  },
  {
    date,
    mid: '리믹스상점' as const,
    payMethod: 'CARD',
    stats,
  },
  {
    date,
    mid: '리믹스상점' as const,
    payMethod: 'VIRTUAL_ACCOUNT',
    stats,
  },
]

const result = [
  {
    date,
    mid: '넥스트상점' as const,
    payMethod: 'CARD',
    stats,
  },
  {
    date,
    mid: '넥스트상점' as const,
    payMethod: 'VIRTUAL_ACCOUNT',
    stats,
  },
  {
    date,
    mid: '넥스트상점' as const,
    payMethod: 모든_넥스트상점_합계_ID,
    stats: {
      금액: 200,
    },
  },
  {
    date,
    mid: '리믹스상점' as const,
    payMethod: 'CARD',
    stats,
  },
  {
    date,
    mid: '리믹스상점' as const,
    payMethod: 'VIRTUAL_ACCOUNT',
    stats,
  },
  {
    date,
    mid: '리믹스상점' as const,
    payMethod: 모든_리믹스상점_합계_ID,
    stats: {
      금액: 200,
    },
  },
  {
    date,
    mid: 모든_상점아이디_합계_ID,
    payMethod: '',
    stats: {
      금액: 400,
    },
  },
]
