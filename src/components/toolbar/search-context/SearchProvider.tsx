import React from "react";
import { SearchContext } from "./searchContext";

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [isSearching, setIsSearching] = React.useState<boolean>(false);

  return (
    <SearchContext.Provider value={{ isSearching, setIsSearching }}>
      {children}
    </SearchContext.Provider>
  );
}
