import "./searchHistory.css";

export function SearchHistory({ isSearching }: { isSearching: boolean }) {
  if (!isSearching) return;

  return (
    <div className="search-history-hover-zone">
      <div className="search-history">
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
    </div>
  );
}
