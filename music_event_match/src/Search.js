import React from "react";
import LocationCard from "./LocationCard";
import Loader from "react-loader-spinner";

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      city: "",
      locations: []
    };

    this.onHandleChange = this.onHandleChange.bind(this);

    this.onHandleSubmit = this.onHandleSubmit.bind(this);

    this.callForMetroId = this.callForMetroId.bind(this);

    this.callForUpcomingEvents = this.callForUpcomingEvents.bind(this);

    this.checkDisabled = this.checkDisabled.bind(this);
  }

  callForMetroId(city) {
    this.setState({
      city: this.state.city,
      locations: this.state.locations,
      loading: true
    });

    const fetchUrl = `/songkick/metroLocations?city=${city}`;

    fetch(fetchUrl)
      .then(res => {
        return res.text();
      })
      .then(data => {
        if (data) {
          // we have a result
          this.setState({
            city: this.state.city,
            locations: JSON.parse(data),
            loading: false
          });
        } else {
          // user entered a bad city name, or no result
          this.setState({
            city: this.state.city,
            locations: [],
            loading: false
          });
        }
      })
      .catch(err => console.log(err));
  }

  callForUpcomingEvents(metroId) {
    this.setState({
      city: this.state.city,
      locations: this.state.locations,
      loading: true
    });

    const fetchUrl = `/songkick/upcomingEvents?metroId=${metroId}`;

    fetch(fetchUrl)
      .then(res => res.json())
      .then(data => {
        this.props.onSearchResults(data);
        this.setState({
          city: this.state.city,
          locations: [],
          loading: false
        });
      })
      .catch(err => console.log(err));
  }

  checkDisabled() {
    return "true";
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
    if (!(city === "")) {
      this.callForMetroId(city);
    }
  }

  render() {
    let locationsData;

    if (this.state.loading) {
      locationsData = (
        <Loader
          type="Bars"
          color="#fc036f"
          height={100}
          width={100}
          timeout={30000}
        />
      );
    } else {
      locationsData = (
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
      );
    }

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

          {locationsData}
        </form>
      </div>
    );
  }
}

export default Search;
