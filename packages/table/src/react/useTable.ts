import { useEffect, useMemo, useRef, useState } from 'react'

import { TableCore } from '../core/TableCore'
import { cellRenderer } from '../helpers/cellRenderer'
import { HeadIds, TableModel } from '../types/table'

interface Options<Row> {
  model: TableModel<Row>;
  source?: Row[];
  options?: {
    defaultHeadIds?: Array<HeadIds<Row>>;
  };
}

export function useTable<Row>({
  model,
  source,
  options: { defaultHeadIds } = {},
}: Options<Row>) {
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
      updateHead(headIds?: Array<HeadIds<Row>>) {
        setInstance(() => tableCore.current.updateHead(headIds).generate())
      },
    }),
    [],
  )

  useEffect(() => {
    setInstance(() => tableCore.current.updateSource(source).generate())
  }, [source])

  return [instance, controls] as const
}
