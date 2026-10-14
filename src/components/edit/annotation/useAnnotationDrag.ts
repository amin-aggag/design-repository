import { useRef } from "react";
import type { PointerEvent } from "react";
import {
  annotationLayer,
  positionAfterDrag,
  type AnnotationPosition,
  type Point,
} from "./annotationHelpers";

type DragStart = { pointer: Point; position: AnnotationPosition };

export function useAnnotationDrag(
  position: AnnotationPosition,
  onMove: (position: AnnotationPosition) => void,
) {
  const dragStartRef = useRef<DragStart | null>(null);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    dragStartRef.current = {
      pointer: { x: event.clientX, y: event.clientY },
      position,
    };
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const dragStart = dragStartRef.current;
    const layer = annotationLayer(event.currentTarget);
    if (!dragStart || !layer) return;

    onMove(
      positionAfterDrag(dragStart, { x: event.clientX, y: event.clientY }, layer),
    );
  };

  const onPointerEnd = () => {
    dragStartRef.current = null;
  };

  return {
    onPointerDown,
    onPointerMove,
    onPointerUp: onPointerEnd,
    onPointerCancel: onPointerEnd,
  };
}
