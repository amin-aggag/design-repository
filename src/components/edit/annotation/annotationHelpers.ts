export type Point = { x: number; y: number };

/** x is the horizontal center and y is the top, as fractions of the rendered image. */
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
  annotation: HTMLElement,
): AnnotationPosition {
  const box = renderedBox(layer);
  if (box.width === 0 || box.height === 0) return dragStart.position;

  return clampInsideLayer(
    {
      x: dragStart.position.x + (pointer.x - dragStart.pointer.x) / box.width,
      y: dragStart.position.y + (pointer.y - dragStart.pointer.y) / box.height,
    },
    layer,
    annotation,
  );
}

/** Keeps the whole annotation inside the image. x is its horizontal center, y its top. */
export function clampInsideLayer(
  position: AnnotationPosition,
  layer: HTMLElement,
  annotation: HTMLElement,
): AnnotationPosition {
  const box = renderedBox(layer);
  const { offsetWidth: width, offsetHeight: height } = annotation;
  if (box.width === 0 || box.height === 0 || width === 0 || height === 0) return position;

  const xInset = width / 2 / box.width;
  const yLimit = height / box.height;

  return {
    x: clamp(position.x, Math.min(xInset, 0.5), Math.max(1 - xInset, 0.5)),
    y: clamp(position.y, 0, Math.max(1 - yLimit, 0)),
  };
}

export function positionedParent(element: HTMLElement) {
  const parent = element.offsetParent;
  return parent instanceof HTMLElement ? parent : null;
}

export function fitHeightToContent(textarea: HTMLTextAreaElement) {
  const { paddingTop, paddingBottom } = getComputedStyle(textarea);
  textarea.style.height = "auto";
  textarea.style.height = `${textarea.scrollHeight - parseFloat(paddingTop) - parseFloat(paddingBottom)}px`;
}
