import React from 'react';
import './SearchBar.css';

// SearchBar displays an input field for typing in a query, and a 'Search' button that sends the query to Spotify so the results can be displayed in the SearchResults component.  The query looks up the names of songs, albums and artists at the same time.
class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    };

    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  // See App.js
  search() {
    this.props.onSearch(this.state.term);
  }

  // If the user types something in the search bar, update the term state to reflect what they typed.
  handleTermChange(event) {
    this.setState({term: event.target.value});
  }

  render() {
    return(
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} />
        <a onClick={this.search}>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;
