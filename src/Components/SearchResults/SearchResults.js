import React from 'react';
import './SearchResults.css';
import TrackList from '../TrackList/TrackList';

// SearchResults simply displays the heading 'Results' followed by a Tracklist component showing the results of the search query sent to Spotify.
class SearchResults extends React.Component {
  render() {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList tracks={this.props.searchResults} onAdd={this.props.onAdd} />
      </div>
    );
  }
}

export default SearchResults;
