import { useLocation, useNavigate, useViewTransitionState } from "react-router";
import { BackIcon } from "../icons/BackIcon";
import { SettingsIcon } from "../icons/SettingsIcon";
import "./EditPage.css";
import { Tag } from "./tags/Tag";
import { EditorToolbar } from "./editor-toolbar/EditorToolbar";
import { Annotation, type AnnotationPosition } from "./annotation/Annotation";
import React from "react";

export function EditPage() {
  const [annotations, setAnnotations] = React.useState<Annotation[]>([
    {
      id: "1",
      text: `I like the simple squares that blend into the more detailed image as you look rightwards`,
      position: {
        top: 200,
        left: 300,
      },
    },
    {
      id: "2",
      text: `I like the simple squares that blend into the more detailed image as you look rightwards`,
      position: {
        top: 500,
        left: 500,
      },
    },
    {
      id: "3",
      text: `I like the simple squares that blend into the more detailed image as you look rightwards`,
      position: {
        top: 250,
        left: 600,
      },
    },
  ]);
  const [isViewingAnnotations, setIsViewingAnnotations] =
    React.useState<boolean>(true);
  const [isAddingModeOn, setIsAddingModeOn] = React.useState<boolean>(true);

  const toggleAddingMode = () => setIsAddingModeOn((prev) => !prev);
  const toggleAnnotationView = () => setIsViewingAnnotations((prev) => !prev);

  const moveAnnotation = (id: string, position: AnnotationPosition) => {
    setAnnotations((prev) =>
      prev.map((annotation) =>
        annotation.id === id ? { ...annotation, position } : annotation,
      ),
    );
  };

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
        <div className="annotate-image">
          <EditorToolbar
            toggleAddingMode={toggleAddingMode}
            toggleAnnotationView={toggleAnnotationView}
            isViewingAnnotations={isViewingAnnotations}
          />
          {annotations.map((annotation) => (
            <Annotation
              key={annotation.id}
              annotation={annotation}
              onMove={(position) => moveAnnotation(annotation.id, position)}
            />
          ))}
          <img
            className="image"
            src="/image.png"
            onClick={
              isAddingModeOn
                ? (e) =>
                    setAnnotations((prev) => {
                      const lastId = Number(prev[prev.length - 1].id);
                      return [
                        ...prev,
                        {
                          id: `${lastId + 1}`,
                          text: `I like this because...`,
                          position: {
                            top: e.clientY,
                            left: e.clientX - 85,
                          },
                        },
                      ];
                    })
                : () => {}
            }
          />
        </div>
        <div className="image-info">
          <span className="image-title">
            Inspiration for the grid/terminal UI aesthetic - PyCharm Version
            2026.2
          </span>
          <p className="image-description">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo,
              deleniti quidem ipsa atque iste praesentium quo autem natus quam?
              Similique ab deserunt architecto adipisci esse quasi error sed
              consequuntur a. Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Pariatur ut quisquam distinctio! Atque quas repudiandae
              accusamus, possimus minima nisi repellat eveniet est laborum natus
              error provident dicta consequatur doloribus sit. Lorem ipsum,
              dolor sit amet consectetur adipisicing elit. Ipsa, quis saepe
              voluptas non alias quo ab eveniet maxime porro quibusdam, fugiat
              necessitatibus amet, consequuntur fugit excepturi veniam suscipit
              unde est. Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Commodi, nisi. Quae ea hic quibusdam fugit doloremque maiores
              nesciunt maxime corporis, saepe aliquid voluptatibus consectetur
              tenetur alias repellat quo at suscipit. Lorem ipsum dolor sit amet
              consectetur, adipisicing elit. Possimus iusto rerum eveniet
              explicabo quaerat omnis excepturi soluta neque, enim similique
              sapiente atque sed reprehenderit alias nesciunt placeat at ut ad.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
              cumque in nihil vero harum. Sunt blanditiis aperiam dolorem atque
              distinctio sint, consequuntur dolorum perspiciatis ipsa,
              exercitationem similique impedit facere doloribus.
            </p>
            <div className="image-desc-tags">
              {["Pixelated", "Techy", "Green", "Grids", "Squares"].map(
                (tag, index) => (
                  <Tag
                    tagName={tag}
                    key={index}
                    style={{ "--i": index } as React.CSSProperties}
                  />
                ),
              )}
            </div>
          </p>
        </div>
      </div>
    </div>
  );
}
