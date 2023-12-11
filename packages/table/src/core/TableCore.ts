import { composeDataset, ComposeDatasetOptions } from '../helpers/composeDataset'
import { transToRendererModel } from '../helpers/transToRendererModel'
import {
  HeadId, HeadMeta,
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

interface Options<Row extends Record<string, any>, CellRenderer> {
  source?: Row[];
  cellRenderer?: CellRenderer;
  defaultHeadIds?: Array<HeadId<Row>>;
}

export class TableCore<Row extends Record<string, any>, CellRenderer> {
  static compose = composeDataset

  private rendererModel: RendererModel<Row>
  private headMeta: HeadMeta
  private options: Options<Row, CellRenderer>

  constructor(
    model: TableModel<Row>,
    options: Options<Row, CellRenderer>,
  ) {
    const rendererModel = transToRendererModel(model)
    const { headMeta } = buildHeadMeta(rendererModel, {
      visibleHeadIds: options.defaultHeadIds,
    })

    this.options = options
    this.rendererModel = rendererModel
    this.headMeta = headMeta
  }

  updateHead(headIds?: Array<HeadId<Row>>) {
    invariant(headIds == null || headIds?.length > 0, 'headIds must be an array')

    const { headMeta } = buildHeadMeta(this.rendererModel, {
      visibleHeadIds: headIds,
    })

    this.headMeta = headMeta

    return this
  }

  updateSource(source?: Row[]) {
    this.options.source = source

    return this
  }

  generate(): TableInstance<Row> {
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
    .map(([id]) => id) as Array<HeadId<Row>>

    const visibleHeadIds = objectEntries(headMeta)
      .filter(([, x]) => x.show && x.countOfChild === 0)
      .map(([id]) => id) as Array<HeadId<Row>>

    return {
      theadGroups,
      rows,
      tfoots,

      headMeta,
      selectableHeadIds,
      visibleHeadIds,
    }
  }

  composeRows<Key extends Path<Row>>(composeOptions: ComposeDatasetOptions<Row, Key>) {
    this.options.source = TableCore.compose(this.options.source ?? [], composeOptions)

    return this
  }
}
