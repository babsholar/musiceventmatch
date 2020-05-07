import React from "react";
import Loader from "react-loader-spinner";

class VenueDetails extends React.Component {
  constructor(props) {
    super(props);

    this.hideDetails = this.hideDetails.bind(this);
  }

  hideDetails() {
    this.props.onHideDetails();
  }
  render() {
    if (this.props.show) {
      if (this.props.loading) {
        // render a loading spinner
        return (
          <Loader
            type="Bars"
            color="#fc036f"
            height={100}
            width={100}
            timeout={30000}
          />
        );
      } else {
        // render the venue details
        return (
          <div className="venue">
            <div>
              <p>Venue Address: </p>
              <p>{this.props.venue.street}</p>
              <button type="button" onClick={() => this.hideDetails()}>
                Close
              </button>
            </div>
          </div>
        );
      }
    } else {
      return null;
    }
  }
}
export default VenueDetails;
