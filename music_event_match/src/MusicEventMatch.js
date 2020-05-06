import React from "react";
import Search from "./Search";
import SearchResult from "./SearchResult";
import logo from "./skblackbadge.png";
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
      <div className="root">
        <header>
          <img className="header-logo" src={logo} alt="songkick-logo"></img>
          MUSIC EVENT MATCH
        </header>

        <Search
          onSearchResults={this.handleSearchResults}
          onLocationSearch={this.handleLocationSearch}
        />

        <SearchResult results={this.state.searchResults} />

        <button className="reset">Take Me Back</button>
      </div>
    );
  }
}

export default MusicEventMatch;
