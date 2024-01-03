import React, { useEffect, useRef, useState } from "react";

import { FILTERS } from "../utils/constants";

import "./Header.css";

const Header = ({ setSelectedFilterId, selectedFilterId, setSearchString }) => {
  const [isSearchIconClicked, setIsSearchIconClicked] = useState();
  const searchInputRef = useRef();

  useEffect(() => {
    if (isSearchIconClicked) searchInputRef.current.focus();
  }, [isSearchIconClicked]);

  return (
    <div className="header-container">
      <span className="site-name">moviefix</span>
      <div className="header-subContainer">
        <div className="filter-button-container">
          {FILTERS.map((data) => (
            <button
              className={`filter-button ${
                selectedFilterId === data.id ? "bg-red" : "bg-gray"
              }`}
              onClick={() => setSelectedFilterId(data.id)}
              key={data.id}
            >
              {data.name}
            </button>
          ))}
        </div>
        <div
          className="movie-search-container"
          onClick={() => setIsSearchIconClicked(true)}
        >
          <input
            type="text"
            placeholder="Search any movie"
            className={`movie-search-inputBox ${
              isSearchIconClicked ? "display-movie-search-inputBox" : ""
            } `}
            ref={searchInputRef}
            onChange={() => setSearchString(searchInputRef.current.value)}
            onBlur={() => {
              if (!searchInputRef.current.value) setIsSearchIconClicked(false);
            }}
          />
          {!isSearchIconClicked && (
            <div className="movie-search-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                data-name="MagnifyingGlass"
                aria-hidden="true"
                color="white"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10ZM15.6177 17.0319C14.078 18.2635 12.125 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10C19 12.125 18.2635 14.078 17.0319 15.6177L22.7071 21.2929L21.2929 22.7071L15.6177 17.0319Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
