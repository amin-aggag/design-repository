import { useLayoutEffect, useRef } from "react";
import type { RefObject } from "react";
import {
  clampInsideLayer,
  positionedParent,
  type AnnotationPosition,
} from "./annotationHelpers";

export function useClampAnnotationPin(
  annotationRef: RefObject<HTMLDivElement | null>,
  position: AnnotationPosition,
  onMove: (position: AnnotationPosition) => void,
  isVisible: boolean,
) {
  const positionRef = useRef(position);
  const onMoveRef = useRef(onMove);

  useLayoutEffect(() => {
    positionRef.current = position;
    onMoveRef.current = onMove;

    const annotation = annotationRef.current;
    const layer = annotation && positionedParent(annotation);
    if (!annotation || !layer) return;

    const pullInside = () => {
      const current = positionRef.current;
      const next = clampInsideLayer(current, layer, annotation);
      if (next.x === current.x && next.y === current.y) return;
      onMoveRef.current(next);
    };

    pullInside();
    const observer = new ResizeObserver(pullInside);
    observer.observe(layer);
    observer.observe(annotation);
    return () => observer.disconnect();
  }, [annotationRef, isVisible, position, onMove]);
}
