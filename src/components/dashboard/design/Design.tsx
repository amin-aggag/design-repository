import { useNavigate } from "react-router";
import "./Design.css";
import { useRef } from "react";

export function Design() {
  const navigate = useNavigate();

  const designElementRef = useRef<HTMLImageElement>(null);

  const handleOnClick: React.MouseEventHandler<HTMLDivElement> = () => {
    designElementRef.current!.style.viewTransitionName = "design-image";
    navigate("/edit", { viewTransition: true });
  };
  return (
    <div className="design" onClick={handleOnClick}>
      <img className="design-image" src="/image.png" ref={designElementRef} />
      <div className="design-name">
        <h4>Design</h4>
      </div>
    </div>
  );
}
