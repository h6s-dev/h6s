export function sum(...arr: number[] | number[][]) {
  return arr.flat().reduce((a, b) => a + b, 0)
}
