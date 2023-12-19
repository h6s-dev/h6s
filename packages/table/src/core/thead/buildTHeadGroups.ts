import { THead } from "../../types/table";
import { generateTableID } from "../../utils/generateTableID";
import { groupBy } from "../../utils/groupBy";

interface Options<Row> {
  theads: Array<THead<Row>>;
}

export function buildTHeadGroups<Row>({ theads }: Options<Row>) {
  const groupByDepth = Object.values(groupBy(theads, (x) => String(x.depth)));
  const theadGroups = groupByDepth.map((theads) => {
    return {
      theads,
      getRowProps() {
        return {
          id: generateTableID(),
          rowSpan: groupByDepth.length,
        };
      },
    };
  });

  return { theadGroups };
}
