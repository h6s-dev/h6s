import type { RendererModel } from "../../types/table";

export function getHeaderAccessorId<Row>(model: RendererModel<Row>[number]): string {
  return Array.isArray(model.accessor)
    ? model.accessor.map((model) => getHeaderAccessorId(model)).join("+")
    : model.accessor;
}
