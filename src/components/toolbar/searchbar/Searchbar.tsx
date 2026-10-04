import React from "react";
import { SearchIcon } from "../../icons/SearchIcon";
import "./searchbar.css";
import { Kbd } from "../kbd/Kbd";

export function Searchbar() {
  const [isSearching, setIsSearching] = React.useState<boolean>(false);

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
  }, []);

  React.useEffect(() => {
    if (!isSearching) return;

    const onEscPress = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsSearching(false);
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      if (!searchbarRef.current?.contains(e.target as Node)) {
        e.preventDefault();
        setIsSearching(false);
      }
    };

    document.addEventListener("keydown", onEscPress);
    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      document.removeEventListener("keydown", onEscPress);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [isSearching]);

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
