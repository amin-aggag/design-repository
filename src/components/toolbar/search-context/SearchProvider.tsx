import React from "react";
import { SearchContext } from "./searchContext";

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [isSearching, setIsSearching] = React.useState<boolean>(false);
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  return (
    <SearchContext.Provider
      value={{ isSearching, setIsSearching, searchQuery, setSearchQuery }}
    >
      {children}
    </SearchContext.Provider>
  );
}
