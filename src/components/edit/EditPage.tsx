import { useNavigate } from "react-router";
import { BackIcon } from "../icons/BackIcon";
import { SettingsIcon } from "../icons/SettingsIcon";
import "./EditPage.css";

export function EditPage() {
  const navigate = useNavigate();

  return (
    <div className="edit-page">
      <div className="edit-page-nav">
        <button className="back-button" onClick={() => navigate("/", { viewTransition: true })}>
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo,
            deleniti quidem ipsa atque iste praesentium quo autem natus quam?
            Similique ab deserunt architecto adipisci esse quasi error sed
            consequuntur a.
          </p>
        </div>
      </div>
    </div>
  );
}
