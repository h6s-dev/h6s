import { renderHook } from "@testing-library/react-hooks";
import { describe, expect, it } from "vitest";

import useIsMounted from "./useIsMounted";

describe("useIsMounted hooks test", () => {
  it("return true after component mount", () => {
    // Given
    // When
    const { result } = renderHook(() => useIsMounted());
    // Then
    expect(result.current).toBeTruthy();
  });
});
