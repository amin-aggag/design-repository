import "./searchHistory.css";
import { useSearch } from "../search-context/searchContext";
import { HistoryIcon } from "../../icons/HistoryIcon";

export function SearchHistory() {
  const { isSearching } = useSearch();

  if (!isSearching) return;

  return (
      <div className="search-history-hover-zone">
          <div className="search-history">
          <div className="history-icon">
            <HistoryIcon/>
              </div>
              <div className="search-history-list">
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
    </div>
  );
}
