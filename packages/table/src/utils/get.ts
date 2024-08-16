import type { Path } from "..";

export function get<ObjectType extends Record<string, any>>(
  obj: ObjectType,
  path: Path<ObjectType>,
  defaultValue = undefined,
) {
  const travel = (regexp: RegExp) =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce((acc, key) => (acc !== null && acc !== undefined ? acc[key] : acc), obj);
  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);

  return result === undefined || result === obj ? defaultValue : result;
}
