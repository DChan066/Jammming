const CLIENT_ID = '67d1ea3e98d04b309d308c69da51cd65';
const REDIRECT_URI = 'http://localhost:3000/';
let accessToken;
let expiresIn;

const Spotify = {
  // Called from the App.js search function. When you click the SEARCH button on the SearchBar, this function attempts to get an access token that can be used to access the Spotify database using this procedure:
  // If the global accessToken variable in Spotify.js is defined, return it.
  // Else if the access token and its expiration time are contained in the page url, retrieve them from the url and set the access token to expire at the given time.
  // Else, redirect the user to the Spotify login page.  After they log in, the user returns to the app page, and the access token should be in the page url.
  getAccessToken() {
    if(accessToken !== undefined) {
      return accessToken;
    }
    else if((window.location.href.match(/access_token=([^&]*)/) !== null) &&
            (window.location.href.match(/expires_in=([^&]*)/) !== null)) {
      accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
      expiresIn = window.location.href.match(/expires_in=([^&]*)/)[1];

      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
    }
    else {
      window.location = 'https://accounts.spotify.com/authorize?client_id=' + CLIENT_ID + '&response_type=token&scope=playlist-modify-public&redirect_uri=' + REDIRECT_URI;
    }
  },

  // Called from the App.js search function right after getAccessToken.  It is assumed that the global accessToken variable in Spotify.js is filled, allowing access to the Spotify database.
  // 1. A GET request is sent to the Spotify database for tracks, albums and artists relating to the term entered in the searchBar.
  // 2. If the expected response is received, map the track objects to an array and return that array.
  // Otherwise, return an empty array.
  search(term) {
    return fetch('https://api.spotify.com/v1/search?type=track&q=' + term,
    {headers: {Authorization: 'Bearer ' + accessToken}}
    ).then(response => {return response.json()}
    ).then(jsonResponse => {
      if(jsonResponse.tracks) {
        return jsonResponse.tracks.items.map(track => {
          return {
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
          };
        });
      }
      else {
        return [];
      }
    });
  },

  // Called from the App.js savePlaylist function.  When you click the SAVE TO SPOTIFY button, this function creates a playlist using a playlist name and an array of track uris.
  // Three fetch requests are sent to Spotify endpoints in all:
  // 1. A GET request is sent to find out the id of the logged-in user.
  // 2. A POST request creates a playlist in the account corresponding to the id from step 1, using playlistName.
  // 3. Checking jsonResponse right after step 2 gives you the playlist you just created.  A POST request adds tracks to this playlist using trackUris.
  // If the playlist name or track uris are missing, clicking the SAVE TO SPOTIFY button will do nothing
  savePlaylist(playlistName, trackUris) {
    if(playlistName && trackUris[0]) {
      // console.log('Getting user id');
      const headers = {Authorization: 'Bearer ' + accessToken};
      fetch('https://api.spotify.com/v1/me', {headers: headers}
      ).then(response => {return response.json()}
      ).then(jsonResponse => {

        if(jsonResponse.id) {
          // console.log('Creating playlist');
          const userId = jsonResponse.id;
          fetch('https://api.spotify.com/v1/users/' + userId + '/playlists', {
            method: 'POST',
            body: JSON.stringify({name: playlistName}),
            headers: headers
          }
          ).then(response => {return response.json()}
          ).then(jsonResponse => {

            if(jsonResponse.id) {
              // console.log('Adding playlist tracks');
              const playlistId = jsonResponse.id;
              fetch('https://api.spotify.com/v1/users/' + userId + '/playlists/' + playlistId + '/tracks', {
                method: 'POST',
                body: JSON.stringify({uris: trackUris}),
                headers: headers
              });
            }

          });
        }

      });
    }
    else {
      console.log('Missing playlistName or trackURIs');
    }

    return;
  }

};

export default Spotify;
