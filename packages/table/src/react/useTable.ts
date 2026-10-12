import { useEffect, useMemo, useRef, useState } from "react";

import { TableCore } from "../core/TableCore";
import { cellRenderer } from "../helpers/cellRenderer";
import type { HeadId, TableModel } from "../types/table";

interface Options<Row extends Record<string, any>> {
  model: TableModel<Row>;
  source?: Row[];
  options?: {
    defaultHeadIds?: Array<HeadId<Row>>;
  };
}

export function useTable<Row extends Record<string, any>>({
  model,
  source,
  options: { defaultHeadIds } = {},
}: Options<Row>) {
  const tableCoreRef = useRef<TableCore<Row, typeof cellRenderer> | null>(null);

  if (tableCoreRef.current === null) {
    tableCoreRef.current = new TableCore(model, {
      source,
      cellRenderer,
      defaultHeadIds,
    });
  }

  const tableCore = tableCoreRef.current;

  const [instance, setInstance] = useState(() => tableCore.generate());
  const controls = useMemo(
    () => ({
      updateHead(headIds?: Array<HeadId<Row>>) {
        setInstance(() => tableCore.updateHead(headIds).generate());
      },
    }),
    [tableCore],
  );

  useEffect(() => {
    setInstance(() => tableCore.updateSource(source).generate());
  }, [source, tableCore]);

  return [instance, controls] as const;
}
