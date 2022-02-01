import { composeDataset, ComposeDatasetOptions } from '../helpers/composeDataset'
import {
  HeaderId,
  HeaderMap,
  RendererModel,
  unstable_RendererModel,
} from '../types/table'
import { Path } from '../types/utility'
import { invariant } from '../utils/invariant'
import { buildFooters } from './footer/buildFooters'
import { buildHeaderGroups } from './header/buildHeaderGroups'
import { buildHeaderMap } from './header/buildHeaderMap'
import { buildHeaders } from './header/buildHeaders'
import { buildRendererModel } from './renderer/buildRendererModel'
import { buildCells } from './row/buildCells'
import { buildRows } from './row/buildRows'

interface Options<RowData, CellRenderer> {
  source?: RowData[];
  cellRenderer?: CellRenderer;
  defaultHeaderIds?: Array<HeaderId<RowData>>;
}

export class TableCore<RowData, CellRenderer> {
  static compose = composeDataset

  private rendererModel: RendererModel<RowData>
  private headerMap: HeaderMap
  private options: Options<RowData, CellRenderer>

  constructor(
    model: RendererModel<RowData> | unstable_RendererModel<RowData>,
    options: Options<RowData, CellRenderer>,
  ) {
    const rendererModel = unstableToNormal(model)
    const { headerMap } = buildHeaderMap(rendererModel, {
      visibleHeaderIds: options.defaultHeaderIds,
    })

    this.options = options
    this.rendererModel = rendererModel
    this.headerMap = headerMap
  }

  updateHeader(headerIds?: Array<HeaderId<RowData>>) {
    invariant(headerIds == null || headerIds?.length > 0, 'headerIds must be an array')

    const { headerMap } = buildHeaderMap(this.rendererModel, {
      visibleHeaderIds: headerIds,
    })

    this.headerMap = headerMap

    return this
  }

  updateSource(source?: RowData[]) {
    this.options.source = source

    return this
  }

  generate() {
    const {
      rendererModel,
      headerMap,
      options: { source = [], cellRenderer },
    } = this

    const model = buildRendererModel(rendererModel, headerMap)

    const { headerGroups } = buildHeaderGroups({
      headers: buildHeaders(model, { cellRenderer }),
    })

    const { rows } = buildRows(source, {
      cells: buildCells(model, { cellRenderer }),
    })

    const { footers } = buildFooters(model, { cellRenderer })

    return {
      headerGroups,
      headerMap,
      rows,
      footers,
    }
  }

  composeRows<Key extends Path<RowData>>(composeOptions: ComposeDatasetOptions<RowData, Key>) {
    this.options.source = TableCore.compose(this.options.source ?? [], composeOptions)

    return this
  }
}

function unstableToNormal<RowData>(
  model: RendererModel<RowData> | unstable_RendererModel<RowData>,
): RendererModel<RowData> {
  if (!isUnstableRenderer(model)) {
    return model
  }

  return model.map(x => {
    return {
      label: x.header.label,
      header: x.header.render,
      cell: x.cell.render,
      footer: x.footer?.render,
      accessor: Array.isArray(x.accessor) ? unstableToNormal(x.accessor) : x.accessor,
      rules: {
        mergeRow: x.cell.mergeRow,
        colSpanAs: x.cell.colSpanAs,
      },
    }
  })
}

function isUnstableRenderer<RowData>(
  model: RendererModel<RowData> | unstable_RendererModel<RowData>,
): model is unstable_RendererModel<RowData> {
  return (model as RendererModel<RowData>)?.[0].label == null
}
