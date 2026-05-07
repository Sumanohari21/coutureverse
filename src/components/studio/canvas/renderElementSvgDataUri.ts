import type { StudioElement } from "../state/types";
import { templates } from "../data/catalog";

export function renderElementSvgDataUri(el: StudioElement) {
  const t = templates.find((x) => x.id === el.templateId);
  const fill = el.fabricCustomization.color.primary;
  if (!t) {
    // Fallback: transparent placeholder.
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'></svg>`
    )}`;
  }

  const svg = t.svg(fill);
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

