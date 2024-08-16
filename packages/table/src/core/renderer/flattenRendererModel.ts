import type { RendererModel } from "../../types/table";

export function flattenRendererModel<Row>(rendererModel: RendererModel<Row>): RendererModel<Row> {
  const models: RendererModel<Row> = [];

  for (const model of rendererModel) {
    const { accessor } = model;
    const hasChild = Array.isArray(accessor);

    if (hasChild) {
      models.push(...flattenRendererModel(accessor));
    } else {
      models.push(model);
    }
  }

  return models;
}
