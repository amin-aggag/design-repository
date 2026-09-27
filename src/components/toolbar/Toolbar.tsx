import { AddDesignButton } from "./add-design-btn/AddDesignButton";
import { Searchbar } from "./searchbar/Searchbar";
import "./toolbar.css";

export function Toolbar() {
    return (
        <div className="toolbar">
            <Searchbar />
            <AddDesignButton/>
        </div>
    )
}