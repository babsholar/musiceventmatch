import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import About from "./About";
import Contact from "./Contact";
import Search from "./Search";
import SearchResult from "./SearchResult";
import logo from "./skblackbadge.png";
import image from "./skblackbanner.png";
import "./MusicEventMatch.css";

class MusicEventMatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: undefined
    };

    this.handleSearchResults = this.handleSearchResults.bind(this);
  }

  handleSearchResults(searchResults) {
    this.setState({
      searchResults: searchResults
    });
  }

  render() {
    return (
      <Router>
        <div className="root">
          <header>
            <img className="header-logo" src={logo} alt="songkick-logo"></img>
            MUSIC EVENT MATCH
          </header>

          <div className="header-nav">
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </nav>
          </div>

          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/contact">
              <Contact />
            </Route>
            <Route path="/">
              <Search
                onSearchResults={this.handleSearchResults}
                nLocationSearch={this.handleLocationSearch}
              />
              <SearchResult results={this.state.searchResults} />
              {/* <button className="reset" href="/">
                Reset
              </button> */}
            </Route>
          </Switch>

          <div className="footer">
            <p>Thank you for visiting</p>
            <img className="banner" src={image} alt="songKick banner"></img>
          </div>
        </div>
      </Router>
    );
  }
}

export default MusicEventMatch;
