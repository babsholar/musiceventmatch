import React from "react";

class SearchResultDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      viewingVenueDetails: false,
      selectedVenue: undefined
    };

    this.viewVenueDetails = this.viewVenueDetails.bind(this);
  }

  viewVenueDetails(venueId) {
    this.setState({
      viewingVenueDetails: true,
      selectedVenue: venueId
    });
  }

  closeVenueDetails() {
    this.setState({
      viewingVenueDetails: false,
      selectedVenue: undefined
    });
  }

  render() {
    let performanceHeader;

    if (this.props.event.performance.length > 1) {
      performanceHeader = <h3>Artists:</h3>;
    } else {
      performanceHeader = <h3>Artist:</h3>;
    }

    return (
      <div>
        <h2>{this.props.event.displayName}</h2>
        <hr />
        <h3>Event Type: {this.props.event.type}</h3>
        <span>
          <h3>Venue: {this.props.event.venue.displayName}</h3>
          <button
            type="button"
            onClick={() => this.viewVenueDetails(this.props.event.venue.id)}
          >
            View Venue Details
          </button>
        </span>
        <h3>When: {this.props.event.start.date}</h3>
        <a href={this.props.event.uri}>See it on songkick!</a>
        <hr />
        {performanceHeader}
        <ul>
          {this.props.event.performance.map(performanceDetails => (
            <li>{performanceDetails.artist.displayName}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default SearchResultDetails;
