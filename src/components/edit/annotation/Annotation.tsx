import { useRef } from "react";
import type { CSSProperties } from "react";
import "./annotation.css";
import { GripHorizontalIcon } from "../../icons/GripHorizontalIcon";
import { fitHeightToContent, type AnnotationPosition } from "./annotationHelpers";
import { useAnnotationDrag } from "./useAnnotationDrag";
import { useFitAnnotationText } from "./useFitAnnotationText";
import { useParams, useViewTransitionState } from "react-router";

export type { AnnotationPosition };

export type Annotation = {
  id: string;
  text: string;
  position: AnnotationPosition;
};

type AnnotationProps = {
  annotation: Annotation;
  onMove: (position: AnnotationPosition) => void;
  isVisible: boolean;
  isWindowSizeTabletOrMobile: boolean;
  isActive: boolean;
};

function annotationClassName(isVisible: boolean, viewTransitionOccurring: boolean) {
  return [
    "annotation",
    isVisible ? "" : "hidden",
    viewTransitionOccurring ? "with-view-transition" : "",
  ]
    .filter(Boolean)
    .join(" ");
}

function pinStyle(position: AnnotationPosition): CSSProperties {
  return { "--x": position.x, "--y": position.y } as CSSProperties;
}

export function Annotation({
  annotation,
  onMove,
  isVisible,
  isWindowSizeTabletOrMobile,
  isActive,
}: AnnotationProps) {
  const { designId } = useParams();
  const viewTransitionOccurring = useViewTransitionState(`/edit/${designId}`);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dragHandlers = useAnnotationDrag(annotation.position, onMove);

  useFitAnnotationText(textareaRef, isVisible);

  return (
    <div
      className={annotationClassName(isVisible, viewTransitionOccurring)}
      style={pinStyle(annotation.position)}
    >
      <div
        className={`annotation-handle${isActive ? " is-active" : ""}`}
        {...dragHandlers}
      >
        <GripHorizontalIcon />
      </div>
      {!isWindowSizeTabletOrMobile && (
        <div className="annotation-body">
          <textarea
            className="search-input"
            ref={textareaRef}
            defaultValue={annotation.text}
            onInput={(event) => fitHeightToContent(event.currentTarget)}
          />
        </div>
      )}
    </div>
  );
}
