export function mapValues<T extends Record<string, any>, U>(value: T, mapper: (value: T[keyof T]) => U) {
  return Object.fromEntries(
    Object.entries(value).map(([k, v]) => {
      return [k, mapper(v)];
    }),
  ) as { [K in keyof T]: U };
}
