import React from 'react';
import './Track.css';

// Each Track displays:
// The name of the Track
// The artist who performed the Track
// The album the Track came from
// If it's from a Playlist, we render a '-' sign that lets us remove Tracks.  If it's from the SearchResults, we render a '+' sign that lets us add Tracks from the SearchResults to the Playlist.
class Track extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this)
  }

  // See App.js
  addTrack() {
    this.props.onAdd(this.props.track);
  }

  // See App.js
  removeTrack() {
    this.props.onRemove(this.props.track);
  }

  // The isRemoval attribute is passed down from the Playlist component so we know whether the Track is from a Playlist or from SearchResults, and render '+' or '-' accordingly.
  renderAction() {
    if(this.props.isRemoval) {
      return <a className="Track-action" onClick={this.removeTrack}>-</a>
    }
    else {
      return <a className="Track-action" onClick={this.addTrack}>+</a>
    }
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        {this.renderAction()}
      </div>
    );
  }
}

export default Track;
