import { useEffect, useMemo, useRef, useState } from 'react'

import { TableCore } from '../core/TableCore'
import { cellRenderer } from '../helpers/cellRenderer'
import { HeadIds, TableModel } from '../types/table'

interface Options<RowData> {
  model: TableModel<RowData>;
  source?: RowData[];
  options?: {
    defaultHeadIds?: Array<HeadIds<RowData>>;
  };
}

export function useTable<RowData>({
  model,
  source,
  options: { defaultHeadIds } = {},
}: Options<RowData>) {
  const tableCore = useRef(
    new TableCore(model, {
      source,
      cellRenderer,
      defaultHeadIds,
    }),
  )

  const [instance, setInstance] = useState(() => tableCore.current.generate())
  const controls = useMemo(
    () => ({
      updateHeader(headIds?: Array<HeadIds<RowData>>) {
        setInstance(() => tableCore.current.updateHeader(headIds).generate())
      },
    }),
    [],
  )

  useEffect(() => {
    setInstance(() => tableCore.current.updateSource(source).generate())
  }, [source])

  return [instance, controls] as const
}
