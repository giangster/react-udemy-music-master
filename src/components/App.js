import React, { Component } from "react";
import Artist from "./Artist";
import Tracks from "./Tracks";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artistQuery: '',
      artist: null,
      tracks: []
    }
  }
  updateArtistQuery = (event) => {
    this.setState({ artistQuery: event.target.value });
  }

  onKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.searchArtist();
    }
  }

  searchArtist = () => {
    const API_ADDRESS = 'https://spotify-api-wrapper.appspot.com';
    fetch(`${API_ADDRESS}/artist/${this.state.artistQuery}`)
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.artists.total > 0) {
          const artist = responseData.artists.items[0];
          this.setState({ artist });
          fetch(`${API_ADDRESS}/artist/${artist.id}/top-tracks`)
            .then((response) => response.json())
            .then((responseData) => {
              this.setState({ tracks: responseData.tracks })
              console.log(this.state.tracks);
            })
            .catch(error => alert(error.message));
        }
      })
      .catch(error => alert(error.message));
  }

  render() {
    return (
      <div>
        <h2>Music Master</h2>
        <input placeholder='Search for an Artist' onChange={this.updateArtistQuery} onKeyPress={this.handleKeyPress} />
        <button onClick={this.searchArtist} >Search</button>
        <hr />
        <Artist artist={this.state.artist} />
        <Tracks tracks={this.state.tracks} />
      </div>
    )
  }
}

export default App;
