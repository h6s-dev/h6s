import { PropsWithChildren, ReactNode } from 'react'

import { Path, Primitive } from './utility'

export interface CommonCell {
  id: string;
  rowSpan: number;
  colSpan: number;
  value: Primitive;
}

export interface Header<RowData> extends CommonCell {
  accessor: Path<RowData> | null;
  depth: number;
  render: CellRecursiveRenderer<Header<RowData>>;
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

export interface Footer<RowData> extends CommonCell {
  accessor: Path<RowData> | null;
  render: CellRecursiveRenderer<Footer<RowData>>;
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
}

interface Renderer<RowData> {
  label: string;
  header?: CellComponent<Header<RowData>> | Array<CellRecursiveRenderer<Header<RowData>>>;
  cell?: CellComponent<Cell<RowData>> | Array<CellRecursiveRenderer<Cell<RowData>>>;
  footer?: CellComponent<Footer<RowData>> | Array<CellRecursiveRenderer<Footer<RowData>>>;
  accessor: Path<RowData> | Array<Renderer<RowData>>;
  rules?: RendererRules<RowData>;
}

export type RendererModel<RowData> = Array<Renderer<RowData>>;

interface unstable_Renderer<RowData> {
  accessor: Path<RowData> | Array<unstable_Renderer<RowData>>;
  header: {
    render: CellComponent<Header<RowData>> | Array<CellRecursiveRenderer<Header<RowData>>>;
    label: string;
  };
  cell: {
    render: CellComponent<Cell<RowData>> | Array<CellRecursiveRenderer<Cell<RowData>>>;
    mergeRow?: Path<RowData> | Array<Path<RowData>> | ((rowValues: RowData) => string);
    colSpanAs?: number | ((rowValues: RowData) => number);
  };
  footer?: {
    render: CellComponent<Footer<RowData>> | Array<CellRecursiveRenderer<Footer<RowData>>>;
  };
}

export type unstable_RendererModel<RowData> = Array<unstable_Renderer<RowData>>;

export type HeaderId<RowData> = Path<RowData>;

export interface HeaderTreeNode<RowData> {
  accessor: Path<RowData> | Array<HeaderTreeNode<RowData>>;
  label: string;
}

export type HeaderMap = Record<
  string,
  { label: string; show: boolean; countOfChild: number; countOfParent: number }
>;

interface RowProps {
  id: string;
  rowSpan: number;
}

export interface TablerInstance<RowData> {
  headerGroups: Array<{
    getRowProps: () => RowProps;
    headers: Array<Header<RowData>>;
  }>;
  rows: Array<{
    getRowProps: () => RowProps;
    cells: Array<Cell<RowData>>;
  }>;
  footers: Array<Footer<RowData>> | null;
  headerTree: Array<HeaderTreeNode<RowData>>;
  headerMap: HeaderMap;
}
