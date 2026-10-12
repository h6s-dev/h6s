// @vitest-environment jsdom

import { act, renderHook } from "@testing-library/react";
import { type PropsWithChildren, StrictMode, createElement } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { TableCore } from "../core/TableCore";
import type { HeadId, TableModel } from "../types/table";
import { useTable } from "./useTable";

vi.mock("../core/TableCore", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../core/TableCore")>();

  return {
    ...actual,
    TableCore: vi.fn((...args: ConstructorParameters<typeof actual.TableCore>) => new actual.TableCore(...args)),
  };
});

interface Row {
  id: string;
  name: string;
}

const model: TableModel<Row> = [
  { accessor: "id", label: "ID" },
  { accessor: "name", label: "Name" },
];
const source: Row[] = [{ id: "first", name: "Alice" }];

describe("useTable core initialization", () => {
  beforeEach(() => {
    vi.mocked(TableCore).mockClear();
  });

  it("reuses the core across the mount effect and 100 parent rerenders", () => {
    const { result, rerender } = renderHook(() => useTable({ model, source }));
    const [initialInstance, initialControls] = result.current;

    for (let index = 0; index < 100; index++) {
      rerender();
    }

    expect(TableCore).toHaveBeenCalledTimes(1);
    expect(result.current[0]).toBe(initialInstance);
    expect(result.current[1]).toBe(initialControls);
  });

  it("updates source data while preserving selected columns and controls", () => {
    const { result, rerender } = renderHook(({ source }) => useTable({ model, source }), {
      initialProps: { source },
    });
    const controls = result.current[1];

    act(() => {
      controls.updateHead(["name"]);
    });
    rerender({ source: [{ id: "second", name: "Bob" }] });

    expect(result.current[0].visibleHeadIds).toEqual(["name"]);
    expect(result.current[0].rows[0].cells.map((cell) => cell.value)).toEqual(["Bob"]);
    expect(result.current[1]).toBe(controls);
    expect(TableCore).toHaveBeenCalledTimes(1);
  });

  it("supports loading and clearing an initially undefined source", () => {
    const { result, rerender } = renderHook(({ source }) => useTable({ model, source }), {
      initialProps: { source: undefined as Row[] | undefined },
    });

    expect(result.current[0].rows).toHaveLength(0);
    rerender({ source });
    expect(result.current[0].rows[0].cells.map((cell) => cell.value)).toEqual(["first", "Alice"]);
    rerender({ source: undefined });
    expect(result.current[0].rows).toHaveLength(0);
    expect(TableCore).toHaveBeenCalledTimes(1);
  });

  it("applies default columns on initialization without resetting later selections", () => {
    const { result, rerender } = renderHook(
      ({ defaultHeadIds }) => useTable({ model, source, options: { defaultHeadIds } }),
      { initialProps: { defaultHeadIds: ["name"] as HeadId<Row>[] } },
    );

    expect(result.current[0].visibleHeadIds).toEqual(["name"]);
    act(() => {
      result.current[1].updateHead(["id"]);
    });
    rerender({ defaultHeadIds: ["name"] });

    expect(result.current[0].visibleHeadIds).toEqual(["id"]);
    expect(result.current[0].rows[0].cells.map((cell) => cell.value)).toEqual(["first"]);
    expect(TableCore).toHaveBeenCalledTimes(1);
  });

  it("keeps separate cores for separate hook instances", () => {
    const first = renderHook(() => useTable({ model, source }));
    const second = renderHook(() => useTable({ model, source }));

    act(() => {
      first.result.current[1].updateHead(["name"]);
    });

    expect(first.result.current[0].visibleHeadIds).toEqual(["name"]);
    expect(second.result.current[0].visibleHeadIds).toEqual(["id", "name"]);
    expect(TableCore).toHaveBeenCalledTimes(2);
  });

  it("creates a new core when a hook is mounted again", () => {
    const first = renderHook(() => useTable({ model, source }));
    first.unmount();

    const nextSource: Row[] = [{ id: "second", name: "Bob" }];
    const second = renderHook(() => useTable({ model, source: nextSource }));

    expect(second.result.current[0].rows[0].cells.map((cell) => cell.value)).toEqual(["second", "Bob"]);
    expect(TableCore).toHaveBeenCalledTimes(2);
  });

  it("does not create additional cores on StrictMode rerenders", () => {
    const { result, rerender } = renderHook(() => useTable({ model, source }), {
      wrapper: ({ children }: PropsWithChildren) => createElement(StrictMode, null, children),
    });
    const initialCount = vi.mocked(TableCore).mock.calls.length;

    rerender();

    expect(result.current[0].rows[0].cells.map((cell) => cell.value)).toEqual(["first", "Alice"]);
    expect(TableCore).toHaveBeenCalledTimes(initialCount);
  });
});
