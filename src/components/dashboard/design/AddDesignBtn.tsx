import { useNavigate } from "react-router";
import { PlusIcon } from "../../icons/PlusIcon";
import "./addDesignBtn.css";

export function AddDesignButton() {
  const navigate = useNavigate();
  return (
    <div className="add-new-design" onClick={() => navigate("/edit")}>
      <div className="plus-icon">
        <PlusIcon />
      </div>
      <div className="design-name">
        <h4>Add new design</h4>
      </div>
    </div>
  );
}
