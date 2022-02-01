import { useEffect, useMemo, useRef, useState } from 'react'

import { TableCore } from '../core/TableCore'
import { cellRenderer } from '../helpers/cellRenderer'
import { HeaderId, RendererModel, unstable_RendererModel } from '../types/table'

interface Options<RowData> {
  model: RendererModel<RowData> | unstable_RendererModel<RowData>;
  source?: RowData[];
  options?: {
    defaultHeaderIds?: Array<HeaderId<RowData>>;
  };
}

export function useTable<RowData>({
  model,
  source,
  options: { defaultHeaderIds } = {},
}: Options<RowData>) {
  const tableCore = useRef(
    new TableCore(model, {
      source,
      cellRenderer,
      defaultHeaderIds,
    }),
  )

  const [instance, setInstance] = useState(() => tableCore.current.generate())
  const controls = useMemo(
    () => ({
      updateHeader(headerIds?: Array<HeaderId<RowData>>) {
        setInstance(() => tableCore.current.updateHeader(headerIds).generate())
      },
    }),
    [],
  )

  useEffect(() => {
    setInstance(() => tableCore.current.updateSource(source).generate())
  }, [source])

  return [instance, controls] as const
}
