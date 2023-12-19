import { Path, PathValue } from "../types/utility";
import { get } from "../utils/get";
import { groupBy } from "../utils/groupBy";
import { mapValues } from "../utils/mapValues";

export interface ComposeDatasetOptions<Row, Key extends Path<Row>> {
  groupBy: Key;
  compose: (rows: Array<Omit<Row, Key>>, key: PathValue<Row, Key>) => Array<Omit<Row, Key>>;
}

export function composeDataset<Row extends Record<string, any>, Key extends Path<Row>>(
  rows: Row[],
  { groupBy: key, compose }: ComposeDatasetOptions<Row, Key>,
) {
  const normalized = normalize(rows, key);
  const result = insert(normalized, compose);

  return reverseNormalize(result, key) as Row[];
}

function normalize<Row extends Record<string, any>, Key extends Path<Row>>(rows: Row[], key: Key) {
  return mapValues(
    groupBy(rows, (x) => String(get(x, key))),
    (x) => x.map(({ [key]: _, ...rest }) => rest),
  );
}

function reverseNormalize<Row, Key extends Path<Row>>(
  normalizedValue: Record<string, Array<Omit<Row, Key>>>,
  key: Key,
) {
  return Object.entries(normalizedValue).flatMap(([id, entries]) => entries.map((entry) => ({ [key]: id, ...entry })));
}

function insert<Row, Key extends Path<Row>>(
  body: Record<string, Array<Omit<Row, Key>>>,
  compose: (rows: Array<Omit<Row, Key>>, key: PathValue<Row, Key>) => Array<Omit<Row, Key>>,
) {
  return Object.fromEntries(
    Object.entries(body).map(([key, entities]) => {
      return [key, compose(entities, key as PathValue<Row, Key>)];
    }),
  );
}
