// @ts-ignore
import React from "react";

import type { CellComponent, CellRecursiveRenderer, CellRendererProps, CommonCell } from "../types/table";

export function cellRenderer<CellType extends CommonCell>(
  renderers?: CellComponent<CellType> | Array<CellRecursiveRenderer<CellType>>,
) {
  return ({ cellProps, ...props }: CellRendererProps<CellType>) => {
    if (cellProps.colSpan === 0) {
      return null;
    }

    if (renderers == null || renderers.length === 0) {
      return <>{cellProps.value}</>;
    }

    if (typeof renderers === "string") {
      return <>{renderers}</>;
    }

    if (typeof renderers === "function") {
      return <>{renderers({ cellProps, ...props })}</>;
    }

    return <CombinedCell renderers={renderers} cellProps={cellProps} {...props} />;
  };
}

interface Props<CellType extends CommonCell> extends CellRendererProps<CellType> {
  renderers: Array<CellRecursiveRenderer<CellType>>;
  index?: number;
}

function CombinedCell<CellType extends CommonCell>({ renderers, index = 0, cellProps }: Props<CellType>) {
  const Renderer = renderers[index];

  if (index === renderers.length - 1) {
    if (index === 0) {
      const CellComponent = Renderer as any;

      return (
        <CellComponent cellProps={cellProps} rowSpan={cellProps.rowSpan} colSpan={cellProps.colSpan}>
          {cellProps.value}
        </CellComponent>
      );
    }

    return <Renderer cellProps={cellProps}>{cellProps.value}</Renderer>;
  }

  if (index === 0) {
    const CellComponent = Renderer as any;

    return (
      <CellComponent cellProps={cellProps} rowSpan={cellProps.rowSpan} colSpan={cellProps.colSpan}>
        <CombinedCell renderers={renderers} index={index + 1} cellProps={cellProps} />
      </CellComponent>
    );
  }

  return (
    <Renderer cellProps={cellProps}>
      <CombinedCell renderers={renderers} index={index + 1} cellProps={cellProps} />
    </Renderer>
  );
}
