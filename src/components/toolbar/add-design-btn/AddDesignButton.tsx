import { PlusIcon } from "../../icons/PlusIcon";
import "./addDesignButton.css";

export function AddDesignButton() {
    return (
        <button className="add-design-btn">
            <div style={{ height: "32px", width: "32px", margin: "auto" }}>
                <PlusIcon />
            </div>
        </button>
    )
}