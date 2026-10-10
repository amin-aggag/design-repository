import "./searchHistory.css";
import { useSearch } from "../search-context/searchContext";
import { HistoryIcon } from "../../icons/HistoryIcon";
import { ChevronUpIcon } from "../../icons/ChevronUpIcon";

const exampleHistory = [
  "smooth orange micro-interaction",
  "pixelated wave background",
  "sandstone Islamic architecture",
];

export function SearchHistory() {
  const { isSearching, setSearchQuery } = useSearch();

  return (
    <div className={`search-history-hover-zone ${isSearching ? "is-searching" : ""}`}>
      <div className={`up-icon-wrapper ${isSearching ? "is-searching" : ""}`}>
        <HistoryIcon />
      </div>
      <div className="search-history">
        <div className="search-history-list">
          {exampleHistory.map((query) => (
            <div
              key={query}
              className="search-history-item"
              // keeps focus in the search input
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setSearchQuery(query)}
            >
              <p>{query}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
