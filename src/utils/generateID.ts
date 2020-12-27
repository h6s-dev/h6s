let id = 0

export default function generateID(prefix: string) {
  id += 1

  return `${prefix}-${id}`
}
