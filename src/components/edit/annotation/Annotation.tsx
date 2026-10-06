import { useRef } from "react";
import type { PointerEvent } from "react";
import "./annotation.css";
import { GripHorizontalIcon } from "../../icons/GripHorizontalIcon";

type Point = { x: number; y: number };

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getMaxPosition(annotation: HTMLElement | null) {
  const container = annotation?.offsetParent as HTMLElement | null;
  if (!annotation || !container) {
    return { maxTop: Infinity, maxLeft: Infinity };
  }

  return {
    maxTop: Math.max(container.clientHeight - annotation.offsetHeight, 0),
    maxLeft: Math.max(container.clientWidth - annotation.offsetWidth, 0),
  };
}

export type AnnotationPosition = {
  top: number;
  left: number;
};

export type Annotation = {
  id: string;
  text: string;
  position: AnnotationPosition;
};

type AnnotationProps = {
  annotation: Annotation;
  onMove: (position: AnnotationPosition) => void;
};

type DragStart = { pointer: Point; position: AnnotationPosition };

export function Annotation({ annotation, onMove }: AnnotationProps) {
  const annotationRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<DragStart | null>(null);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    dragStartRef.current = {
      pointer: { x: event.clientX, y: event.clientY },
      position: annotation.position,
    };
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const dragStart = dragStartRef.current;
    if (!dragStart) return;

    const deltaX = event.clientX - dragStart.pointer.x;
    const deltaY = event.clientY - dragStart.pointer.y;

    const { maxTop, maxLeft } = getMaxPosition(annotationRef.current);
    onMove({
      top: clamp(dragStart.position.top + deltaY, 0, maxTop),
      left: clamp(dragStart.position.left + deltaX, 0, maxLeft),
    });
  };

  const handlePointerEnd = () => {
    dragStartRef.current = null;
  };

  return (
    <div
      className="annotation"
      ref={annotationRef}
      style={{ top: annotation.position.top, left: annotation.position.left }}
    >
      <div
        className="annotation-handle"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
      >
        <GripHorizontalIcon />
      </div>
      <textarea className="search-input" defaultValue={annotation.text} />
    </div>
  );
}
