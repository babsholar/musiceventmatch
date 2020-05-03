import React from "react";
import Search from "./Search";
import SearchResult from "./SearchResult";
import "./MusicEventMatch.css";

class MusicEventMatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: undefined
    };
  }

  render() {
    return (
      <div>
        <Search />
        <SearchResult results={this.state.searchResults} />
        <button>Reset</button>
      </div>
    );
  }
}

export default MusicEventMatch;
