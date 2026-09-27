import { SearchIcon } from "../../icons/SearchIcon";
import "./searchbar.css";

export function Searchbar() {
    return (
        <div className="searchbar">
            <div className="search-icon">
                <SearchIcon/>
            </div>
            <span className="search-text">Search</span>
        </div>
    )
}