import "./annotation.css";

export function Annotation() {
  return (
    <div className="annotation">
      <textarea
        id="name"
        name="name"
        required
        className="search-input"
        defaultValue={`I like the simple squares that blend into the more detailed image as you look rightwards"`}
        autoFocus
      />
    </div>
  );
}
