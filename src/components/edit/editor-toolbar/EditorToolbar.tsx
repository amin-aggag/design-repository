import { AddAnnotationIcon } from "../../icons/AddAnnotationIcon";
import { EyeClosedIcon } from "../../icons/EyeClosedIcon";
import { EyeOpenIcon } from "../../icons/EyeOpenIcon";
import "./editorToolbar.css";

type EditorToolbarProps = {
  toggleAddingMode: () => void;
  toggleAnnotationView: () => void;
    isViewingAnnotations: boolean;
    isAddingAnnotations: boolean;
};

export function EditorToolbar({
  toggleAddingMode,
  toggleAnnotationView,
    isViewingAnnotations,
  isAddingAnnotations
}: EditorToolbarProps) {
  return (
    <div className="editor-toolbar">
          <div className={`toolbar-icon ${isAddingAnnotations ? "selected" : ""}`} onClick={toggleAddingMode}>
        <AddAnnotationIcon />
      </div>
      <div className="toolbar-icon" onClick={toggleAnnotationView}>
        {isViewingAnnotations ? <EyeClosedIcon /> : <EyeOpenIcon />}
      </div>
    </div>
  );
}
