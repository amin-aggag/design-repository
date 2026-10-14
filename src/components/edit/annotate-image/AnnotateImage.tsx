import React from "react";
import {
  Annotation,
  type Annotation as AnnotationData,
  type AnnotationPosition,
} from "../annotation/Annotation";
import { positionInLayer } from "../annotation/annotationHelpers";
import { EditorToolbar } from "../editor-toolbar/EditorToolbar";
import "./annotateImage.css";
import { useTabletOrMobileQuery } from "../../utils/useTabletOrMobileQuery";

type AnnotateImageProps = {
  annotations: AnnotationData[];
  setAnnotations: React.Dispatch<React.SetStateAction<AnnotationData[]>>;
  isViewingAnnotations: boolean;
  toggleAnnotationView: () => void;
  activeAnnotationId: string | null;
};

export function AnnotateImage({
  annotations,
  setAnnotations,
  isViewingAnnotations,
  toggleAnnotationView,
  activeAnnotationId,
}: AnnotateImageProps) {
  const [isAddingModeOn, setIsAddingModeOn] = React.useState<boolean>(false);

  const isWindowSizeTabletOrMobile = useTabletOrMobileQuery();

  const annotationLayerRef = React.useRef<HTMLDivElement>(null);

  const toggleAddingMode = () => setIsAddingModeOn((prev) => !prev);

  const moveAnnotation = (id: string, position: AnnotationPosition) => {
    setAnnotations((prev) =>
      prev.map((annotation) =>
        annotation.id === id ? { ...annotation, position } : annotation,
      ),
    );
  };

  const addAnnotation = (event: React.MouseEvent<HTMLImageElement>) => {
    const layer = annotationLayerRef.current;
    if (!layer) return;

    const position = positionInLayer(
      { x: event.clientX, y: event.clientY },
      layer,
    );

    setAnnotations((prev) => {
      const lastId = Number(prev.at(-1)?.id ?? 0);
      return [
        ...prev,
        {
          id: `${lastId + 1}`,
          text: `I like this because...`,
          position,
        },
      ];
    });
  };

  return (
    <div className="annotate-image">
      <EditorToolbar
        toggleAddingMode={toggleAddingMode}
        toggleAnnotationView={toggleAnnotationView}
        isViewingAnnotations={isViewingAnnotations}
        isAddingAnnotations={isAddingModeOn}
      />
      <div className="image-stage">
        <div className="image-frame">
          <img
            className="image"
            src="/image.png"
            onClick={isAddingModeOn ? addAnnotation : undefined}
          />
          <div className="annotation-layer" ref={annotationLayerRef}>
            {annotations.map((annotation) => (
              <Annotation
                key={annotation.id}
                annotation={annotation}
                onMove={(position) => moveAnnotation(annotation.id, position)}
                isVisible={isViewingAnnotations}
                isWindowSizeTabletOrMobile={isWindowSizeTabletOrMobile}
                isActive={annotation.id === activeAnnotationId}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
