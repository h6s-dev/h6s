import { composeDataset, ComposeDatasetOptions } from '../helpers/composeDataset'
import { transToRendererModel } from '../helpers/transToRendererModel'
import {
  HeadIds,
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
  defaultHeadIds?: Array<HeadIds<RowData>>;
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
      visibleHeadIds: options.defaultHeadIds,
    })

    this.options = options
    this.rendererModel = rendererModel
    this.headMeta = headMeta
  }

  updateHeader(headIds?: Array<HeadIds<RowData>>) {
    invariant(headIds == null || headIds?.length > 0, 'headIds must be an array')

    const { headMeta } = buildHeadMeta(this.rendererModel, {
      visibleHeadIds: headIds,
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
    const selectableHeadIds = objectEntries(headMeta)
    .filter(([, x]) => x.countOfChild === 0)
    .map(([id]) => id) as Array<HeadIds<RowData>>

    const visibleHeadIds = objectEntries(headMeta)
      .filter(([, x]) => x.show && x.countOfChild === 0)
      .map(([id]) => id) as Array<HeadIds<RowData>>

    return {
      theadGroups,
      rows,
      tfoots,

      headMeta,
      selectableHeadIds,
      visibleHeadIds,
    }
  }

  composeRows<Key extends Path<RowData>>(composeOptions: ComposeDatasetOptions<RowData, Key>) {
    this.options.source = TableCore.compose(this.options.source ?? [], composeOptions)

    return this
  }
}
