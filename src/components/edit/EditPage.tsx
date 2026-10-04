import { useLocation, useNavigate } from "react-router";
import { BackIcon } from "../icons/BackIcon";
import { SettingsIcon } from "../icons/SettingsIcon";
import "./EditPage.css";
import { Tag } from "./tags/Tag";

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
          <img className="image" src="/image.png" />
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
              consequuntur a.
            </p>
            <div className="image-desc-tags">
              {["Pixelated", "Techy", "Green", "Grids", "Squares"].map((tag, index) => (
                <Tag tagName={tag} key={index} style={{ "--i": index } as React.CSSProperties} />
              ))}
            </div>
          </p>
        </div>
      </div>
    </div>
  );
}
