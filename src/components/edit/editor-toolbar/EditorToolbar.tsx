import { AddAnnotationIcon } from "../../icons/AddAnnotationIcon";
import { EyeClosedIcon } from "../../icons/EyeClosedIcon";
import "./editorToolbar.css";

export function EditorToolbar() {
    return (
        <div className="editor-toolbar">
            <div className="toolbar-icon">
                <AddAnnotationIcon />
            </div>
            <div className="toolbar-icon">
                <EyeClosedIcon/>
            </div>

            
        </div>
    )
}