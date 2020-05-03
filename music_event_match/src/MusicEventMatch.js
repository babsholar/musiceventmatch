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

    this.handleSearchResults = this.handleSearchResults.bind(this);
  }

  handleSearchResults(searchResults) {
    this.setState({
      searchResults: searchResults
    });
  }

  render() {
    return (
      <div>
        <Search
          onSearchResults={this.handleSearchResults}
          onLocationSearch={this.handleLocationSearch}
        />
        <SearchResult results={this.state.searchResults} />
        <button>Reset</button>
      </div>
    );
  }
}

export default MusicEventMatch;
