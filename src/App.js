import { useState } from "react";

import Header from "./Components/Header";
import MovieList from "./Components/MovieList";

import "./App.css";

function App() {
  const [selectedFilterId, setSelectedFilterId] = useState("");
  const [searchString, setSearchString] = useState();
  return (
    <div className="app-container">
      <Header
        selectedFilterId={selectedFilterId}
        setSelectedFilterId={setSelectedFilterId}
        setSearchString={setSearchString}
      />
      <MovieList
        selectedFilterId={selectedFilterId}
        searchString={searchString}
      />
    </div>
  );
}

export default App;
