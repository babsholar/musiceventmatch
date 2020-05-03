import React from "react";

class SearchResultDetails extends React.Component {
  render() {
    return (
      <div>
        <h2>{this.props.event.displayName}</h2>
        <h3>{this.props.event.type}</h3>
        <a href={this.props.event.uri}>See it on songkick!</a>
      </div>
    );
  }
}

export default SearchResultDetails;
