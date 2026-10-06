import { useLayoutEffect, useRef } from "react";
import type { PointerEvent } from "react";
import "./annotation.css";
import { GripHorizontalIcon } from "../../icons/GripHorizontalIcon";
import { clamp, fitHeightToContent, getMaxPosition } from "./annotationHelpers";
import { useViewTransitionState } from "react-router";

type Point = { x: number; y: number };

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
  const viewTransitionOccurring = useViewTransitionState("/edit");

  const annotationRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<DragStart | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    fitHeightToContent(textarea);
    document.fonts.ready.then(() => fitHeightToContent(textarea));
  }, []);

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
      className={`annotation ${viewTransitionOccurring ? "with-view-transition" : ""}`}
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
      <textarea
        className="search-input"
        ref={textareaRef}
        defaultValue={annotation.text}
        onInput={(event) => fitHeightToContent(event.currentTarget)}
      />
    </div>
  );
}
