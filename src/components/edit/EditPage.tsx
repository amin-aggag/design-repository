import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { BackIcon } from "../icons/BackIcon";
import { SettingsIcon } from "../icons/SettingsIcon";
import { AnnotateImage } from "./annotate-image/AnnotateImage";
import { ImageInfo } from "./image-info/ImageInfo";
import "./EditPage.css";
import { useTabletOrMobileQuery } from "../utils/useTabletOrMobileQuery";
import { AnnotationsListMobile } from "./annotations-list-mobile/AnnotationsListMobile";
import type { Annotation } from "./annotation/Annotation";

const annotationsListSample = [
  {
    id: "1",
    text: `I like the simple squares that blend into the more detailed image as you look rightwards`,
    position: { x: 0.32, y: 0.25 },
  },
  {
    id: "2",
    text: `I like the simple squares that blend into the more detailed image as you look rightwards`,
    position: { x: 0.47, y: 0.63 },
  },
  {
    id: "3",
    text: `I like the simple squares that blend into the more detailed image as you look rightwards`,
    position: { x: 0.54, y: 0.32 },
  },
];

export function EditPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    const root = document.documentElement;
    root.style.setProperty("--start-radius", "0px");
    root.style.setProperty("--end-radius", "8px");

    if (location.key === "default") {
      navigate("/", { viewTransition: true });
    } else {
      navigate(-1);
    }
  };

  const isWindowSizeTabletOrMobile = useTabletOrMobileQuery();
  const [isViewingAnnotations, setIsViewingAnnotations] = useState(true);
  const toggleAnnotationView = () => setIsViewingAnnotations((prev) => !prev);
  const [annotations, setAnnotations] = useState<Annotation[]>(annotationsListSample);
  const [activeAnnotationId, setActiveAnnotationId] = useState<string | null>(null);

  const updateAnnotationText = (id: string, text: string) => {
    setAnnotations((prev) =>
      prev.map((annotation) =>
        annotation.id === id ? { ...annotation, text } : annotation,
      ),
    );
  };

  return (
    <div className="edit-page">
      <div className="edit-page-nav">
        <button className="back-button" onClick={handleBack}>
          <BackIcon />
          <span>Back</span>
        </button>
        <button className="settings-icon">
          <SettingsIcon />
        </button>
      </div>
      <div className="edit-page-content">
        <AnnotateImage
          annotations={annotations}
          setAnnotations={setAnnotations}
          isViewingAnnotations={isViewingAnnotations}
          toggleAnnotationView={toggleAnnotationView}
          activeAnnotationId={activeAnnotationId}
        />
        {isWindowSizeTabletOrMobile && isViewingAnnotations && (
          <AnnotationsListMobile
            annotationsList={annotations}
            updateAnnotationText={updateAnnotationText}
            setActiveAnnotationId={setActiveAnnotationId}
          />
        )}
        {/* <ImageInfo /> */}
      </div>
    </div>
  );
}
