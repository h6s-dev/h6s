import { composeDataset, ComposeDatasetOptions } from '../helpers/composeDataset'
import { transToRendererModel } from '../helpers/transToRendererModel'
import {
  HeaderId,
  HeadMeta,
  RendererModel,
  TableInstance,
  TableModel,
} from '../types/table'
import { Path } from '../types/utility'
import { invariant } from '../utils/invariant'
import { objectEntries } from '../utils/object'
import { buildRendererModel } from './renderer/buildRendererModel'
import { buildCells } from './row/buildCells'
import { buildRows } from './row/buildRows'
import { buildTFoots } from './tfoot/buildTFoots'
import { buildHeadMeta } from './thead/buildHeadMeta'
import { buildTHeadGroups } from './thead/buildTHeadGroups'
import { buildTHeads } from './thead/buildTHeads'

interface Options<RowData, CellRenderer> {
  source?: RowData[];
  cellRenderer?: CellRenderer;
  defaultHeaderIds?: Array<HeaderId<RowData>>;
}

export class TableCore<RowData, CellRenderer> {
  static compose = composeDataset

  private rendererModel: RendererModel<RowData>
  private headMeta: HeadMeta
  private options: Options<RowData, CellRenderer>

  constructor(
    model: TableModel<RowData>,
    options: Options<RowData, CellRenderer>,
  ) {
    const rendererModel = transToRendererModel(model)
    const { headMeta } = buildHeadMeta(rendererModel, {
      visibleHeaderIds: options.defaultHeaderIds,
    })

    this.options = options
    this.rendererModel = rendererModel
    this.headMeta = headMeta
  }

  updateHeader(headerIds?: Array<HeaderId<RowData>>) {
    invariant(headerIds == null || headerIds?.length > 0, 'headerIds must be an array')

    const { headMeta } = buildHeadMeta(this.rendererModel, {
      visibleHeaderIds: headerIds,
    })

    this.headMeta = headMeta

    return this
  }

  updateSource(source?: RowData[]) {
    this.options.source = source

    return this
  }

  generate(): TableInstance<RowData> {
    const {
      rendererModel,
      headMeta,
      options: { source = [], cellRenderer },
    } = this

    const model = buildRendererModel(rendererModel, headMeta)

    const { theadGroups } = buildTHeadGroups({
      theads: buildTHeads(model, { cellRenderer }),
    })

    const { rows } = buildRows(source, {
      cells: buildCells(model, { cellRenderer }),
    })

    const { tfoots } = buildTFoots(model, { cellRenderer })

    // FIXME: infer type
    const selectableHeaderIds = objectEntries(headMeta)
    .filter(([, x]) => x.countOfChild === 0)
    .map(([id]) => id) as Array<HeaderId<RowData>>

    const visibleHeaderIds = objectEntries(headMeta)
      .filter(([, x]) => x.show && x.countOfChild === 0)
      .map(([id]) => id) as Array<HeaderId<RowData>>

    return {
      theadGroups,
      rows,
      tfoots,

      headMeta,
      selectableHeaderIds,
      visibleHeaderIds,
    }
  }

  composeRows<Key extends Path<RowData>>(composeOptions: ComposeDatasetOptions<RowData, Key>) {
    this.options.source = TableCore.compose(this.options.source ?? [], composeOptions)

    return this
  }
}
