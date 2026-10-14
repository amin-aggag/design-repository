export type Point = { x: number; y: number };

/** Handle pin as a fraction of the image's on-screen box, from its top-left. */
export type AnnotationPosition = {
  x: number;
  y: number;
};

type DragStart = { pointer: Point; position: AnnotationPosition };

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function renderedBox(element: HTMLElement) {
  const { width, height, left, top } = element.getBoundingClientRect();
  return { width, height, left, top };
}

export function positionInLayer(pointer: Point, layer: HTMLElement): AnnotationPosition {
  const box = renderedBox(layer);
  if (box.width === 0 || box.height === 0) return { x: 0, y: 0 };

  return {
    x: clamp((pointer.x - box.left) / box.width, 0, 1),
    y: clamp((pointer.y - box.top) / box.height, 0, 1),
  };
}

export function positionAfterDrag(
  dragStart: DragStart,
  pointer: Point,
  layer: HTMLElement,
): AnnotationPosition {
  const box = renderedBox(layer);
  if (box.width === 0 || box.height === 0) return dragStart.position;

  return {
    x: clamp(dragStart.position.x + (pointer.x - dragStart.pointer.x) / box.width, 0, 1),
    y: clamp(dragStart.position.y + (pointer.y - dragStart.pointer.y) / box.height, 0, 1),
  };
}

export function annotationLayer(handle: HTMLElement) {
  const annotation = handle.offsetParent;
  if (!(annotation instanceof HTMLElement)) return null;

  const layer = annotation.offsetParent;
  return layer instanceof HTMLElement ? layer : null;
}

export function fitHeightToContent(textarea: HTMLTextAreaElement) {
  const { paddingTop, paddingBottom } = getComputedStyle(textarea);
  textarea.style.height = "auto";
  textarea.style.height = `${textarea.scrollHeight - parseFloat(paddingTop) - parseFloat(paddingBottom)}px`;
}
