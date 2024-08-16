import type { RendererModel } from "../../types/table";

export function getLargestDepth<Row>(rendererModel: RendererModel<Row>): number {
  return rendererModel.reduce((acc, { accessor }) => {
    return Array.isArray(accessor) ? getLargestDepth(accessor) + 1 : acc;
  }, 1);
}
