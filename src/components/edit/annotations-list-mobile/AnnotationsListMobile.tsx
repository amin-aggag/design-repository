import type { Annotation } from "../annotation/Annotation";
import "./annotationsListMobile.css";

type AnnotationsListMobileProps = {
  annotationsList: Annotation[];
  updateAnnotationText: (id: string, text: string) => void;
  setActiveAnnotationId: (id: string | null) => void;
};

export function AnnotationsListMobile({
  annotationsList,
  updateAnnotationText,
  setActiveAnnotationId,
}: AnnotationsListMobileProps) {
  return (
    <div className="annotations-list-mobile">
      {annotationsList.map((annotation) => (
        <textarea
          key={annotation.id}
          className="annotation-mobile-list-item"
          value={annotation.text}
          onChange={(event) =>
            updateAnnotationText(annotation.id, event.target.value)
          }
          onFocus={() => setActiveAnnotationId(annotation.id)}
          onBlur={() => setActiveAnnotationId(null)}
        />
      ))}
    </div>
  );
}
