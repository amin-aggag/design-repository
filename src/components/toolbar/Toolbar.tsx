import { AddDesignButton } from "./add-design-btn/AddDesignButton";
import { SearchProvider } from "./search-context/SearchProvider";
import { SearchHistory } from "./search-history/SearchHistory";
import { Searchbar } from "./searchbar/Searchbar";
import "./toolbar.css";

export function Toolbar() {
    return (
        <SearchProvider>
            <div className="toolbar">
                <Searchbar />
                <AddDesignButton />
                <SearchHistory />
            </div>
        </SearchProvider>
    )
}
