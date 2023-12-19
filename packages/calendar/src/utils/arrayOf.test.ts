import { describe, expect, it } from "vitest";

import arrayOf from "./arrayOf";

describe("arrayOf function", () => {
  it("return array that length 7", () => {
    // Given
    // When
    const result = arrayOf(7);
    // Then
    expect(result.length).toEqual(7);
    expect(result).toEqual([0, 1, 2, 3, 4, 5, 6]);
  });
});
