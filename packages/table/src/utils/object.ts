export type ObjectKeys<T extends Record<PropertyKey, unknown>> = `${Exclude<keyof T, symbol>}`;

export function objectKeys<Type extends Record<PropertyKey, unknown>>(obj: Type): Array<ObjectKeys<Type>> {
  return Object.keys(obj) as Array<ObjectKeys<Type>>
}

export function objectEntries<Type extends Record<PropertyKey, unknown>>(
  obj: Type,
): Array<[ObjectKeys<Type>, Type[ObjectKeys<Type>]]> {
  return Object.entries(obj) as Array<[ObjectKeys<Type>, Type[ObjectKeys<Type>]]>
}

export function objectValues<Type extends Record<PropertyKey, unknown>>(obj: Type): Array<Type[ObjectKeys<Type>]> {
  return Object.values(obj) as Array<Type[ObjectKeys<Type>]>
}
