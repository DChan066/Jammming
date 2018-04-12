import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

// This App creates the following webpage:
// A header with the Jammming logo
// A SearchBar component that lets you search for music on SPOTIFY
// A SearchResults component that displays the results from SearchBar
// A Playlist component that lets you choose songs from the search results and save those songs to your Spotify account as a playlist
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: '',
      playlistTracks: []
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  // Search for the given track in the playlistTracks array. If found, do nothing.  If not found, add the song to the end of the playlist and update the playlist state.  The .some method searches playlistTracks for a track that has the given track.id.  If found, .some immediately returns true, otherwise it returns false.
  addTrack(track) {
    const trackFound = this.state.playlistTracks.some(currentTrack => currentTrack.id === track.id);
    if(!trackFound) {
      let newPlaylist = this.state.playlistTracks;
      newPlaylist.push(track);
      this.setState({playlistTracks: newPlaylist});
    }
  }

  // Creates a new playlist with the contents of the one in this.state.playlistTracks, but with the track containing the given track.id filtered out.  The state is then updated with this new playlist.
  removeTrack(track) {
    const newPlaylist = this.state.playlistTracks.filter(tracks => {
      return tracks.id !== track.id;
    });
    this.setState({playlistTracks: newPlaylist});
  }

  // Set the name you typed in as the name of the playlist.  Without this the interface will still work, but your playlist name will not be stored or sent to Spotify!
  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  // Saves the playlist created in this app to the user's Spotify account.
  // 1. Creates an array with the track uris of each element in playlistTracks.
  // 2. Calls savePlaylist in Spotify.js, which creates a playlist using this list of uris and the playlist name.
  // 3. Afterward, the playlist name and list of tracks in the playlist are reset.
  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => {
      return track.uri;
    });
    Spotify.savePlaylist(this.state.playlistName, trackURIs);
    this.setState({playlistName: ''});
    this.setState({playlistTracks: []});
  }

  // Calls getAccessToken() and search() from Spotify.js.
  // 1. Get the access token so the app has permission to access the Spotify database.
  // 2. Search the database for tracks, albums and artists related to the term entered in the searchbar.
  // 3. Save the search results to the searchResults state.
  search(term) {
    Spotify.getAccessToken();
    Spotify.search(term).then(tracks => {
      this.setState({searchResults: tracks})
    });
  }

  // searchResults is passed down to the SearchResults component, where it renders a Tracklist with the tracks and onAdd attributes.  onAdd allows the Track component to use the addTrack() function.
  // playlistTracks is passed down to the Playlist component, where it renders a tracklist with the tracks, onRemove and isRemoval attributes.  onRemove allows the Track component to use removeTrack().
  // onNameChange is passed down to the Playlist component so Playlist.js can use the updatePlaylistName() function.
  // App already communicates with the Playlist component through the onNameChange attribute, so playlistName doesn't need to be passed down.
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
            <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} playlistName={this.state.playlistName} onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
