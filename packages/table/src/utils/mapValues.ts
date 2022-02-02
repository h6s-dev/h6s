export function mapValues<T, U>(value: T, mapper: (value: T[keyof T]) => U): { [K in keyof T]: U } {
  const entries = Object.entries(value)

  return Object.fromEntries(
    entries.map(([k, v]) => {
      return [k, mapper(v)]
    }),
  ) as any
}
