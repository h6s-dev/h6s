import { THead } from '../../types/table'
import { generateTableID } from '../../utils/generateTableID'
import { groupBy } from '../../utils/groupBy'

interface Options<RowData> {
  theads: Array<THead<RowData>>;
}

export function buildTHeadGroups<RowData>({ theads }: Options<RowData>) {
  const groupByDepth = Object.values(groupBy(theads, x => String(x.depth)))
  const theadGroups = groupByDepth.map(theads => {
    return {
      theads,
      getRowProps () {
        return {
          id: generateTableID(),
          rowSpan: groupByDepth.length,
        }
      },
    }
  })

  return { theadGroups }
}
