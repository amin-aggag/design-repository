import React from "react";
import "./searchHistory.css";

export function SearchHistory({ isSearching }: { isSearching: boolean }) {
  const searchHistoryRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const searchHistoryEl = searchHistoryRef.current;
    const handleMouseEnter = () => {
      if (searchHistoryEl) {
        searchHistoryEl.style.height = "auto";

        if (window.innerWidth <= 850) {
          searchHistoryEl.style.bottom = "72px";
        } else if (window.innerWidth > 850) {
          searchHistoryEl.style.bottom = "56px";
        }
      }
    };

    const handleMouseLeave = () => {
      if (searchHistoryEl) {
        searchHistoryEl.style.height = "15px";

        if (window.innerWidth <= 850) {
          searchHistoryEl.style.bottom = "calc(72px - 3.5 * 8px)";
        } else if (window.innerWidth > 850) {
          searchHistoryEl.style.bottom = "calc(56px - 3.5 * 8px)";
        }
      }
    };

    searchHistoryRef.current?.addEventListener("mouseenter", handleMouseEnter);
    searchHistoryRef.current?.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (searchHistoryEl) {
        searchHistoryEl.removeEventListener("mouseenter", handleMouseEnter);
        searchHistoryEl.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  if (!isSearching) return;

  return (
    <div className="search-history" ref={searchHistoryRef}>
      <div className="search-history-item">
        <p>smooth orange micro-interaction</p>
      </div>
      <div className="search-history-item">
        <p>pixelated wave background</p>
      </div>
      <div className="search-history-item">
        <p>sandstone Islamic architecture</p>
      </div>
    </div>
  );
}
