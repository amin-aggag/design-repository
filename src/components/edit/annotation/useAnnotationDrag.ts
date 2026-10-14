import { useRef } from "react";
import type { PointerEvent } from "react";
import {
  positionAfterDrag,
  positionedParent,
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
    const annotation = positionedParent(event.currentTarget);
    const layer = annotation && positionedParent(annotation);
    if (!dragStart || !annotation || !layer) return;

    onMove(
      positionAfterDrag(
        dragStart,
        { x: event.clientX, y: event.clientY },
        layer,
        annotation,
      ),
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
