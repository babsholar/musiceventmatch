import React from "react";
import LocationCard from "./LocationCard";

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      city: "",
      locations: []
    };

    this.onHandleChange = this.onHandleChange.bind(this);

    this.onHandleSubmit = this.onHandleSubmit.bind(this);

    this.callForMetroId = this.callForMetroId.bind(this);

    this.callForUpcomingEvents = this.callForUpcomingEvents.bind(this);
  }

  callForMetroId(city) {
    const fetchUrl = `/songkick/metroLocations?city=${city}`;

    fetch(fetchUrl)
      .then(res => res.json())
      .then(data => {
        // Here, we have the resulting list of location data...
        // set it in the state of the search component
        this.setState({
          city: this.state.city,
          locations: data
        });
      })
      .catch(err => console.log(err));
  }

  callForUpcomingEvents(metroId) {
    console.log("Calling for upcoming events");
    const fetchUrl = `/songkick/upcomingEvents?metroId=${metroId}`;

    fetch(fetchUrl)
      .then(res => res.json())
      .then(data => {
        this.props.onSearchResults(data);
        this.setState({
          city: this.state.city,
          locations: []
        });
      })
      .catch(err => console.log(err));
  }

  onHandleChange(e) {
    console.log("Change!");
    this.setState({
      city: e.target.value
    });
  }

  onHandleSubmit(e) {
    e.preventDefault();
    const city = this.state.city;
    // this.props.onSearchTermChange(city);

    /*
      Now, we know what city the user wants to search for... so let's ask songkick for it.

      We need to call the songkick api for the metroId of the given city,
      then we need to call the songkick api for the upcoming events for the returned metroId.
    */
    this.callForMetroId(city);
  }

  render() {
    return (
      <div>
        <form>
          <p className="search-header">WHERE IS THE MUSIC: {this.state.city}</p>
          <input
            className="search"
            id="mainInput"
            onChange={this.onHandleChange}
            placeholder="Enter City"
            value={this.state.city}
            type="text"
          />
          <button
            className="search-button"
            onClick={this.onHandleSubmit}
            type="submit"
          >
            Search
          </button>
          <ul className="lo-card">
            {this.state.locations.map(location => (
              <li key={location.metroArea.id}>
                <LocationCard
                  location={location}
                  viewUpcomingEvents={this.callForUpcomingEvents}
                />
              </li>
            ))}
          </ul>
        </form>
      </div>
    );
  }
}

export default Search;
