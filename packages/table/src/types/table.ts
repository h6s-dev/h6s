import { PropsWithChildren, ReactNode } from 'react'

import { Path, Primitive } from './utility'

export interface CommonCell {
  id: string;
  rowSpan: number;
  colSpan: number;
  value: Primitive;
}

export interface THead<RowData> extends CommonCell {
  accessor: Path<RowData> | null;
  depth: number;
  render: CellRecursiveRenderer<THead<RowData>>;
  labelSequence: string[];
  label: string;
}

export interface Cell<RowData> extends CommonCell {
  accessor: Path<RowData>;
  rowValues: RowData;
  render: CellRecursiveRenderer<Cell<RowData>>;
  labelSequence: string[];
  label: string;
}

export interface TFoot<RowData> extends CommonCell {
  accessor: Path<RowData> | null;
  render: CellRecursiveRenderer<TFoot<RowData>>;
}

export interface PrivateAggregatedCell<RowData>
  extends Pick<Renderer<RowData>, 'rules'>,
    Pick<CommonCell, 'id'> {
  accessor: Path<RowData>;
  render: CellRecursiveRenderer<Cell<RowData>>;
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

export interface RendererRules<RowData> {
  mergeRow?: Path<RowData> | Array<Path<RowData>> | ((rowValues: RowData) => string);
  colSpanAs?: number | ((rowValues: RowData) => number);
  extendsFooter?: boolean
}

interface Renderer<RowData> {
  accessor: Path<RowData> | Array<Renderer<RowData>>;
  label: string;
  header?: CellComponent<THead<RowData>> | Array<CellRecursiveRenderer<THead<RowData>>>;
  cell?: CellComponent<Cell<RowData>> | Array<CellRecursiveRenderer<Cell<RowData>>>;
  footer?: CellComponent<TFoot<RowData>> | Array<CellRecursiveRenderer<TFoot<RowData>>>;
  rules?: RendererRules<RowData>;
}

export type RendererModel<RowData> = Array<Renderer<RowData>>;

export type HeaderId<RowData> = Path<RowData>;

export type HeadMeta = Record<
  string,
  { label: string; show: boolean; countOfChild: number; countOfParent: number }
>;

interface RowProps {
  id: string;
  rowSpan: number;
}

export type TableInstance<RowData> = {
  theadGroups: Array<{
    getRowProps: () => RowProps;
    theads: Array<THead<RowData>>;
  }>;
  rows: Array<{
    getRowProps: () => RowProps;
    cells: Array<Cell<RowData>>;
  }>;
  tfoots: Array<TFoot<RowData>> | null;

  headMeta: HeadMeta;
  selectableHeaderIds: HeaderId<RowData>[]
  visibleHeaderIds: HeaderId<RowData>[]
}

interface TableColumn<RowData> {
  accessor: Path<RowData> | Array<TableColumn<RowData>>;
  label: string;
  head?: {
    render?: CellComponent<THead<RowData>> | Array<CellRecursiveRenderer<THead<RowData>>>;
  };
  cell?: {
    render?: CellComponent<Cell<RowData>> | Array<CellRecursiveRenderer<Cell<RowData>>>;
    mergeRow?: Path<RowData> | Array<Path<RowData>> | ((rowValues: RowData) => string);
    colSpanAs?: number | ((rowValues: RowData) => number);
  };
  foot?: {
    render: CellComponent<TFoot<RowData>> | Array<CellRecursiveRenderer<TFoot<RowData>>>;
    extends?: boolean;
  };
}

export type TableModel<RowData> = Array<TableColumn<RowData>>;
