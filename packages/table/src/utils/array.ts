export function arrayIncludes<Type>(array: Type[] | readonly Type[], item: unknown, fromIndex?: number): item is Type {
  return array.includes(item as Type, fromIndex)
}

export function shiftUntil<Item>(arr: Item[], predicate: (item: Item) => boolean) {
  const result: Array<Item | null> = []

  while (arr.length > 0 && predicate(arr[0])) {
    result.push(arr.shift() ?? null)
  }

  return result
}

export function popUntil<Item>(arr: Item[], predicate: (item: Item) => boolean) {
  const result: Array<Item | null> = []

  while (arr.length > 0 && predicate(arr[arr.length - 1])) {
    result.push(arr.pop() ?? null)
  }

  return result
}
