import { describe, expect, it } from "vitest";

import parseDate from "./parseDate";

describe("parseDate util function", () => {
  it("return correct year, month, day", () => {
    // Given
    // When
    const result1 = parseDate(new Date("2020-12-27"));
    const result2 = parseDate(new Date(2020, 11, 27));

    // Then
    expect(result1.year).toBe(2020);
    expect(result1.month).toBe(11);
    expect(result1.day).toBe(27);
    expect(result2.year).toBe(2020);
    expect(result2.month).toBe(11);
    expect(result2.day).toBe(27);
  });
});
