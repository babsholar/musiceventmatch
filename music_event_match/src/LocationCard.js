import React from "react";

class LocationCard extends React.Component {
  render() {
    return (
      <div>
        <h3>{this.props.location.metroArea.displayName}</h3>
        <button type="button">View Upcoming Events</button>
      </div>
    );
  }
}

export default LocationCard;
