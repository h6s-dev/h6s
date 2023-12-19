let randomId = 0;

const map = new Map<string, number>();

export default function generateID(prefix: string) {
  if (map.has(prefix)) {
    const id = map.get(prefix);
    const newId = id! + 1;
    map.set(prefix, newId);
    randomId = newId;
  } else {
    const id = 1;
    map.set(prefix, id);
    randomId = id;
  }

  return `${prefix}-${randomId}`;
}
