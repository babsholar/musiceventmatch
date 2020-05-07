import React from "react";
import VenueDetails from "./VenueDetails";

class SearchResultDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      viewingVenueDetails: false,
      selectedVenue: undefined
    };

    this.viewVenueDetails = this.viewVenueDetails.bind(this);
    this.closeVenueDetails = this.closeVenueDetails.bind(this);
  }

  viewVenueDetails(venueId) {
    this.setState({
      loading: true,
      viewingVenueDetails: true,
      selectedVenue: this.state.selectedVenue
    });

    const fetchUrl = `/songkick/venueDetails?venueId=${venueId}`;

    fetch(fetchUrl)
      .then(res => res.json())
      .then(data => {
        this.setState({
          loading: false,
          viewingVenueDetails: this.state.viewingVenueDetails,
          selectedVenue: data
        });
      })
      .catch(err => console.log(err));
  }

  closeVenueDetails() {
    this.setState({
      loading: false,
      viewingVenueDetails: false,
      selectedVenue: undefined
    });
  }

  render() {
    let performanceHeader;
    let venueDetailsButton;
    let searchResultDetails;

    if (this.props.event.performance.length > 1) {
      performanceHeader = <h3>Artists:</h3>;
    } else {
      performanceHeader = <h3>Artist:</h3>;
    }

    if (
      this.props.event.venue.displayName.includes("Unknown") ||
      this.props.event.venue.displayName.includes("unknown") ||
      this.props.event.venue.displayName.includes("UNKNOWN")
    ) {
      venueDetailsButton = null;
    } else {
      venueDetailsButton = (
        <button
          className="view-button"
          type="button"
          onClick={() => this.viewVenueDetails(this.props.event.venue.id)}
        >
          View Venue Details
        </button>
      );
    }

    if (this.state.viewingVenueDetails) {
      searchResultDetails = (
        <VenueDetails
          show={this.state.viewingVenueDetails}
          loading={this.state.loading}
          venue={this.state.selectedVenue}
          onHideDetails={this.closeVenueDetails}
        />
      );
    } else {
      searchResultDetails = (
        <div className="results-cards">
          <h2 className="results-details">{this.props.event.displayName}</h2>
          <hr />
          <h3 className="results-details">
            Event Type: {this.props.event.type}
          </h3>
          <span>
            <h3 className="results-details">
              Venue: {this.props.event.venue.displayName}
            </h3>
            {venueDetailsButton}
          </span>
          <h3 className="results-details">
            When: {this.props.event.start.date}
          </h3>

          <hr />
          <div className="results-details">{performanceHeader}</div>
          <ul>
            {this.props.event.performance.map(performanceDetails => (
              <li className="artist-list" key={performanceDetails.id}>
                {performanceDetails.artist.displayName}
              </li>
            ))}
          </ul>
          <a className="sk-link" href={this.props.event.uri}>
            See it on songkick!
          </a>
        </div>
      );
    }

    return <div className="results-container">{searchResultDetails}</div>;
  }
}

export default SearchResultDetails;
