import React from "react";
import Search from "./Search";
import SearchResult from "./SearchResult";

class MusicEventMatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  render() {
    return (
      <div>
        <p>
          Hello from MusicEventMatch ROOT, here is the props message:{" "}
          {this.props.message}
          The current date from state is: {this.state.date}
          <Search />
          <SearchResult />
          <button>Reset</button>
        </p>
      </div>
    );
  }
}

export default MusicEventMatch;
