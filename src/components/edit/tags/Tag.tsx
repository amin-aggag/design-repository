import "./tag.css";
import type { CSSProperties } from "react";

export function Tag({tagName, style }: {tagName: string, style: CSSProperties}) {
    return (
        <div className="tag" style={style}>
            {tagName}
        </div>
    )
}