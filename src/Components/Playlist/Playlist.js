import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

// Playlist displays:
// The name of the playlist
// A Tracklist component containing the user's chosen songs
// A button that lets the user save the playlist made with this app to the Spotify account
class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  // If the playlist name changes, we need to send the new name back to App.js so the corresponding state can be updated.  See updatePlaylistName() in App.js.
  handleNameChange(event) {
    this.props.onNameChange(event.target.value);
  }

  // isRemoval is passed to the Tracklist component, then down to Track.  This way the Track remembers that it's from a Playlist and not from SearchResults, so Track will display a '-' sign for removing itself from the Playlist instead of a '+' sign for adding a search result to the Playlist.
  render() {
    return (
      <div className="Playlist">
        <input defaultValue={"New Playlist"} onChange={this.handleNameChange} />
        <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval="true" />
        <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default Playlist;
