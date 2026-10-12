import { describe, expect, it } from "vitest";

import type { RendererRules } from "../../types/table";
import { CellSpanManager } from "./CellSpanManager";

interface Row {
  group: string;
}

describe("CellSpanManager.getMaxRowSpan", () => {
  it("defaults to one before any rows are saved", () => {
    const manager = new CellSpanManager<Row>();

    expect(manager.getMaxRowSpan()).toBe(1);
  });

  it("defaults to one when rows have no merge rule", () => {
    const manager = new CellSpanManager<Row>();

    expect(manager.saveRowSpan({ group: "a" })).toBe(false);
    expect(manager.saveRowSpan({ group: "a" })).toBe(false);
    expect(manager.getMaxRowSpan()).toBe(1);
  });

  it("returns one when every merge key is unique", () => {
    const manager = new CellSpanManager<Row>();
    const rules: RendererRules<Row> = { mergeRow: "group" };

    expect(manager.saveRowSpan({ group: "a" }, rules)).toBe(false);
    expect(manager.saveRowSpan({ group: "b" }, rules)).toBe(false);
    expect(manager.getMaxRowSpan()).toBe(1);
  });

  it("tracks the largest group even when a smaller group is saved last", () => {
    const manager = new CellSpanManager<Row>();
    const rules: RendererRules<Row> = { mergeRow: "group" };

    for (const group of ["a", "a", "a", "b", "b"]) {
      manager.saveRowSpan({ group }, rules);
    }

    expect(manager.getMaxRowSpan()).toBe(3);
    expect(manager.getRowSpan({ group: "a" }, rules)).toBe(3);
    expect(manager.getRowSpan({ group: "b" }, rules)).toBe(2);

    manager.saveRowSpan({ group: "b" }, rules);
    manager.saveRowSpan({ group: "b" }, rules);

    expect(manager.getMaxRowSpan()).toBe(4);
    expect(manager.getMaxRowSpan()).toBe(4);
    expect(manager.getRowSpan({ group: "a" }, rules)).toBe(3);
    expect(manager.getRowSpan({ group: "b" }, rules)).toBe(4);
  });

  const mergeRules: Array<[string, RendererRules<Row>]> = [
    ["accessor", { mergeRow: "group" }],
    ["accessor array", { mergeRow: ["group"] }],
    ["callback", { mergeRow: (row) => row.group }],
  ];

  it.each(mergeRules)("preserves duplicate detection with the %s rule", (_, rules) => {
    const manager = new CellSpanManager<Row>();

    expect(manager.saveRowSpan({ group: "a" }, rules)).toBe(false);
    expect(manager.getMaxRowSpan()).toBe(1);
    expect(manager.saveRowSpan({ group: "a" }, rules)).toBe(true);
    expect(manager.getMaxRowSpan()).toBe(2);
    expect(manager.saveRowSpan({ group: "a" }, rules)).toBe(true);
    expect(manager.getMaxRowSpan()).toBe(3);
    expect(manager.getRowSpan({ group: "a" }, rules)).toBe(3);
  });

  it("supports more groups than can be passed as function arguments", () => {
    const manager = new CellSpanManager<Row>();
    const rules: RendererRules<Row> = { mergeRow: "group" };

    for (let index = 0; index < 200_000; index++) {
      manager.saveRowSpan({ group: String(index) }, rules);
    }

    expect(manager.getMaxRowSpan()).toBe(1);
    manager.saveRowSpan({ group: "0" }, rules);
    expect(manager.getMaxRowSpan()).toBe(2);
  });
});
