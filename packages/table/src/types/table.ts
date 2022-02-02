import { PropsWithChildren, ReactNode } from 'react'

import { Path, Primitive } from './utility'

export interface CommonCell {
  id: string;
  rowSpan: number;
  colSpan: number;
  value: Primitive;
}

export interface THead<Row> extends CommonCell {
  accessor: Path<Row> | null;
  depth: number;
  render: CellRecursiveRenderer<THead<Row>>;
  labelSequence: string[];
  label: string;
}

export interface Cell<Row> extends CommonCell {
  accessor: Path<Row>;
  rowValues: Row;
  render: CellRecursiveRenderer<Cell<Row>>;
  labelSequence: string[];
  label: string;
}

export interface TFoot<Row> extends CommonCell {
  accessor: Path<Row> | null;
  render: CellRecursiveRenderer<TFoot<Row>>;
}

export interface PrivateAggregatedCell<Row>
  extends Pick<Renderer<Row>, 'rules'>,
    Pick<CommonCell, 'id'> {
  accessor: Path<Row>;
  render: CellRecursiveRenderer<Cell<Row>>;
  labelSequence: string[];
  label: string;
}

// TODO: move react directory
export type CellRendererProps<CellType extends CommonCell> = PropsWithChildren<{
  cellProps: CellType;
}>;

export type CellRecursiveRenderer<CellType extends CommonCell> = (
  props: PropsWithChildren<{ cellProps: CellType }>
) => JSX.Element | null;

export type CellComponent<CellType extends CommonCell> = (props: {
  cellProps: CellType;
}) => ReactNode | Primitive;

export interface RendererRules<Row> {
  mergeRow?: Path<Row> | Array<Path<Row>> | ((rowValues: Row) => string);
  colSpanAs?: number | ((rowValues: Row) => number);
  extendsFooter?: boolean
}

interface Renderer<Row> {
  accessor: Path<Row> | Array<Renderer<Row>>;
  label: string;
  header?: CellComponent<THead<Row>> | Array<CellRecursiveRenderer<THead<Row>>>;
  cell?: CellComponent<Cell<Row>> | Array<CellRecursiveRenderer<Cell<Row>>>;
  footer?: CellComponent<TFoot<Row>> | Array<CellRecursiveRenderer<TFoot<Row>>>;
  rules?: RendererRules<Row>;
}

export type RendererModel<Row> = Array<Renderer<Row>>;

export type HeadIds<Row> = Path<Row>;

export type HeadMeta = Record<
  string,
  { label: string; show: boolean; countOfChild: number; countOfParent: number }
>;

interface RowProps {
  id: string;
  rowSpan: number;
}

export type TableInstance<Row> = {
  theadGroups: Array<{
    getRowProps: () => RowProps;
    theads: Array<THead<Row>>;
  }>;
  rows: Array<{
    getRowProps: () => RowProps;
    cells: Array<Cell<Row>>;
  }>;
  tfoots: Array<TFoot<Row>> | null;

  headMeta: HeadMeta;
  selectableHeadIds: HeadIds<Row>[]
  visibleHeadIds: HeadIds<Row>[]
}

interface TableColumn<Row> {
  accessor: Path<Row> | Array<TableColumn<Row>>;
  label: string;
  head?: {
    render?: CellComponent<THead<Row>> | Array<CellRecursiveRenderer<THead<Row>>>;
  };
  cell?: {
    render?: CellComponent<Cell<Row>> | Array<CellRecursiveRenderer<Cell<Row>>>;
    mergeRow?: Path<Row> | Array<Path<Row>> | ((rowValues: Row) => string);
    colSpanAs?: number | ((rowValues: Row) => number);
  };
  foot?: {
    render: CellComponent<TFoot<Row>> | Array<CellRecursiveRenderer<TFoot<Row>>>;
    extends?: boolean;
  };
}

export type TableModel<Row> = Array<TableColumn<Row>>;
