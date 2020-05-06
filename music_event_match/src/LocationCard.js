import React from "react";

class LocationCard extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="location-card">
          <h2 className="location-name">
            {this.props.location.city && this.props.location.city.displayName
              ? this.props.location.city.displayName
              : "City Name Unavailable"}
            ,{" "}
            {this.props.location.city.state &&
            this.props.location.city.state.displayName
              ? this.props.location.city.state.displayName
              : this.props.location.city.country.displayName}
          </h2>
          <h4 className="metro-area">
            {" "}
            Metro Area : {this.props.location.metroArea.displayName}
          </h4>
          <button
            className="location-button"
            type="button"
            onClick={() =>
              this.props.viewUpcomingEvents(this.props.location.metroArea.id)
            }
          >
            View Upcoming Events
          </button>
        </div>
      </div>
    );
  }
}

export default LocationCard;
