import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

// Tracklist uses the .map() method to create and display a Track component for each song from the App.js state.
// The key attribute is not really used, but it stops the console from raising a warning.
class TrackList extends React.Component {
  render() {
    return (
      <div className="TrackList"> {
          this.props.tracks.map(track => {
            return <Track track={track} key={track.id} onAdd={this.props.onAdd} onRemove={this.props.onRemove} isRemoval={this.props.isRemoval} />;
          })
        }
      </div>
    );
  }
}

export default TrackList;
