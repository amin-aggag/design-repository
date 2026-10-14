import React from "react";
import { Tag } from "../tags/Tag";
import "./imageInfo.css";

const TAGS = ["Pixelated", "Techy", "Green", "Grids", "Squares"];

export function ImageInfo() {
  const [isEditingTitle, setIsEditingTitle] = React.useState<boolean>(false);
  const [isEditingDescription, setIsEditingDescription] =
    React.useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- tag adding is not wired up yet
  const [isAddingTags, setIsAddingTags] = React.useState<boolean>(false);
  const [title, setTitle] = React.useState(
    "Inspiration for the grid/terminal UI aesthetic - PyCharm Version 2026.2",
  );
  const [description, setDescription] = React.useState(
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, deleniti quidem ipsa atque iste praesentium quo autem natus quam? Similique ab deserunt architecto adipisci esse quasi error sed consequuntur a. Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur ut quisquam distinctio! Atque quas repudiandae accusamus, possimus minima nisi repellat eveniet est laborum natus error provident dicta consequatur doloribus sit. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa, quis saepe voluptas non alias quo ab eveniet maxime porro quibusdam, fugiat necessitatibus amet, consequuntur fugit excepturi veniam suscipit unde est. Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, nisi. Quae ea hic quibusdam fugit doloremque maiores nesciunt maxime corporis, saepe aliquid voluptatibus consectetur tenetur alias repellat quo at suscipit. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus iusto rerum eveniet explicabo quaerat omnis excepturi soluta neque, enim similique sapiente atque sed reprehenderit alias nesciunt placeat at ut ad. Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus cumque in nihil vero harum. Sunt blanditiis aperiam dolorem atque distinctio sint, consequuntur dolorum perspiciatis ipsa, exercitationem similique impedit facere doloribus.",
  );

  const titleRef = React.useRef<HTMLTextAreaElement>(null);
  const descriptionRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    if (!isEditingTitle && !isEditingDescription) return;

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (isEditingTitle && !titleRef.current?.contains(target)) {
        setIsEditingTitle(false);
      }
      if (isEditingDescription && !descriptionRef.current?.contains(target)) {
        setIsEditingDescription(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsEditingTitle(false);
        setIsEditingDescription(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isEditingTitle, isEditingDescription]);

  return (
    <div className="image-info">
      <textarea
        ref={titleRef}
        className="image-title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <div
        className={`image-description${isEditingDescription ? " is-editing" : ""}`}
      >
        <div className="image-desc-tags">
          {TAGS.map((tag, index) => (
            <Tag
              tagName={tag}
              key={index}
              style={{ "--i": index } as React.CSSProperties}
            />
          ))}
        </div>
        <textarea
          ref={descriptionRef}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </div>
    </div>
  );
}
