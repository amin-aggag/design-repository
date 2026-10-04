import React from "react";
import { SearchIcon } from "../../icons/SearchIcon";
import "./searchbar.css";
import { Kbd } from "../kbd/Kbd";
import { useSearch } from "../search-context/searchContext";

export function Searchbar() {
  const { isSearching, setIsSearching, searchQuery, setSearchQuery } =
    useSearch();

  const searchbarRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const onCtrlKPress = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault(); // stops the browser's own Ctrl+K action (focusing the address/search bar)
        setIsSearching(true);
      }
    };

    window.addEventListener("keydown", onCtrlKPress);
    return () => window.removeEventListener("keydown", onCtrlKPress);
  }, [setIsSearching]);

  React.useEffect(() => {
    if (!isSearching) return;

    const onEscPress = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsSearching(false);
        setSearchQuery("");
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Element;
      if (
        !searchbarRef.current?.contains(target) &&
        !target.closest(".search-history-hover-zone")
      ) {
        e.preventDefault();
        setIsSearching(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("keydown", onEscPress);
    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      document.removeEventListener("keydown", onEscPress);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [isSearching, setIsSearching, setSearchQuery]);

  return (
    <div
      className={`searchbar ${isSearching ? "is-searching" : ""}`}
      onClick={() => setIsSearching(true)}
      ref={searchbarRef}
    >
      <div className="searchbar-content">
        <div className="search-icon">
          <SearchIcon />
        </div>
        {isSearching ? (
          <input
            type="text"
            id="name"
            name="name"
            required
            size={10}
            className="search-input"
            placeholder={`Try "smooth orange micro-interaction"`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
        ) : (
          <span className="search-text">Search</span>
        )}
      </div>
      <Kbd keyName={!isSearching ? "CTRL + K" : "ESC"} />
    </div>
  );
}
