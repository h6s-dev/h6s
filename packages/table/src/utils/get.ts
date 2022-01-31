export const get = (obj: Record<string, any>, path: string, defaultValue = undefined) => {
  const travel = (regexp: RegExp) =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce((acc, key) => (acc !== null && acc !== undefined ? acc[key] : acc), obj)
  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/)

  return result === undefined || result === obj ? defaultValue : result
}
