import React from "react";
import SearchResultDetails from "./SearchResultDetails";

class SearchResult extends React.Component {
  render() {
    if (!this.props.results) {
      return null;
    } else if (this.props.results.empty) {
      return <h2>{this.props.results.empty}</h2>;
    }
    return (
      <div className="container">
        <ul>
          {this.props.results.map(event => (
            <li className="event-card" key={event.id}>
              <SearchResultDetails event={event} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default SearchResult;
