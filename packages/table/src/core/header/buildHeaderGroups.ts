import { Header } from '../../types/table'
import { generateTableID } from '../../utils/generateTableID'
import { groupBy } from '../../utils/groupBy'

interface Options<RowData> {
  headers: Array<Header<RowData>>;
}

export function buildHeaderGroups<RowData>({ headers }: Options<RowData>) {
  const groupByDepth = Object.values(groupBy(headers, x => String(x.depth)))
  const headerGroups = groupByDepth.map(headers => {
    return {
      headers,
      getRowProps () {
        return {
          id: generateTableID(),
          rowSpan: groupByDepth.length,
        }
      },
    }
  })

  return { headerGroups }
}
