export function groupBy<T>(data: T[], createKey: (item: T) => string) {
  return data.reduce((result: Record<string, T[]>, current) => {
    const key = createKey(current);
    if (result[key] == null) {
      result[key] = [current];
    } else {
      result[key].push(current);
    }

    return result;
  }, {});
}
