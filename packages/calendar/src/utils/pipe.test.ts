import { describe, expect, it } from 'vitest'

import { pipe, pipeWith } from './pipe'

const zeroParamGetNumber = () => 1
const singleParamFnAdd1 = (n: number) => n + 1
const singleParamFnTimes2 = (n: number) => n * 2
const multipleParamFnDifference = (a: number, b: number) => a - b

describe('pipe function', () => {
  it('works when first function has 0 params', () => {
    const result = pipe(zeroParamGetNumber, singleParamFnAdd1)()
    expect(result).toEqual(2)
  })

  it('works when first function has single param', () => {
    expect(pipe(singleParamFnAdd1)(1)).toEqual(2)
    expect(pipe(singleParamFnAdd1, singleParamFnTimes2)(1)).toEqual(4)
    expect(
      pipe(singleParamFnAdd1, singleParamFnTimes2, singleParamFnAdd1)(1),
    ).toEqual(5)
    expect(
      pipe(
        singleParamFnAdd1,
        singleParamFnTimes2,
        singleParamFnAdd1,
        singleParamFnTimes2,
      )(1),
    ).toEqual(10)
    expect(
      pipe(
        singleParamFnAdd1,
        singleParamFnTimes2,
        singleParamFnAdd1,
        singleParamFnTimes2,
        singleParamFnAdd1,
      )(1),
    ).toEqual(11)
    expect(
      pipe(
        singleParamFnAdd1,
        singleParamFnTimes2,
        singleParamFnAdd1,
        singleParamFnTimes2,
        singleParamFnAdd1,
        singleParamFnTimes2,
      )(1),
    ).toEqual(22)
    expect(
      pipe(
        singleParamFnAdd1,
        singleParamFnTimes2,
        singleParamFnAdd1,
        singleParamFnTimes2,
        singleParamFnAdd1,
        singleParamFnTimes2,
        singleParamFnAdd1,
      )(1),
    ).toEqual(23)
    expect(
      pipe(
        singleParamFnAdd1,
        singleParamFnTimes2,
        singleParamFnAdd1,
        singleParamFnTimes2,
        singleParamFnAdd1,
        singleParamFnTimes2,
        singleParamFnAdd1,
        singleParamFnTimes2,
      )(1),
    ).toEqual(46)
    expect(
      pipe(
        singleParamFnAdd1,
        singleParamFnTimes2,
        singleParamFnAdd1,
        singleParamFnTimes2,
        singleParamFnAdd1,
        singleParamFnTimes2,
        singleParamFnAdd1,
        singleParamFnTimes2,
        singleParamFnAdd1,
      )(1),
    ).toEqual(47)
  })

  it('works when first function has multiple params', () => {
    expect(pipe(multipleParamFnDifference, singleParamFnAdd1)(5, 4)).toEqual(2)
  })
})

describe(pipeWith.name, () => {
  it('works', () => {
    expect(pipeWith(1, singleParamFnAdd1)).toEqual(2)
    expect(pipeWith(1, singleParamFnAdd1, singleParamFnTimes2)).toEqual(4)
    expect(
      pipeWith(1, singleParamFnAdd1, singleParamFnTimes2, singleParamFnAdd1),
    ).toEqual(5)
    expect(
      pipeWith(
        1,
        singleParamFnAdd1,
        singleParamFnTimes2,
        singleParamFnAdd1,
        singleParamFnTimes2,
      ),
    ).toEqual(10)
    expect(
      pipeWith(
        1,
        singleParamFnAdd1,
        singleParamFnTimes2,
        singleParamFnAdd1,
        singleParamFnTimes2,
        singleParamFnAdd1,
      ),
    ).toEqual(11)
    expect(
      pipeWith(
        1,
        singleParamFnAdd1,
        singleParamFnTimes2,
        singleParamFnAdd1,
        singleParamFnTimes2,
        singleParamFnAdd1,
        singleParamFnTimes2,
      ),
    ).toEqual(22)
    expect(
      pipeWith(
        1,
        singleParamFnAdd1,
        singleParamFnTimes2,
        singleParamFnAdd1,
        singleParamFnTimes2,
        singleParamFnAdd1,
        singleParamFnTimes2,
        singleParamFnAdd1,
      ),
    ).toEqual(23)
    expect(
      pipeWith(
        1,
        singleParamFnAdd1,
        singleParamFnTimes2,
        singleParamFnAdd1,
        singleParamFnTimes2,
        singleParamFnAdd1,
        singleParamFnTimes2,
        singleParamFnAdd1,
        singleParamFnTimes2,
      ),
    ).toEqual(46)
    expect(
      pipeWith(
        1,
        singleParamFnAdd1,
        singleParamFnTimes2,
        singleParamFnAdd1,
        singleParamFnTimes2,
        singleParamFnAdd1,
        singleParamFnTimes2,
        singleParamFnAdd1,
        singleParamFnTimes2,
        singleParamFnAdd1,
      ),
    ).toEqual(47)
  })
})
